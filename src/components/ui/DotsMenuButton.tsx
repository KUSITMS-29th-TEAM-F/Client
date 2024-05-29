'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import DotsVerticalIcon from './icon/DotsVerticalIcon';

export interface DotsMenuButtonProps {
  menuList: {
    label: string;
    icon: JSX.Element;
    style: 'default' | 'danger';
    onClick?: () => void;
  }[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const DotsMenuButton = ({
  menuList,
  isMenuOpen,
  setIsMenuOpen,
}: DotsMenuButtonProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDotsMenuButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isMenuOpen]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div ref={menuRef} className="relative">
        <span
          className="cursor-pointer text-[1.25rem] text-gray-20"
          onClick={(e) => handleDotsMenuButtonClick(e)}
        >
          <DotsVerticalIcon />
        </span>
        {isMenuOpen && (
          <ul className="absolute -bottom-2 right-0 z-40 w-[6.5rem] translate-y-full rounded-xl bg-gray-00 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.15)]">
            {menuList.map((menu, index) => (
              <li
                key={index}
                className={clsx(
                  'flex cursor-pointer items-center justify-between gap-1 px-4 py-2.5',
                  {
                    'text-gray-50': menu.style === 'default',
                    'text-danger-40': menu.style === 'danger',
                  },
                )}
                onClick={menu.onClick}
              >
                <span>{menu.icon}</span>
                <span className="text-md-200">{menu.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DotsMenuButton;
