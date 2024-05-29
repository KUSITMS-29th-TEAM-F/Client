import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import ChevronRightIcon from "../icon/ChevronRightIcon";
import { deleteTokenCookie } from "../../../actions/cookies";
import { Link } from "react-router-dom";

interface ProfileDesktopProps {
  nickname: string;
}

const ProfileDesktop = ({ nickname }: ProfileDesktopProps) => {
  const menuRef = useRef<HTMLUListElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList: {
    iconSrc: string;
    iconWidth: number;
    iconHeight: number;
    text: string;
    onClick?: () => void;
    href?: string;
    variant: "default" | "danger";
  }[] = [
    {
      iconSrc: "/icons/menu/cover-letters-icon.svg",
      iconWidth: 20,
      iconHeight: 20,
      text: "마이페이지",
      variant: "default",
      onClick: () => handleMyPageClick(),
      href: "/me",
    },
    {
      iconSrc: "/icons/menu/logout-icon.svg",
      iconWidth: 20,
      iconHeight: 20,
      text: "로그아웃",
      variant: "danger",
      onClick: () => handleLogoutClick(),
    },
  ];

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMyPageClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    deleteTokenCookie();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={handleProfileClick}
      >
        <div className="overflow-hidden rounded-full">
          <img
            src="/images/placeholders/placeholder-profile.png"
            alt="임시 프로필 이미지"
            width={24}
            height={24}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-lg-200 text-gray-80">{nickname}</span>
          <span className="text-[1.25rem] text-gray-40">
            <ChevronRightIcon />
          </span>
        </div>
      </div>
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className="absolute -bottom-2 right-0 w-[12rem] translate-y-full rounded-2xl border border-gray-05 bg-gray-00 shadow-lg"
        >
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link
                to={menu.href || "#"}
                className="flex items-center gap-3 px-6 py-4"
                onClick={menu.onClick}
              >
                <div
                  className="relative"
                  style={{ width: menu.iconWidth, height: menu.iconHeight }}
                >
                  <img
                    src={menu.iconSrc}
                    alt={menu.text}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className={clsx("text-md-200", {
                    "text-gray-60": menu.variant === "default",
                    "text-danger-50": menu.variant === "danger",
                  })}
                >
                  {menu.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileDesktop;
