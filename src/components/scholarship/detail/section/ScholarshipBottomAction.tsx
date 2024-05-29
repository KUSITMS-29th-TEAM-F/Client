'use client';

import { fetchLike, fetchSave, fetchScholarship } from '@/api/scholarship';
import BookmarkFilledIcon from '@/components/ui/icon/BookmarkFilledIcon';
import BookmarkIcon from '@/components/ui/icon/BookmarkIcon';
import HeartFilledIcon from '@/components/ui/icon/HeartFilledIcon';
import HeartIcon from '@/components/ui/icon/HeartIcon';
import ShareIcon from '@/components/ui/icon/ShareIcon';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface ScholarshipBottomActionProps {
  memberIsLiked: boolean;
  likes: number;
  scholarshipId: number;
}

const ScholarshipBottomAction = ({
  memberIsLiked,
  likes,
  scholarshipId,
}: ScholarshipBottomActionProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(memberIsLiked);
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [isSaved, setIsSaved] = useState<boolean>(false);

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
      icon: isLiked ? <HeartFilledIcon /> : <HeartIcon />,
      text: `${likeCount}`,
      active: isLiked,
      onClick: () => handleLike(),
    },
  ];

  const handleLike = async () => {
    await fetchLike(scholarshipId, !isLiked);
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = async () => {
    await fetchSave(scholarshipId, !isSaved);
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchScholarship(scholarshipId);
      setLikeCount(res.data.likes);
      setIsLiked(res.data.memberIsLiked);
      setIsSaved(res.data.memberIsStored);
    };
    fetchData();
  }, []);

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
          onClick={handleSave}
        >
          <span className="text-[1.5rem]">
            {isSaved ? (
              <BookmarkFilledIcon />
            ) : (
              <BookmarkIcon strokeWidth={2.5} />
            )}
          </span>
          <span className="text-lg-300">{isSaved ? '저장됨' : '저장하기'}</span>
        </button>
      </div>
    </div>
  );
};

export default ScholarshipBottomAction;
