'use client';

import clsx from 'clsx';

import StarFilledIcon from './icon/StarFilledIcon';

interface StatusProps {
  score: number;
  setScore?: (score: number) => void;
  size: 'sm' | 'md' | 'lg';
}

const Stars = ({ score, setScore, size }: StatusProps) => {
  const handleSetScore = (th: number) => {
    if (!setScore) return;
    if (score === th) setScore(th - 1);
    else setScore(th);
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => index + 1).map((th) => (
        <span
          key={th}
          className={clsx(
            {
              'text-primary': th <= score,
              'text-gray-10': th > score,
            },
            {
              'text-[1.5rem]': size === 'lg',
              'text-[1.375rem]': size === 'md',
              'text-[1rem]': size === 'sm',
            },
            {
              'cursor-pointer': !!setScore,
            },
          )}
          onClick={() => handleSetScore(th)}
        >
          <StarFilledIcon />
        </span>
      ))}
    </div>
  );
};

export default Stars;
