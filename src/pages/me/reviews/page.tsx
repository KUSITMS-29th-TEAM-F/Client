import DotsMenuWrapper from '@/components/mypage/reviews/DotsMenuWrapper';
import BackButtonHeader from '@/components/ui/BackButtonHeader';
import Stars from '@/components/ui/Stars';
import Status from '@/components/ui/Status';
import Message2CogIcon from '@/components/ui/icon/Message2CogIcon';

const ReviewsPage = () => {
  const reviewList: {
    id: number;
    name: string;
    startDate: string;
    date: string;
    organization: string;
    pass: 'SUCCESS' | 'FAIL' | 'NONE';
    description: string;
    score: number;
  }[] = [
    {
      id: 1,
      name: '장학금명',
      date: '2024.03.22',
      startDate: '2024.03.22',
      organization: '재단명',
      pass: 'FAIL',
      description:
        '어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
      score: 3,
    },
    {
      id: 2,
      name: '장학금명',
      startDate: '2024.03.22',
      date: '2024.03.22',
      organization: '재단명',
      pass: 'SUCCESS',
      description:
        '어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
      score: 4,
    },
    {
      id: 3,
      name: '장학금명',
      startDate: '2024.03.22',
      date: '2024.03.22',
      organization: '재단명',
      pass: 'NONE',
      description:
        '어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
      score: 5,
    },
  ];

  return (
    <div className="pb-28">
      <div>
        <header className="fixed z-10 flex w-full flex-col bg-gray-00 px-4 pb-3">
          <BackButtonHeader
            backButton={{
              label: '마이페이지',
              backUrl: '/me',
            }}
            padding={false}
          />
          <div className="mx-auto flex w-full max-w-screen-lg items-center gap-1">
            <span className="text-[1.5rem]">
              <Message2CogIcon />
            </span>
            <h1 className="title-md-300 text-gray-80">후기 관리</h1>
          </div>
        </header>
        <div className="h-[84px]" />
      </div>
      <main className="px-4">
        <ul className="mx-auto max-w-screen-lg">
          {reviewList.map((review) => (
            <li
              key={review.id}
              className="flex flex-col gap-4 border-b border-gray-05 py-6 last:border-b-0"
            >
              <Stars score={review.score} size="sm" />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg-300 text-gray-80">{review.name}</h1>
                    <DotsMenuWrapper reviewId={review.id} />
                  </div>
                  <div className="text-md-200 text-gray-40">
                    {review.organization}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Status variant="primary">{review.startDate} 모집</Status>
                  {review.pass === 'SUCCESS' ? (
                    <Status variant="success">합격</Status>
                  ) : (
                    review.pass === 'FAIL' && (
                      <Status variant="danger">불합격</Status>
                    )
                  )}
                </div>
                <p className="text-sm-extra text-gray-70">
                  {review.description}
                </p>
              </div>
              <div>
                <span className="caption-200 text-gray-30">{review.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ReviewsPage;
