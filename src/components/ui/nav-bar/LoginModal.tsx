import clsx from "clsx";

import XIcon from "../icon/XIcon";
import KakaoIcon from "../icon/KakaoIcon";
import NaverIcon from "../icon/NaverIcon";
import { Link } from "react-router-dom";

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void;
}

const LoginModal = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
}: LoginModalProps) => {
  const buttonList: {
    icon: React.ReactNode;
    label: string;
    bgColor: string;
    color: string;
    onClick?: () => void;
    href?: string;
  }[] = [
    {
      icon: <KakaoIcon fill="#181600" />,
      label: "카카오 로그인",
      bgColor: "bg-kakao-yellow",
      color: "text-grayscale-gray-100",
      href: `https://kauth.kakao.com/oauth/authorize?client_id=${
        import.meta.env.VITE_KAKAO_REST_API_KEY
      }&redirect_uri=${
        import.meta.env.VITE_KAKAO_REDIRECT_URL
      }&response_type=code`,
    },
    {
      icon: <NaverIcon fill="#181600" />,
      label: "네이버 로그인",
      bgColor: "bg-naver-green",
      color: "text-gray-00",
      href: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
        import.meta.env.VITE_NAVER_CLIENT_ID
      }&client_secret=${
        import.meta.env.VITE_NAVER_CLIENT_SECRET
      }&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URL}`,
    },
  ];

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50 transition-opacity",
        {
          "opacity-100": isLoginModalOpen,
          "pointer-events-none opacity-0": !isLoginModalOpen,
        }
      )}
      onClick={() => setIsLoginModalOpen(false)}
    >
      <div
        className="z-50 flex w-[20rem] flex-col items-center rounded-2xl border border-gray-15 bg-gray-00 p-4 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-end">
          <button
            className="text-[1.5rem]"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <XIcon />
          </button>
        </div>
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
        <div className="mt-6 flex w-full flex-col gap-4">
          {buttonList.map((button, index) => (
            <Link
              key={index}
              to={button.href || "#"}
              className={clsx(
                "flex w-full items-center justify-center gap-2 rounded-xl py-4",
                button.bgColor,
                button.color
              )}
              onClick={button.onClick}
            >
              <span>{button.icon}</span>
              <span className={clsx("text-md-200", button.color)}>
                {button.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
