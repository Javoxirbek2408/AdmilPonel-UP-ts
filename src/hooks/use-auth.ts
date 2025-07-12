import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import request from '../services';

// --- Types ---
interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  // Qo‘shimcha user maydonlari bo‘lsa, shu yerga qo‘shing
}

// --- Hook: useLogin ---
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError, LoginCredentials>({
    mutationFn: (credentials) =>
      request.post<User>('/auth/login', credentials).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },

    onError: (error) => {
      console.error('Login mutation error:', error);
    },
  });
};

// --- Hook: useUser ---
export const useUser = (auth: boolean) => {
  return useQuery<User, AxiosError>({
    queryKey: ['user'],
    queryFn: () => request.get<User>('/auth/me').then((res) => res.data),
    enabled: auth,

    onError: (error: unknown) => {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        console.log('User query unauthorized');
      } else {
        console.error('Unexpected error in useUser:', error);
      }
    },
  });
};
