'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import ChevronDownIcon from './icon/ChevronDownIcon';
import CheckIcon from './icon/CheckIcon';

interface DropdownProps {
  selectedIndex: number | null;
  setSelectedIndex: (selectedIndex: number | null) => void;
  itemList: string[];
  placeholder: string;
  className?: string;
}

const Dropdown = ({
  selectedIndex,
  setSelectedIndex,
  itemList,
  placeholder,
  className,
}: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectScholarship = (index: number) => {
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
    <div ref={menuRef} className={clsx('relative', className)}>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-15 bg-gray-00 px-4 py-3"
        onClick={handleDropdownClick}
      >
        <span
          className={clsx(
            'text-md-200 overflow-hidden overflow-ellipsis whitespace-nowrap',
            {
              'text-gray-80': selectedIndex !== null,
              'text-gray-30': selectedIndex === null,
            },
          )}
        >
          {selectedIndex !== null ? itemList[selectedIndex] : placeholder}
        </span>
        <span className="text-[1.25rem] text-gray-40">
          <ChevronDownIcon />
        </span>
      </div>
      {isMenuOpen && (
        <ul className="absolute z-10 mt-2 max-h-[20rem] min-w-full overflow-y-auto rounded-lg bg-white shadow-[0px_0px_16px_0px_rgba(0,0,0,0.10)]">
          {itemList.map((item, index) => (
            <li
              key={index}
              className="flex cursor-pointer items-center gap-2 p-4"
              onClick={() => handleSelectScholarship(index)}
            >
              {selectedIndex === index && (
                <span>
                  <CheckIcon />
                </span>
              )}
              <span
                className={clsx({
                  'text-md-300 text-gray-80': selectedIndex === index,
                  'text-md-200 text-gray-50': selectedIndex !== index,
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

export default Dropdown;
