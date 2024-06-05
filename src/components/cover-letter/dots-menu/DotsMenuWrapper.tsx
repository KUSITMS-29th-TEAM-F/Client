import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import PencilCogIcon from '../../ui/icon/PencilCogIcon';
import TrashXIcon from '../../ui/icon/TrashXIcon';
import DotsMenuButton, { DotsMenuButtonProps } from '../../ui/DotsMenuButton';
import PopUp from '../../ui/PopUp';
import axios from '../../../api/axios';

interface DotsMenuWrapperProps {
  coverLetterId: number;
}

const DotsMenuWrapper = ({ coverLetterId }: DotsMenuWrapperProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const deleteCoverLetter = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/members/cover-letters/${coverLetterId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['members'] });
      navigate('/cover-letters');
    },
  });

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
    navigate(`/cover-letters/${coverLetterId}/edit`);
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
    deleteCoverLetter.mutate();
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
