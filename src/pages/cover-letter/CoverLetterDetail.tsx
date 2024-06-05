import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import GrayBackground from '../../components/ui/global-style/GrayBackground';
import BackButtonHeader from '../../components/ui/BackButtonHeader';
import DotsMenuWrapper from '../../components/cover-letter/DotsMenuWrapper';
import QuestionBox from '../../components/cover-letter/QuestionInput';
import axios from '../../api/axios';

interface CoverLetterType {
  coverLetterId: number;
  scholarshipFoundation: string;
  scholarshipName: string;
  title: string;
  updatedAt: string;
}

const CoverLetterDetail = () => {
  const params = useParams<{ coverLetterId: string }>();

  const [coverLetter, setCoverLetter] = useState<CoverLetterType>({
    coverLetterId: 0,
    scholarshipFoundation: '',
    scholarshipName: '',
    title: '',
    updatedAt: '',
  });
  const [questionAnswerList, setQuestionAnswerList] = useState<
    {
      content: string;
      question: string;
    }[]
  >([]);

  const coverLetterId = Number(params.coverLetterId);

  useQuery({
    queryKey: ['members', 'cover-letters'],
    queryFn: async () => {
      const res = await axios.get('/members/cover-letters');
      setCoverLetter(
        res.data.data.coverLetterList.find(
          (coverLetter: CoverLetterType) =>
            coverLetter.coverLetterId === coverLetterId,
        ),
      );
      return res.data;
    },
  });

  useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await axios.get(`/members/cover-letters/${coverLetterId}`);
      setQuestionAnswerList(res.data.data.coverLetterList);
      return res.data;
    },
  });

  return (
    <div>
      <GrayBackground />
      <header>
        <div className="fixed w-full">
          <BackButtonHeader
            backButton={{
              label: '자기소개서',
              backUrl: '-1',
            }}
          />
          <div className="bg-gray-00 px-6">
            <div className="mx-auto flex max-w-screen-lg flex-col gap-2 pb-4 lg:px-3">
              <h1 className="title-sm-200 text-gray-70">{coverLetter.title}</h1>
              <div className="flex items-center justify-between">
                <div className="text-md-200 text-gray-40">
                  {coverLetter.scholarshipName} |{' '}
                  {coverLetter.scholarshipFoundation}
                </div>
                <DotsMenuWrapper coverLetterId={coverLetterId} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[116px]" />
      </header>
      <main className="w-full px-6">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 py-4 md:grid-cols-2">
          {questionAnswerList.map((question, index) => (
            <QuestionBox
              key={index}
              maxAnswerLength={1000}
              question={question.question}
              answer={question.content}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoverLetterDetail;
