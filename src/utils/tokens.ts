import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/indes';
import { cookieStorage } from './cookie-store';

export function setTokens(accessToken: string, refreshToken: string): void {
  cookieStorage.setItem(ACCESS_TOKEN, accessToken, 1 / (24 * 60));
  cookieStorage.setItem(REFRESH_TOKEN, refreshToken, 7);
}

export function getTokens(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  return {
    accessToken: cookieStorage.getItem(ACCESS_TOKEN),
    refreshToken: cookieStorage.getItem(REFRESH_TOKEN),
  };
}

export function clearTokens(): void {
  cookieStorage.removeItem(ACCESS_TOKEN);
  cookieStorage.removeItem(REFRESH_TOKEN);
}
