import Dropdown from '@/components/ui/Dropdown';
import FormControl from '../FormControl';
import UnitInput from '../UnitInput';
import MultipleSelect from '../MultipleSelect';
import {
  incomeBracketList,
  socialSupportBracketList,
  supportIncomeBracketList,
} from '@/constants/optionList';
import PrivacySectionLayout from './PrivacySectionLayout';
import { PrivacySectionProps } from '@/interfaces/privacy';

const ThirdPrivacySection = ({
  isVisible,
  value,
  handleInputChange,
  handleSelectedIndexChange,
}: PrivacySectionProps) => {
  return (
    <PrivacySectionLayout isVisible={isVisible}>
      <FormControl label="소득분위">
        <Dropdown
          selectedIndex={value.incomeBracket}
          setSelectedIndex={handleSelectedIndexChange('incomeBracket')}
          itemList={incomeBracketList}
          placeholder="소득분위"
        />
      </FormControl>
      <FormControl label="학자금 지원구간">
        <Dropdown
          selectedIndex={value.supportIncomeBracket}
          setSelectedIndex={handleSelectedIndexChange('supportIncomeBracket')}
          itemList={supportIncomeBracketList}
          placeholder="학자금 지원구간"
        />
      </FormControl>
      <FormControl label="월 고정소득">
        <UnitInput
          inputProps={{
            type: 'number',
            name: 'monthlyIncome',
            value: value.monthlyIncome,
            onChange: handleInputChange,
          }}
          unit="만원"
        />
      </FormControl>
      <FormControl label="사회배려계층 여부">
        <MultipleSelect
          selectedIndex={value.socialSupportBracket}
          setSelectedIndex={handleSelectedIndexChange('socialSupportBracket')}
          optionList={socialSupportBracketList}
        />
      </FormControl>
    </PrivacySectionLayout>
  );
};

export default ThirdPrivacySection;
