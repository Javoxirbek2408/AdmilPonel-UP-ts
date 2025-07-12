import axios from 'axios';
import { API_URL } from '../constants/indes';
import { getTokens, setTokens } from '../utils';
interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokens = async (): Promise<string> => {
  const { accessToken, refreshToken } = getTokens();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post<RefreshResponse>(
      `${API_URL}/auth/refresh`,
      {
        refreshToken,
        expiresInMins: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { accessToken: newAccess, refreshToken: newRefresh } = response.data;

    setTokens(newAccess, newRefresh);

    return newAccess;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};
