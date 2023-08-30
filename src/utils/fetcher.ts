export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetcherAuth = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return res.json();
};
