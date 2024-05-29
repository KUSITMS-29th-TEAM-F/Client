import Capsule from './Capsule';

interface MultipleSelectProps {
  selectedIndex: number | null;
  setSelectedIndex: (selectedIndex: number | null) => void;
  optionList: string[];
}

const MultipleSelect = ({
  selectedIndex,
  setSelectedIndex,
  optionList,
}: MultipleSelectProps) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {optionList.map((departmentGroup, index) => (
        <Capsule
          key={index}
          size="sm"
          variant={index == selectedIndex ? 'stroke-primary' : 'stroke-default'}
          onClick={() => setSelectedIndex(index)}
        >
          {departmentGroup}
        </Capsule>
      ))}
    </div>
  );
};

export default MultipleSelect;
