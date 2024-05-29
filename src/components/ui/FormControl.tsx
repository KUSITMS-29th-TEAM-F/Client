interface FormControlProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormControl = ({ label, required, children }: FormControlProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-md-200 text-gray-90">{label}</span>
        {required && (
          <>
            &nbsp;
            <span className="text-md-200 text-primary">*</span>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default FormControl;
