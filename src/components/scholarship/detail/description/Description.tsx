interface DescriptionProps {
  children: React.ReactNode;
}

const Description = ({ children }: DescriptionProps) => {
  return (
    <div className="text-sm-extra whitespace-pre-wrap p-6 text-gray-70">
      {children}
    </div>
  );
};

export default Description;
