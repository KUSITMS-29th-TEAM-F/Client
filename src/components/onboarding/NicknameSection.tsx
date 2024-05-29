import clsx from 'clsx';
import FormControl from '../ui/FormControl';
import Input from '../ui/Input';

interface NicknameSectionProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  isVisible?: boolean;
}

const NicknameSection = ({
  nickname,
  setNickname,
  isVisible,
}: NicknameSectionProps) => {
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <section
      className={clsx({
        hidden: !isVisible,
        block: isVisible,
      })}
    >
      <FormControl label="닉네임" required>
        <Input
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="10자 이내 한글/영어/숫자 조합"
        />
      </FormControl>
    </section>
  );
};

export default NicknameSection;
