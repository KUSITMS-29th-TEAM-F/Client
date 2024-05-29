interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      className="text-md-200 resize-none rounded-lg border border-gray-15 bg-gray-00 px-4 py-3 text-gray-80 outline-none placeholder:text-gray-30"
      {...props}
    />
  );
};

export default TextArea;
