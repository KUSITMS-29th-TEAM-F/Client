'use client';

import { useState } from 'react';

interface QuestionBox {
  input?: boolean;
  maxAnswerLength: number;
  question?: string;
  answer?: string;
}

const QuestionBox = ({
  input = false,
  maxAnswerLength,
  question,
  answer,
}: QuestionBox) => {
  const [answerValue, setAnswerValue] = useState<string>(answer || '');

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxAnswerLength) return;
    setAnswerValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-gray-00 px-6 py-5">
      {input ? (
        <textarea
          placeholder="질문을 입력하세요"
          value={question}
          rows={3}
          className="text-lg-200 resize-none text-gray-80 outline-none placeholder:text-gray-40"
        />
      ) : (
        <div className="text-lg-200 text-gray-80">{question}</div>
      )}
      <hr />
      {input ? (
        <textarea
          rows={5}
          placeholder="내용을 입력하세요"
          className="text-sm-extra resize-none text-gray-60 outline-none placeholder:text-gray-40"
          value={answerValue}
          onChange={handleAnswerChange}
        />
      ) : (
        <div className="text-sm-extra text-gray-60">{answer}</div>
      )}
      <div className="text-sm-200 text-right">
        <span className="text-gray-40">{answerValue.length}</span>
      </div>
    </div>
  );
};

export default QuestionBox;
