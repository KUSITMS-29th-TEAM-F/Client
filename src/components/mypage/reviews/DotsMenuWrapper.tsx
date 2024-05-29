import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DotsMenuButton, { DotsMenuButtonProps } from '../../ui/DotsMenuButton';
import PencilCogIcon from '../../ui/icon/PencilCogIcon';
import TrashXIcon from '../../ui/icon/TrashXIcon';
import PopUp from '../../ui/PopUp';

interface DotsMenuWrapperProps {
  reviewId: number;
}

const DotsMenuWrapper = ({ reviewId }: DotsMenuWrapperProps) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);

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
    navigate(`/me/reviews/${reviewId}/edit`);
  };

  const handleDeleteMenuItemClick = () => {
    setIsMenuOpen(false);
    setIsDeletePopUpOpen(true);
  };

  const handleDeletePopUpCancel = () => {
    setIsDeletePopUpOpen(false);
  };

  const handleDeletePopUpConfirm = () => {
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
          confirmButton={{
            label: '삭제',
          }}
          cancelButton={{
            label: '취소',
          }}
          onConfirm={handleDeletePopUpConfirm}
          onCancel={handleDeletePopUpCancel}
        >
          작성했던 후기가 사라집니다.
          <br />
          삭제하시겠습니까?
        </PopUp>
      )}
    </div>
  );
};

export default DotsMenuWrapper;
