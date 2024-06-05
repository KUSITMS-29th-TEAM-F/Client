interface QuestionBox {
  input?: boolean;
  maxAnswerLength: number;
  question?: string;
  answer?: string;
  onAnswerChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const QuestionBox = ({
  input = false,
  maxAnswerLength,
  question,
  answer,
  onAnswerChange,
}: QuestionBox) => {
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxAnswerLength) return;
    if (!onAnswerChange) return;
    onAnswerChange(e);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-gray-00 px-6 py-5">
      <div className="text-lg-200 text-gray-80">{question}</div>
      <hr />
      {input ? (
        <textarea
          rows={5}
          placeholder="내용을 입력하세요"
          className="text-sm-extra resize-none text-gray-60 outline-none placeholder:text-gray-40"
          value={answer}
          onChange={handleAnswerChange}
        />
      ) : (
        <div className="text-sm-extra text-gray-60">{answer}</div>
      )}
      <div className="text-sm-200 text-right">
        <span className="text-gray-40">{answer?.toString().length || 0}</span>
      </div>
    </div>
  );
};

export default QuestionBox;
