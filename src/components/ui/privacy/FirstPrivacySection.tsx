import Dropdown from '@/components/ui/Dropdown';
import BinarySelect from '../BinarySelect';
import FormControl from '../FormControl';
import UnitInput from '../UnitInput';
import {
  areaList,
  cityList,
  genderList,
  yearList,
} from '@/constants/optionList';
import PrivacySectionLayout from './PrivacySectionLayout';
import { PrivacySectionProps } from '@/interfaces/privacy';

const FirstPrivacySection = ({
  isVisible,
  value,
  handleInputChange,
  handleSelectedIndexChange,
}: PrivacySectionProps) => {
  return (
    <PrivacySectionLayout isVisible={isVisible}>
      <FormControl label="성별" required>
        <BinarySelect
          selectedIndex={value.gender}
          setSelectedIndex={handleSelectedIndexChange('gender')}
          optionList={genderList}
        />
      </FormControl>
      <FormControl label="출생년도" required>
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            selectedIndex={value.year}
            setSelectedIndex={handleSelectedIndexChange('year')}
            itemList={yearList}
            placeholder="연도"
          />
        </div>
      </FormControl>
      <FormControl label="거주지역" required>
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            selectedIndex={value.city}
            setSelectedIndex={handleSelectedIndexChange('city')}
            itemList={cityList}
            placeholder="시/도"
          />
          <Dropdown
            selectedIndex={value.area}
            setSelectedIndex={handleSelectedIndexChange('area')}
            itemList={areaList}
            placeholder="구"
          />
        </div>
      </FormControl>
      <FormControl label="거주형태" required>
        <UnitInput
          inputProps={{
            type: 'number',
            name: 'familySize',
            value: value.familySize,
            onChange: handleInputChange,
          }}
          unit="인 가구"
        />
      </FormControl>
    </PrivacySectionLayout>
  );
};

export default FirstPrivacySection;
