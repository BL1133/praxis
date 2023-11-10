import { handleApiError } from './apiErrors';

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    await handleApiError(res);
  }
  return res.json();
};

export const fetcherAuth = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) await handleApiError(res);
  return res.json();
};
