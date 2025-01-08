import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = useMutation(
    (credentials: { email: string; password: string }) =>
      api.auth.login(credentials.email, credentials.password),
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        queryClient.setQueryData('user', data.user);
        navigate('/dashboard');
      },
    }
  );

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.setQueryData('user', null);
    navigate('/');
  };

  const user = useQuery('user', () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return api.auth.me();
  });

  return { login, logout, user: user.data, isLoading: user.isLoading };
}