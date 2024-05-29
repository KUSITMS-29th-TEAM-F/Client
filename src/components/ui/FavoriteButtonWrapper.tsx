'use client';

import { useState } from 'react';

import FavoriteHeartButton from '@/components/ui/FavoriteHeartButton';

interface FavoriteButtonWrapperProps {
  isFavorite: boolean;
}

const FavoriteButtonWrapper = ({
  isFavorite: isFavoriteRaw,
}: FavoriteButtonWrapperProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteRaw);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <FavoriteHeartButton
        isFavorite={isFavorite}
        onClick={handleFavoriteClick}
      />
    </>
  );
};

export default FavoriteButtonWrapper;
