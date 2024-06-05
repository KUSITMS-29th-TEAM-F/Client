import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import NaverIcon from '../../components/ui/icon/NaverIcon';
import KakaoIcon from '../../components/ui/icon/KakaoIcon';
import BackgroundLogoDesign from '../../components/login/background/BackgroundLogoDesign';
import BackgroundGradient from '../../components/login/background/BackgroundGradient';

const Login = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate(-1);
    }
  }, []);

  if (accessToken && refreshToken) {
    return null;
  }

  return (
    <main className="relative flex flex-1 justify-center overflow-hidden">
      <BackgroundGradient />
      <div className="relative flex h-[43rem] w-[20rem] items-start pt-32">
        <BackgroundLogoDesign />
        <div className="flex w-full flex-col items-center opacity-100">
          <div className="w-[9rem]">
            <img
              src="/logo/logo-text.svg"
              alt="로고"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-sm-200 mt-6 text-gray-40">
            로그인하고 나에게 맞는 장학금을 추천받으세요!
          </p>
          <div className="mt-20 flex w-full flex-col gap-4">
            <Link
              to={`https://kauth.kakao.com/oauth/authorize?client_id=${
                import.meta.env.VITE_KAKAO_REST_API_KEY
              }&redirect_uri=${
                import.meta.env.VITE_KAKAO_REDIRECT_URL
              }&response_type=code`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-kakao-yellow py-4 text-grayscale-gray-100"
            >
              <span>
                <KakaoIcon fill="#181600" />
              </span>
              <span className={clsx('text-md-200 text-grayscale-gray-100')}>
                카카오 로그인
              </span>
            </Link>
            <Link
              to={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
                import.meta.env.VITE_NAVER_CLIENT_ID
              }&client_secret=${
                import.meta.env.VITE_NAVER_CLIENT_SECRET
              }&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URL}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-naver-green py-4 text-gray-00"
            >
              <span>
                <NaverIcon fill="#181600" />
              </span>
              <span className="text-md-200 text-gray-00">네이버 로그인</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
