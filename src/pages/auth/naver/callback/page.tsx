'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { fetchSocialLogin } from '@/api/auth';
import { setTokenCookie } from '@/app/actions/cookies';

const AuthNaverCallbackPage = ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const router = useRouter();

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const res = await fetchSocialLogin(searchParams.code, 'naver');
        setTokenCookie(res.data.accessToken);
        if (!res.data.isOnboarding) {
          router.push('/onboarding');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogin();
  }, []);
};

export default AuthNaverCallbackPage;
