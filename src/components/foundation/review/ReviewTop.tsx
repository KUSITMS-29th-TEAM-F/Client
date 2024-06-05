import StarFilledIcon from '../../ui/icon/StarFilledIcon';

const ReviewTop = () => {
  return (
    <div className="py-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 4 }, (_, index) => index + 1).map((th) => (
            <span key={th} className="text-[1.25rem] text-primary">
              <StarFilledIcon />
            </span>
          ))}
          {Array.from({ length: 1 }, (_, index) => index + 1).map((th) => (
            <span key={th} className="text-[1.25rem] text-gray-15">
              <StarFilledIcon />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="title-sm-300 text-gray-80">4.0</span>
          <span className="text-md-300 text-gray-40">(23)</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewTop;
