import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import BackButtonHeader from '../../ui/BackButtonHeader';
import Dropdown from '../../ui/Dropdown';
import PopUp from '../../ui/PopUp';
import GrayBackground from '../../ui/global-style/GrayBackground';
import axios from '../../../api/axios';
import QuestionBox from '../question-box/QuestionBox';
import { CoverLetterType } from '../../../interfaces/cover-letter';

interface CoverLetterEditorProps {
  mode: 'create' | 'edit';
}

const CoverLetterEditor = ({ mode }: CoverLetterEditorProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams<{ coverLetterId: string }>();
  const [searchParams] = useSearchParams();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [scholarshipList, setScholarshipList] = useState<
    {
      applyId: number;
      scholarShipName: string;
    }[]
  >([]);
  const [coverLetter, setCoverLetter] = useState<CoverLetterType>({
    applyId: 0,
    scholarshipFoundation: '',
    scholarshipName: '',
    coverLetterTitle: '',
    coverLetterList: [],
  });

  const coverLetterId = Number(params.coverLetterId);
  const applyId = Number(searchParams.get('applyId')) || null;

  const scholarshipItemList: string[] = scholarshipList.map(
    (scholarship) => scholarship.scholarShipName,
  );

  useQuery({
    queryKey: ['apply-list', 'all'],
    queryFn: async () => {
      const res = await axios.get('/apply-list/all');
      setScholarshipList(res.data.data.applyList);
      return res.data;
    },
    enabled: mode === 'create',
  });

  const getQuestionList = useQuery({
    queryKey: ['members', 'cover-letters', 'questions', coverLetter.applyId],
    queryFn: async () => {
      if (selectedIndex === null) return null;
      const applyId = scholarshipList[selectedIndex].applyId;
      const res = await axios.get(
        `/members/cover-letters/questions/${applyId}`,
      );
      setCoverLetter({
        ...coverLetter,
        applyId,
        coverLetterList: res.data.data.coverLetterQuestionList.map(
          (question: string) => ({
            question,
            content: '',
          }),
        ),
      });
      return res.data;
    },
    enabled: selectedIndex !== null && mode === 'create',
  });

  useQuery({
    queryKey: ['members', 'cover-letters', coverLetterId],
    queryFn: async () => {
      const res = await axios.get(`/members/cover-letters/${coverLetterId}`);
      setCoverLetter(res.data.data);
      return res.data;
    },
    enabled: mode === 'edit',
  });

  const addCoverLetter = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/members/cover-letters', {
        applyId: coverLetter.applyId,
        title: coverLetter.coverLetterTitle,
        coverLetters: coverLetter.coverLetterList,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['members'] });
      navigate(-1);
    },
  });

  const editCoverLetter = useMutation({
    mutationFn: async () => {
      const res = await axios.patch('/members/cover-letters', {
        coverLetterId,
        applyId: coverLetter.applyId,
        title: coverLetter.coverLetterTitle,
        coverLetters: coverLetter.coverLetterList,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['members'] });
      navigate(-1);
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverLetter({ ...coverLetter, coverLetterTitle: e.target.value });
  };

  const handleAnswerChange = (index: number, content: string) => {
    const newQuestionAnswerList = [...coverLetter.coverLetterList];
    newQuestionAnswerList[index].content = content;
    setCoverLetter({ ...coverLetter, coverLetterList: newQuestionAnswerList });
  };

  const handleBackButtonClick = () => {
    setIsPopUpOpen(true);
  };

  const handleSaveButtonClick = () => {
    if (coverLetter.coverLetterTitle === '') return;
    if (
      coverLetter.coverLetterList.some(
        (questionAnswer) => questionAnswer.content === '',
      )
    )
      return;
    if (mode === 'create') {
      if (selectedIndex === null) return;
      addCoverLetter.mutate();
    } else if (mode === 'edit') {
      editCoverLetter.mutate();
    }
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

  useEffect(() => {
    if (!scholarshipList || !applyId) return;
    setSelectedIndex(
      scholarshipList.findIndex(
        (scholarship) => scholarship.applyId === applyId,
      ),
    );
  }, [applyId, scholarshipList]);

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
                  value={coverLetter.scholarshipName}
                  disabled={applyId !== null}
                />
              </div>
              <div className="px-2 py-4">
                <input
                  type="text"
                  className="title-sm-200 w-full text-gray-80 outline-none placeholder:text-gray-40"
                  placeholder="제목을 입력하세요"
                  value={coverLetter.coverLetterTitle}
                  onChange={handleTitleChange}
                />
              </div>
            </div>
          </div>
        </header>
        <div className="h-[166.5px]" />
      </div>
      <main className="w-full p-4">
        <div className="mx-auto max-w-screen-lg">
          {(selectedIndex !== null || mode === 'edit') && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {coverLetter.coverLetterList.map((questionAnswer, index) => (
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

export default CoverLetterEditor;
