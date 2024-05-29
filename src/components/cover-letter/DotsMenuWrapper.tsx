'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import PencilCogIcon from '../ui/icon/PencilCogIcon';
import TrashXIcon from '../ui/icon/TrashXIcon';
import DotsMenuButton, { DotsMenuButtonProps } from '../ui/DotsMenuButton';
import PopUp from '../ui/PopUp';

interface DotsMenuWrapperProps {
  coverLetterId: number;
}

const DotsMenuWrapper = ({ coverLetterId }: DotsMenuWrapperProps) => {
  const router = useRouter();

  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList: DotsMenuButtonProps['menuList'] = [
    {
      label: '수정하기',
      icon: <PencilCogIcon />,
      style: 'default',
      onClick: () => handleEditMenuItemClick(),
    },
    {
      label: '삭제하기',
      icon: <TrashXIcon />,
      style: 'danger',
      onClick: () => handleDeleteMenuItemClick(),
    },
  ];

  const handleEditMenuItemClick = () => {
    router.push(`/cover-letters/${coverLetterId}/edit`);
  };

  const handleDeleteMenuItemClick = () => {
    setIsMenuOpen(false);
    setIsDeletePopUpOpen(true);
  };

  const handleDeletePopUpClose = () => {
    setIsDeletePopUpOpen(false);
  };

  const handleDeleteButtonClick = () => {
    setIsDeletePopUpOpen(false);
  };

  return (
    <div>
      <DotsMenuButton
        menuList={menuList}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {isDeletePopUpOpen && (
        <PopUp
          confirmButton={{ label: '삭제' }}
          cancelButton={{ label: '취소' }}
          onConfirm={handleDeleteButtonClick}
          onCancel={handleDeletePopUpClose}
        >
          작성했던 문서가 사라집니다.
          <br />
          삭제하시겠습니까?
        </PopUp>
      )}
    </div>
  );
};

export default DotsMenuWrapper;
