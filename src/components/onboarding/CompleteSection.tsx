import clsx from 'clsx';

import CheckIcon from '../ui/icon/CheckIcon';
import Capsule from '../ui/Capsule';
import FilePlusIcon from '../ui/icon/FilePlusIcon';

interface NicknameSectionProps {
  isVisible?: boolean;
}

const CompleteSection = ({ isVisible }: NicknameSectionProps) => {
  const handleButtonClick = () => {
    window.location.href = '/recommend';
  };

  return (
    <section
      className={clsx('flex h-full items-center justify-center', {
        hidden: !isVisible,
        block: isVisible,
      })}
    >
      <div className="flex flex-col items-center">
        <div>
          <span className="text-[3rem] text-primary">
            <CheckIcon />
          </span>
        </div>
        <p className="title-sm-200 mt-2 text-gray-80">기본 정보 입력 완료!</p>
        <Capsule
          size="lg"
          variant="primary"
          className="mt-10 flex cursor-pointer items-center justify-center gap-1"
          onClick={handleButtonClick}
        >
          <span className="text-[1.5rem]">
            <FilePlusIcon />
          </span>
          <span>내 맞춤 장학금 보러가기</span>
        </Capsule>
      </div>
    </section>
  );
};

export default CompleteSection;
