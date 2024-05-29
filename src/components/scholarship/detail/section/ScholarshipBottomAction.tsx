import ShareIcon from '../../../ui/icon/ShareIcon';
import HeartFilledIcon from '../../../ui/icon/HeartFilledIcon';
import HeartIcon from '../../../ui/icon/HeartIcon';
import clsx from 'clsx';
import BookmarkFilledIcon from '../../../ui/icon/BookmarkFilledIcon';
import BookmarkIcon from '../../../ui/icon/BookmarkIcon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../../../api/axios';

interface ScholarshipBottomActionProps {
  memberIsLiked: boolean;
  likes: number;
  scholarshipId: number;
  memberIsStored: boolean;
}

const ScholarshipBottomAction = ({
  memberIsLiked,
  likes,
  scholarshipId,
  memberIsStored,
}: ScholarshipBottomActionProps) => {
  const queryClient = useQueryClient();

  const actionList: {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    onClick?: () => void;
  }[] = [
    {
      icon: <ShareIcon />,
      text: '공유하기',
    },
    {
      icon: memberIsLiked ? <HeartFilledIcon /> : <HeartIcon />,
      text: `${likes}`,
      active: memberIsLiked,
      onClick: () => handleLikeButtonClick(),
    },
  ];

  const handleLike = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/announcements/${scholarshipId}/likes`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  const deleteLike = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/announcements/${scholarshipId}/likes`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  const handleSave = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/announcements/${scholarshipId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  const cancelSave = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/members/application/${scholarshipId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  const handleLikeButtonClick = async () => {
    if (memberIsLiked) {
      deleteLike.mutate();
    } else {
      handleLike.mutate();
    }
  };

  const handleSaveButtonClick = async () => {
    if (memberIsStored) {
      cancelSave.mutate();
    } else {
      handleSave.mutate();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 h-[4rem] w-full border-t border-gray-10 bg-gray-00 pl-4">
      <div className="mx-auto grid h-full max-w-screen-lg grid-cols-5">
        {actionList.map((action, index) => (
          <button
            key={index}
            className="flex h-full items-end justify-center"
            onClick={action.onClick}
          >
            <div className="flex flex-col items-center gap-1 px-4 pb-2 text-gray-60">
              <div>
                <span
                  className={clsx('text-[1.5rem]', {
                    'text-primary': action.active,
                  })}
                >
                  {action.icon}
                </span>
              </div>
              <div className="caption-300">{action.text}</div>
            </div>
          </button>
        ))}
        <button
          className="col-span-3 flex items-center justify-center gap-2.5 bg-primary text-gray-00"
          onClick={handleSaveButtonClick}
        >
          <span className="text-[1.5rem]">
            {memberIsStored ? (
              <BookmarkFilledIcon />
            ) : (
              <BookmarkIcon strokeWidth={2.5} />
            )}
          </span>
          <span className="text-lg-300">
            {memberIsStored ? '저장됨' : '저장하기'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ScholarshipBottomAction;
