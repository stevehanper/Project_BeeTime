import { TimeEntry, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (userData: Omit<User, 'id'>) =>
      fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
  },
  timeEntries: {
    create: (entry: Omit<TimeEntry, 'id'>) =>
      fetchWithAuth('/time-entries', {
        method: 'POST',
        body: JSON.stringify(entry),
      }),
    getAll: () => fetchWithAuth('/time-entries'),
    update: (id: string, entry: Partial<TimeEntry>) =>
      fetchWithAuth(`/time-entries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(entry),
      }),
  },
};