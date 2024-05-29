import BackButtonHeader from '@/components/ui/BackButtonHeader';
import Image from 'next/image';

const ArticlePage = () => {
  const content =
    '안녕하세요. 팀 맨동입니다!\n오늘은 건강보험료 자격득실확인서 발급 방법에 대해 소개해드리려고 합니다.\n\n대학생분들은 건강보험료를 직접 납부하지 않는 경우가 많아, 어디서 어떻게 발급 받을 수 있는 서류인지 굉장히 생소하실텐데요.\n\n생각보다 간단히 발급 받으실 수 있습니다.\n\n국민건강보험공단 홈페이지 접속하기 (https://www.nhis.or.kr/nhis/index.do)\n홈페이지 로그인\n[민원여기요] - [개인민원] - [증명서 발급/확인] - [자격득실확인서]\n조회조건 전체로 하여 조회\n전체 목록 체크 후 프린트 발급 클릭\n확인서(PDF파일) 생성됨\n\n위와 같은 절차를 거쳐 온라인으로 간편하게 서류 발급이 가능하며, 건강보험공단 지사 방문을 통해서도 발급 가능합니다.\n\n감사합니다.';

  return (
    <div className="pb-16">
      <BackButtonHeader
        backButton={{
          label: '아티클',
          backUrl: '-1',
        }}
        relative="md"
        fixed
      />
      <div className="px-4 pt-2">
        <div className="mx-auto max-w-screen-md">
          <header className="flex flex-col gap-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/article/article1.jpeg"
                alt="아티클 임시 이미지"
                fill
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="title-md-200 text-gray-90">
                건강보험료 자격득실확인서 발급 방법은?
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="relative aspect-square w-[1.25rem] overflow-hidden rounded-full">
                    <Image
                      src="/images/placeholders/placeholder-image.png"
                      alt="프로필 임시 이미지"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <span className="text-md-200 text-gray-60">닉네임</span>
                </div>
                <div>
                  <span className="caption-200 text-gray-30">2024.05.12</span>
                </div>
              </div>
            </div>
          </header>
          <main className="mt-8">
            <div className="text-sm-extra whitespace-pre-wrap text-gray-80">
              {content}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
