'use client';

import { useState } from 'react';

import ChevronRightIcon from '../ui/icon/ChevronRightIcon';
import clsx from 'clsx';
import CheckIcon from '../ui/icon/CheckIcon';
import { changeMyScholarshipStatus } from '@/api/my-scholarship';
import { useRouter } from 'next/navigation';

interface StatusCheckProps {
  applyId: number;
  initialStatus: string;
}

const StatusCheck = ({ applyId, initialStatus }: StatusCheckProps) => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const valueList = ['지원예정', '지원완료', '합격', '불합격'];

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = async (
    e: React.MouseEvent<HTMLLIElement>,
    value: string,
  ) => {
    e.stopPropagation();
    await changeMyScholarshipStatus(applyId, valueList.indexOf(value));
    setStatus(value);
    router.refresh();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          'flex cursor-pointer items-center gap-1 rounded-lg border px-4 py-2 ',
          {
            'border-gray-10 text-gray-40':
              status === '지원예정' ||
              status === '지원완료' ||
              status === '미입력',
            'border-success-01 bg-success-01 text-success-60':
              status === '합격',
            'border-danger-00 bg-danger-00 text-danger-50': status === '불합격',
          },
        )}
        onClick={handleMenuOpen}
      >
        <span className="text-lg-200">{status}</span>
        <span>
          <ChevronRightIcon />
        </span>
      </div>
      {isMenuOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-end justify-center bg-black bg-opacity-50"
          onClick={handleMenuClose}
        >
          <div className="flex w-full max-w-screen-sm flex-col gap-3 rounded-t-3xl bg-gray-00 p-6">
            <h1 className="text-lg-300 text-gray-80">지원 상태 설정</h1>
            <ul>
              {valueList.map((value) => (
                <li
                  key={value}
                  className="text-lg-200 flex cursor-pointer items-center gap-2 px-6 py-4 "
                  onClick={(e) => handleMenuItemClick(e, value)}
                >
                  {value === status && (
                    <span className="text-[1.25rem] text-primary-80">
                      <CheckIcon />
                    </span>
                  )}
                  <span
                    className={clsx({
                      'text-gray-50': value !== status,
                      'text-primary-80': value === status,
                    })}
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCheck;
