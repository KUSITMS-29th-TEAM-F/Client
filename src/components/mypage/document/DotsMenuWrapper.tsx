import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import DotsMenuButton, { DotsMenuButtonProps } from '../../ui/DotsMenuButton';
import PencilCogIcon from '../../ui/icon/PencilCogIcon';
import TrashXIcon from '../../ui/icon/TrashXIcon';
import PopUp from '../../ui/PopUp';
import axios from '../../../api/axios';

interface DotsMenuWrapperProps {
  documentId: number;
}

const DotsMenuWrapper = ({ documentId }: DotsMenuWrapperProps) => {
  const queryClient = useQueryClient();
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

  const deleteDocument = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/members/documents/${documentId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['members'] });
      setIsDeletePopUpOpen(false);
    },
  });

  const handleEditMenuItemClick = () => {
    navigate(`/me/documents/${documentId}/edit`);
  };

  const handleDeleteMenuItemClick = () => {
    setIsMenuOpen(false);
    setIsDeletePopUpOpen(true);
  };

  const handleDeletePopUpCancel = () => {
    setIsDeletePopUpOpen(false);
  };

  const handleDeletePopUpConfirm = async () => {
    deleteDocument.mutate();
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
          등록한 서류가 사라집니다.
          <br />
          삭제하시겠습니까?
        </PopUp>
      )}
    </div>
  );
};

export default DotsMenuWrapper;
