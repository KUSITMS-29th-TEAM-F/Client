import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import _axios from 'axios';

import axios from '../../api/axios';

const AuthKakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const [onlyOnce, setOnlyOnce] = useState(true);

  useEffect(() => {
    const fetchLogin = async () => {
      const code = searchParams.get('code');
      try {
        if (!onlyOnce) return;
        if (!code) return;
        const kakaoRes = await _axios.get(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${
            import.meta.env.VITE_KAKAO_REST_API_KEY
          }&redirect_uri=${
            import.meta.env.VITE_KAKAO_REDIRECT_URL
          }&code=${code}&client_secret=${
            import.meta.env.VITE_KAKAO_CLIENT_SECRET
          }`,
        );

        const res = await axios.post(
          '/login/kakao',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              socialAccessToken: kakaoRes.data.access_token,
            },
          },
        );

        localStorage.setItem('access-token', res.data.data.accessToken);
        localStorage.setItem('refresh-token', res.data.data.refreshToken);

        if (!res.data.data.isOnboarding) {
          window.location.href = '/onboarding';
        } else {
          window.location.href = '/';
        }
        setOnlyOnce(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogin();
  }, [searchParams]);

  return null;
};

export default AuthKakaoCallback;
