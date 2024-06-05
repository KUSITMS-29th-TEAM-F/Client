import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

import ChevronRightIcon from '../icon/ChevronRightIcon';

export interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  menuList: {
    label: string;
    iconSrc: string;
    href: string;
    color: 'default' | 'danger';
    topDivider?: boolean;
    hidden?: boolean;
    screenOnly?: 'DESKTOP' | 'MOBILE';
    onClick?: () => void;
  }[];
  isLoggedIn: boolean | null;
  nickname: string;
}

const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  menuList,
  isLoggedIn,
  nickname,
}: DrawerProps) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsDrawerOpen(false);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setIsDrawerOpen(false);
      navigate('/me');
    } else {
      setIsDrawerOpen(false);
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    setIsDrawerOpen(false);
    window.location.href = '/';
  };

  return (
    <>
      <div
        className={clsx(
          'fixed right-0 top-0 z-50 flex h-screen w-full justify-end bg-black transition-colors duration-300',
          {
            'bg-opacity-50': isDrawerOpen,
            'pointer-events-none bg-opacity-0': !isDrawerOpen,
          },
        )}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={clsx(
            'w-[20rem] bg-gray-00 transition-transform duration-300',
            {
              'translate-x-0': isDrawerOpen,
              'translate-x-full': !isDrawerOpen,
            },
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex cursor-pointer items-center gap-4 pb-3 pl-6 pr-4 pt-5"
            onClick={handleProfileClick}
          >
            <div className="relative aspect-square w-[3rem] overflow-hidden rounded-full">
              <img
                src="/images/placeholders/placeholder-profile.png"
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className={clsx('text-lg-200 flex-1', {
                'text-gray-80': isLoggedIn,
                'text-gray-40': !isLoggedIn,
              })}
            >
              {isLoggedIn ? nickname : '로그인 후 이용해주세요.'}
            </div>
            <div>
              <span className="text-[1.5rem] text-gray-40">
                <ChevronRightIcon />
              </span>
            </div>
          </div>
          <ul>
            {menuList.map(
              (menu, index) =>
                menu.screenOnly !== 'DESKTOP' &&
                !menu.hidden && (
                  <li key={index} onClick={menu.onClick}>
                    {menu.topDivider && (
                      <div className="my-2 border-t border-gray-10" />
                    )}
                    <Link
                      to={menu.href}
                      className={clsx('flex items-center gap-4 px-6 py-4', {
                        'text-gray-60': menu.color === 'default',
                        'text-danger-40': menu.color === 'danger',
                      })}
                      onClick={handleMenuClick}
                    >
                      <div>
                        <img
                          src={menu.iconSrc}
                          alt={menu.label}
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className="text-lg-200 flex-1">{menu.label}</span>
                    </Link>
                  </li>
                ),
            )}
            {isLoggedIn && (
              <li onClick={handleLogoutClick}>
                <div className="my-2 border-t border-gray-10" />
                <Link
                  to="#"
                  className="flex items-center gap-4 px-6 py-4 text-danger-40"
                  onClick={handleMenuClick}
                >
                  <div>
                    <img
                      src="/icons/menu/logout-icon.svg"
                      alt="로그아웃"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-lg-200 flex-1">로그아웃</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
