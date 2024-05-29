import HeartIcon from '../ui/icon/HeartIcon';

interface ScholarItemProps {
  as?: keyof JSX.IntrinsicElements;
}

const ScholarItem = ({ as: Wrapper = 'div' }: ScholarItemProps) => {
  return (
    <Wrapper className="rounded-2xl border border-gray-10 bg-gray-00 p-4">
      <div className="flex items-center">
        <div className="aspect-square w-[4rem] overflow-hidden rounded-lg">
          <img
            src="/images/placeholders/placeholder-image.png"
            alt="장학금 이미지"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-3 flex flex-1 flex-col gap-1">
          <h2 className="text-md-300 text-gray-70">장학금명</h2>
          <p className="text-md-200 text-gray-40">재단명</p>
          <p className="caption-200 text-gray-30">2024.04.01 ~ 2026.04.01</p>
        </div>
        <div className="ml-2">
          <span className="text-[1.5rem] text-gray-20">
            <HeartIcon />
          </span>
        </div>
      </div>
      <div className="text-md-200 mt-2 text-primary">
        ♥ 9,890명이 찜했어요!
      </div>
    </Wrapper>
  );
};

export default ScholarItem;
