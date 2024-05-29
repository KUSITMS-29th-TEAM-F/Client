import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const topMenuList: {
    label: string;
    href: string;
    active?: boolean;
  }[] = [
    {
      label: '지원 일정',
      href: '/my-scholarships/date',
      active: location.pathname === '/my-scholarships/date',
    },
    {
      label: '지원 목록',
      href: '/my-scholarships/list',
      active: location.pathname === '/my-scholarships/list',
    },
    {
      label: '찜한 공고',
      href: '/my-scholarships/favorite',
      active: location.pathname === '/my-scholarships/favorite',
    },
  ];

  return (
    <header className="my-scholarships-header h-[5.5rem]">
      <div className="fixed w-full bg-gray-00">
        <div className="mx-auto max-w-screen-lg">
          <div className="flex items-center gap-3 px-4 py-3 lg:px-0">
            <div>
              <img
                src="/icons/menu/my-scholarships-icon.svg"
                alt="내 장학금"
                width={20}
                height={20}
              />
            </div>
            <h1 className="title-md-300 text-gray-80">내 장학금</h1>
          </div>
          <nav>
            <ul className="flex items-center gap-3 px-4 pb-4 pt-0 lg:px-0">
              {topMenuList.map((menu, index) => (
                <li key={index}>
                  <Link
                    to={menu.href}
                    className={clsx({
                      'title-sm-300 text-gray-70': menu.active,
                      'title-sm-200 text-gray-30': !menu.active,
                    })}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
