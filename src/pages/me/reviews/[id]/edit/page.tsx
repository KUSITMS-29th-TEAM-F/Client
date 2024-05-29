'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BackButtonHeader from '@/components/ui/BackButtonHeader';
import GrayBackground from '@/components/ui/global-style/GrayBackground';
import Stars from '@/components/ui/Stars';
import Button from '@/components/ui/Button';
import PopUp from '@/components/ui/PopUp';

const ReviewEditPage = () => {
  const router = useRouter();

  const [starScore, setStarScore] = useState(3);
  const [isBackPopUpOpen, setIsBackPopUpOpen] = useState(false);

  const handleEditButtonClick = () => {
    router.push('/me/reviews');
  };

  const handleBackButtonClick = () => {
    setIsBackPopUpOpen(true);
  };

  const handlePopUpConfirm = () => {
    setIsBackPopUpOpen(false);
    router.push('/me/reviews');
  };

  const handlePopUpCancel = () => {
    setIsBackPopUpOpen(false);
  };

  return (
    <div>
      <GrayBackground />
      <header>
        <BackButtonHeader
          backButton={{
            label: '후기 관리',
            onClick: handleBackButtonClick,
          }}
        />
      </header>
      <main className="flex flex-col gap-4 px-4 py-4">
        <div className="mx-auto w-full max-w-screen-lg">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-4">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/placeholders/placeholder-image.png"
                alt="임시 장학금 이미지"
                width={64}
                height={64}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-md-300 text-gray-70">장학금명</h1>
              <div className="text-md-200 text-gray-40">재단명</div>
              <div className="caption-200 text-gray-30">
                2024.04.01 ~ 2026.04.01
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-10 bg-gray-00 p-4">
            <Stars score={starScore} size="md" setScore={setStarScore} />
            <textarea className="text-sm-extra min-h-[10rem] resize-none border-t border-gray-05 pt-2 text-gray-70 outline-none">
              어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
              저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구
              어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
            </textarea>
          </div>
        </div>
      </main>
      <div className="fixed bottom-8 w-full px-4">
        <div className="mx-auto max-w-screen-lg">
          <Button onClick={handleEditButtonClick}>등록하기</Button>
        </div>
      </div>
      {isBackPopUpOpen && (
        <PopUp
          confirmButton={{
            label: '나가기',
          }}
          cancelButton={{
            label: '취소',
          }}
          onConfirm={handlePopUpConfirm}
          onCancel={handlePopUpCancel}
        >
          변경사항이 저장되지 않았습니다.
          <br />
          페이지에서 나가시겠습니까?
        </PopUp>
      )}
    </div>
  );
};

export default ReviewEditPage;
