import { getTokenCookie } from '@/app/actions/cookies';

export const fetchDocuments = async () => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/members/documents`,
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

export const addDocument = async (value: {
  documentName: string;
  issuedDate: string;
  issuer: string | null;
  memo: string | null;
}) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/members/documents`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(value),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const deleteDocument = async (documentId: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/members/documents/${documentId}`,
    {
      method: 'DELETE',
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

export const fetchDocument = async (documentId: number) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/members/documents/${documentId}`,
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

export const editDocument = async (
  value: {
    documentName: string;
    issuedDate: string;
    issuer: string | null;
    memo: string | null;
  },
  documentId: number,
) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/members/documents/${documentId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(value),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
