import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { clearTokens, cookieStorage, setTokens } from '../utils';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  auth: boolean;
  login: (tokens: AuthTokens) => void;
  logOut: () => void;
}

const useStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: false,
      login: ({ accessToken, refreshToken }) => {
        setTokens(accessToken, refreshToken);
        set({ auth: true });
      },
      logOut: () => {
        clearTokens();
        set({ auth: false });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);

export default useStore;
