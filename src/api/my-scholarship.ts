import { getTokenCookie } from '@/app/actions/cookies';

export const fetchMyApplyList = async (status: 'all' | 'pass' | 'fail') => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/apply-list/${status}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-cache',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchFavoriteScholarships = async () => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/likes`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-cache',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchMyScholarship = async (applyId: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/apply-list/${applyId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-cache',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchScholarshipsDate = async (year: number, month: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/calandar/list/${year}/${month}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-cache',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const changeMyScholarshipStatus = async (
  applyId: number,
  applyStatus: number,
) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/apply-list/apply-status/${applyId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ applyStatus: applyStatus }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
