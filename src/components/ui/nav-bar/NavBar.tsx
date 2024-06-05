import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MenuIcon from '../icon/MenuIcon';
import SearchIcon from '../icon/SearchIcon';
import Drawer, { DrawerProps } from './Drawer';
import SearchBarModal from './SearchBarModal';
import SearchBar from './SearchBar';
import ProfileDesktop from './ProfileDesktop';
import axios from '../../../api/axios';

const NavBar = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const menuList: DrawerProps['menuList'] = [
    {
      label: '전체 장학금',
      iconSrc: '/icons/menu/all-scholarships-icon.svg',
      href: '/scholarships',
      color: 'default',
    },
    {
      label: '맞춤 장학금',
      iconSrc: '/icons/menu/articles-icon.svg',
      href: '/recommend',
      color: 'default',
    },
    {
      label: '내 장학금',
      iconSrc: '/icons/menu/my-scholarships-icon.svg',
      href: '/my-scholarships/date',
      color: 'default',
    },
    {
      label: '자기소개서',
      iconSrc: '/icons/menu/cover-letters-icon.svg',
      href: '/cover-letters',
      color: 'default',
    },
    {
      label: '아티클',
      iconSrc: '/icons/menu/articles-icon.svg',
      href: '/articles',
      color: 'default',
    },
  ];

  const handleSearchBarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearchBarOpen(false);
    navigate(`/search?q=${searchKeyword}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access-token');
      setIsLoggedIn(token !== null);
      const res = await axios.get('/members/my-page');
      setNickname(res.data.data.nickname);
    };
    fetchData();
  }, []);

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
                <div className="hidden lg:block">
                  <SearchBar
                    className="w-[25rem]"
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    onSubmit={handleSearchBarSubmit}
                  />
                </div>
              </div>
              <div>
                {isLoggedIn === null ? null : isLoggedIn ? (
                  <div className="hidden lg:block">
                    <ProfileDesktop nickname={nickname} />
                  </div>
                ) : (
                  <div className="text-lg-200 hidden items-center gap-2 text-gray-40 lg:flex">
                    <Link to="/login">로그인</Link>
                    <Link to="/login">회원가입</Link>
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
                    menu.screenOnly !== 'MOBILE' &&
                    !menu.hidden && (
                      <li key={index} className="text-lg-200 text-gray-60">
                        <Link to={menu.href}>{menu.label}</Link>
                      </li>
                    ),
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
        nickname={nickname}
      />
      <SearchBarModal
        isSearchBarOpen={isSearchBarOpen}
        setIsSearchBarOpen={setIsSearchBarOpen}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleSearchBarSubmit={handleSearchBarSubmit}
      />
    </>
  );
};

export default NavBar;
