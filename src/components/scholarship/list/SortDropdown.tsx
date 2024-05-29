'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import ChevronDownIcon from '@/components/ui/icon/ChevronDownIcon';

const SortDropdown = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sortList = ['최신순', '인기순', '마감순'];

  const handleDropdownClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectItem = (index: number) => {
    setSelectedIndex(index);
    setIsMenuOpen(false);
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
    <div ref={menuRef} className="relative">
      <div
        className="flex cursor-pointer items-center justify-start gap-1 text-gray-30"
        onClick={handleDropdownClick}
      >
        <span className="text-md-200">{sortList[selectedIndex]}</span>
        <span className="text-[1.25rem]">
          <ChevronDownIcon />
        </span>
      </div>
      {isMenuOpen && (
        <ul className="absolute right-0 z-20 mt-2 w-[4.4rem] rounded-xl bg-white py-1 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.10)]">
          {sortList.map((item, index) => (
            <li
              key={index}
              className="flex cursor-pointer items-center gap-2 px-4 py-1 text-center"
              onClick={() => handleSelectItem(index)}
            >
              <span
                className={clsx('text-md-200 w-full', {
                  'text-gray-80': selectedIndex === index,
                  'text-gray-50': selectedIndex !== index,
                })}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
