import clsx from 'clsx';

import HeartFilledIcon from './icon/HeartFilledIcon';
import HeartIcon from './icon/HeartIcon';

interface FavoriteHeartButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const FavoriteHeartButton = ({
  isFavorite,
  onClick,
}: FavoriteHeartButtonProps) => {
  return (
    <div
      className={clsx('text-[1.5rem]', {
        'text-primary': isFavorite,
        'text-gray-20': !isFavorite,
      })}
      onClick={onClick}
    >
      {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
    </div>
  );
};

export default FavoriteHeartButton;
