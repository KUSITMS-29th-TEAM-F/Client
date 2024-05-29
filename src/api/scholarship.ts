import { getTokenCookie } from '@/app/actions/cookies';

export const getPopularScholarshipList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/home/announcements`,

    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchScholarship = async (id: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/${id}`,
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

export const fetchRecommendScholarship = async (status: string) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/recommendations?status=${status}`,
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

export const fetchAllScholarship = async (status: string[]) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements?status=${status}`,
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

export const fetchScholarshipDocumentList = async (id: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/${id}/required-documents`,
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

export const fetchScholarshipFoundation = async (id: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/${id}/scholarship-foundations`,
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

export const fetchScholarshipFoundationSummary = async (content: string) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/foundation/summary`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: '공고 요약',
        content,
      }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchCommentList = async (scholarshipId: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/${scholarshipId}/comments`,
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

export const addComment = async (scholarshipId: number, content: string) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/${scholarshipId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ commentContents: content }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchLike = async (scholarshipId: number, isLike: boolean) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/${scholarshipId}/likes`,
    {
      method: isLike ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchSave = async (scholarshipId: number, isSave: boolean) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    isSave
      ? `${process.env.NEXT_PUBLIC_SERVER_API_URL}/announcements/${scholarshipId}`
      : `${process.env.NEXT_PUBLIC_SERVER_API_URL}/members/application/${scholarshipId}`,
    {
      method: isSave ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
