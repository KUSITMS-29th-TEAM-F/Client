export const fetchSocialLogin = async (
  accessToken: string,
  socialService: 'kakao' | 'naver',
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/login/${socialService}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        socialAccessToken: accessToken,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
