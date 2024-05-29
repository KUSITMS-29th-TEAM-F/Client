interface NumberUnitInputProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  unit: string;
}

const UnitInput = ({ inputProps, unit }: NumberUnitInputProps) => {
  return (
    <div className="flex items-center justify-end gap-1 rounded-lg border border-gray-15 px-4 py-3">
      <input
        className="text-md-200 flex-1 text-right text-gray-80 outline-none"
        {...inputProps}
      />
      <span className="text-md-200 text-gray-50">{unit}</span>
    </div>
  );
};

export default UnitInput;
