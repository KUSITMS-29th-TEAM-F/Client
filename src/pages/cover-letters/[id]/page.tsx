import DotsMenuButton from '@/components/ui/DotsMenuButton';
import QuestionBox from '@/components/cover-letter/QuestionInput';
import BackButtonHeader from '@/components/ui/BackButtonHeader';
import DotsMenuWrapper from '@/components/cover-letter/DotsMenuWrapper';
import GrayBackground from '@/components/ui/global-style/GrayBackground';

const CoverLetterPage = ({ params }: { params: { id: number } }) => {
  const questionList: { content: string; answer: string }[] = [
    {
      content:
        '어떤 학생인지 궁금해요. 성장배경, 학교생활, 가치관, 성격, 취향, 관심사 등 자신이 누구인지 알려주세요.',
      answer: `어린 시절부터 뚜렷한 목표의식을 미덕으로 생각했습니다. 목표를 이루기 위해 계획을 세우고, 차근차근 계획을 실천하여 목표를 성취해내는 과정이 즐거웠습니다. 그러나 대학에 진학하고서는 상황이 달라졌습니다. 원하던 학과에 진학하지 못한 터라, 통계학을 왜 공부해야 하는지 동기 부여가 되지 않았습니다.

목표의식을 회복한 계기는 멘토링 봉사였습니다. 성적을 고민하는 학생들을 상담해주며 '틀을 깨고 자신을 바라봐야 한다'는 조언을 건넸습니다. 저 스스로에게도 깨달음을 주는 시간이었습니다. '적성에 맞지 않는다'는 틀 안에 갇혀 의미를 찾고자 노력하지 않았던 제 모습을 반성하는 계기가 되었습니다.`,
    },
    {
      content: '어떤 꿈을 꾸고 있나요? 주얼리 분야로 꾸는 꿈을 알려주세요',
      answer: `자체 제작 쥬얼리를 가지고 참가한 첫 플리마켓에서는 작업시간 대비 효율적이지 못해 큰 이익을 거두지 못했습니다. 교훈을 얻고, 그다음 플리마켓은 더욱 철저하게 준비했습니다. 시장조사를 바탕으로 트랜디한 쥬얼리를 디자인하는 한편, 작업시간을 줄이기 위해 수작업을 한 쥬얼리와 바잉한 쥬얼리를 함께 판매하였으며, 디스플레이와 음악까지 신경 썼습니다.
그 결과 점점 더 높은 수익을 낼 수 있었습니다. 저는 소비자를 직접 경험하고 느낀 후 소비자가 필요로 하는 디자인을 할 때 좋은 성과를 낼 수 있다고 생각합니다.`,
    },
  ];

  return (
    <div>
      <GrayBackground />
      <header>
        <BackButtonHeader
          backButton={{
            label: '자기소개서',
            backUrl: '-1',
          }}
        />
        <div className="bg-gray-00 px-6">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-2 pb-4 lg:px-3">
            <h1 className="title-sm-200 text-gray-70">월곡주얼리 초안</h1>
            <div className="flex items-center justify-between">
              <div className="text-md-200 text-gray-40">
                월곡주얼리장학생 | 월곡주얼리산업진흥재단
              </div>
              <DotsMenuWrapper coverLetterId={params.id} />
            </div>
          </div>
        </div>
      </header>
      <main className="w-full px-6">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 py-4 md:grid-cols-2">
          {questionList.map((question, index) => (
            <QuestionBox
              key={index}
              maxAnswerLength={1000}
              question={question.content}
              answer={question.answer}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoverLetterPage;
