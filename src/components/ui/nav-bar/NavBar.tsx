import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "../icon/MenuIcon";
import SearchIcon from "../icon/SearchIcon";
import Drawer, { DrawerProps } from "./Drawer";
import SearchBarModal from "./SearchBarModal";
import SearchBar from "./SearchBar";
import ProfileDesktop from "./ProfileDesktop";
import PopUp from "../PopUp";
import { getTokenCookie } from "../../../actions/cookies";
import { fetchMyInfo } from "../../../api/mypage";

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [isSearchBarPopUpOpen, setIsSearchBarPopUpOpen] =
    useState<boolean>(false);

  const menuList: DrawerProps["menuList"] = [
    {
      label: "전체 장학금",
      iconSrc: "/icons/menu/all-scholarships-icon.svg",
      href: "/scholarships",
      color: "default",
    },
    {
      label: "맞춤 장학금",
      iconSrc: "/icons/menu/articles-icon.svg",
      href: "/recommend",
      color: "default",
    },
    {
      label: "내 장학금",
      iconSrc: "/icons/menu/my-scholarships-icon.svg",
      href: "/my-scholarships/date",
      color: "default",
    },
    {
      label: "자기소개서",
      iconSrc: "/icons/menu/cover-letters-icon.svg",
      href: "/cover-letters",
      color: "default",
    },
    {
      label: "아티클",
      iconSrc: "/icons/menu/articles-icon.svg",
      href: "/articles",
      color: "default",
    },
  ];

  const handleAuthButtonClick = () => {
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    const fetchCookieAndLogIn = async () => {
      const token = await getTokenCookie();
      setIsLoggedIn(token !== null);
    };
    fetchCookieAndLogIn();
  }, []);

  useEffect(() => {
    const fetchMyInfoLogic = async () => {
      const res = await fetchMyInfo();
      setNickname(res.data.nickname);
    };
    fetchMyInfoLogic();
  }, []);

  const handleSearchBarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearchBarPopUpOpen(true);
  };

  return (
    <>
      <div className="nav-bar">
        <nav className="fixed left-0 top-0 z-50 flex w-full justify-center bg-gray-00 px-4 py-3">
          <div className="flex w-full max-w-screen-lg flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/">
                  <img
                    src="/logo/navbar-header-logo.svg"
                    alt="네비게이션 헤더 로고"
                  />
                </Link>
                <form
                  className="hidden lg:block"
                  onSubmit={handleSearchBarSubmit}
                >
                  <SearchBar className="w-[25rem]" />
                </form>
              </div>
              <div>
                {isLoggedIn === null ? null : isLoggedIn ? (
                  <div className="hidden lg:block">
                    <ProfileDesktop nickname={nickname} />
                  </div>
                ) : (
                  <div className="text-lg-200 hidden items-center gap-2 text-gray-40 lg:flex">
                    <span
                      onClick={handleAuthButtonClick}
                      className="cursor-pointer"
                    >
                      로그인
                    </span>
                    <span
                      onClick={handleAuthButtonClick}
                      className="cursor-pointer"
                    >
                      회원가입
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-4 text-[1.5rem] lg:hidden">
                  <button>
                    <SearchIcon onClick={() => setIsSearchBarOpen(true)} />
                  </button>
                  <button onClick={() => setIsDrawerOpen(true)}>
                    <MenuIcon />
                  </button>
                </div>
              </div>
            </div>
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {menuList.map(
                  (menu, index) =>
                    menu.screenOnly !== "MOBILE" &&
                    !menu.hidden && (
                      <li key={index} className="text-lg-200 text-gray-60">
                        <Link to={menu.href}>{menu.label}</Link>
                      </li>
                    )
                )}
              </ul>
            </nav>
          </div>
        </nav>
        <div className="h-[68px] lg:h-[104px]" />
      </div>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        menuList={menuList}
        isLoggedIn={isLoggedIn}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        nickname={nickname}
      />
      <SearchBarModal
        isSearchBarOpen={isSearchBarOpen}
        setIsSearchBarOpen={setIsSearchBarOpen}
      />
      {isSearchBarPopUpOpen && (
        <PopUp
          confirmButton={{
            label: "확인",
          }}
          cancelButton={{
            label: "취소",
          }}
          onConfirm={() => setIsSearchBarPopUpOpen(false)}
          onCancel={() => setIsSearchBarPopUpOpen(false)}
        >
          지원하지 않는 기능입니다.
        </PopUp>
      )}
    </>
  );
};

export default NavBar;
