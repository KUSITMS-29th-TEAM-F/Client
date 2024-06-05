import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import QuestionBox from '../../components/cover-letter/QuestionInput';
import BackButtonHeader from '../../components/ui/BackButtonHeader';
import Dropdown from '../../components/ui/Dropdown';
import PopUp from '../../components/ui/PopUp';
import GrayBackground from '../../components/ui/global-style/GrayBackground';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

const CoverLetterCreate = () => {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [scholarshipList, setScholarshipList] = useState<
    {
      applyId: number;
      scholarShipName: string;
    }[]
  >([]);
  const [questionAnswerList, setQuestionAnswerList] = useState<
    {
      question: string;
      content: string;
    }[]
  >([]);

  const scholarshipItemList: string[] = scholarshipList.map(
    (scholarship) => scholarship.scholarShipName,
  );

  useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await axios.get('/apply-list/all');
      setScholarshipList(res.data.data.applyList);
      return res.data;
    },
  });

  const getQuestionList = useQuery({
    queryKey: [],
    queryFn: async () => {
      if (selectedIndex === null) return null;
      const applyId = scholarshipList[selectedIndex].applyId;
      const res = await axios.get(
        `/members/cover-letters/questions/${applyId}`,
      );
      setQuestionAnswerList(
        res.data.data.coverLetterQuestionList.map((question: string) => ({
          question,
          content: '',
        })),
      );
      return res.data;
    },
    enabled: selectedIndex !== null,
  });

  const handleAnswerChange = (index: number, content: string) => {
    const newQuestionAnswerList = [...questionAnswerList];
    newQuestionAnswerList[index].content = content;
    setQuestionAnswerList(newQuestionAnswerList);
  };

  const handleBackButtonClick = () => {
    setIsPopUpOpen(true);
  };

  const handleSaveButtonClick = () => {
    navigate(-1);
  };

  const handlePopUpConfirm = () => {
    setIsPopUpOpen(false);
    navigate(-1);
  };

  const handlePopUpCancel = () => {
    setIsPopUpOpen(false);
  };

  useEffect(() => {
    getQuestionList.refetch();
  }, [selectedIndex]);

  return (
    <div className="pb-16">
      <GrayBackground />
      <div>
        <header className="fixed w-full bg-gray-00">
          <BackButtonHeader
            backButton={{ label: '자기소개서', onClick: handleBackButtonClick }}
            confirmButton={{
              label: '저장',
              onClick: handleSaveButtonClick,
            }}
            fixed={false}
          />
          <div className="px-4">
            <div className="mx-auto max-w-screen-lg">
              <div className="px-2 py-2">
                <Dropdown
                  itemList={scholarshipItemList}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  placeholder="장학금을 선택하세요"
                />
              </div>
              <div className="px-2 py-4">
                <input
                  type="text"
                  className="title-sm-200 w-full text-gray-80 outline-none placeholder:text-gray-40"
                  placeholder="제목을 입력하세요"
                />
              </div>
            </div>
          </div>
        </header>
        <div className="h-[166.5px]" />
      </div>
      <main className="w-full p-4">
        <div className="mx-auto max-w-screen-lg">
          {selectedIndex !== null && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {questionAnswerList.map((questionAnswer, index) => (
                <QuestionBox
                  key={index}
                  maxAnswerLength={1500}
                  question={questionAnswer.question}
                  answer={questionAnswer.content}
                  onAnswerChange={(e) =>
                    handleAnswerChange(index, e.target.value)
                  }
                  input
                />
              ))}
            </div>
          )}
        </div>
      </main>
      {isPopUpOpen && (
        <PopUp
          confirmButton={{ label: '나가기' }}
          cancelButton={{ label: '취소' }}
          onConfirm={handlePopUpConfirm}
          onCancel={handlePopUpCancel}
        >
          작성하던 내용이 저장되지 않았습니다.
          <br />
          페이지에서 나가시겠습니까?
        </PopUp>
      )}
    </div>
  );
};

export default CoverLetterCreate;
