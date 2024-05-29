import clsx from 'clsx';

interface BinarySelectProps {
  selectedIndex: number | null;
  setSelectedIndex: (selectedIndex: number | null) => void;
  optionList: string[];
}

const BinarySelect = ({
  selectedIndex,
  setSelectedIndex,
  optionList: menuList,
}: BinarySelectProps) => {
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {menuList.map((option, index) => (
        <button
          key={index}
          className={clsx('rounded-lg border py-3 text-center', {
            'border-primary bg-primary-00 text-primary-80':
              selectedIndex === index,
            'border-gray-15 bg-gray-00 text-gray-30': selectedIndex !== index,
          })}
          onClick={() => handleSelect(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default BinarySelect;
