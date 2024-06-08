import StarFilledIcon from '../../ui/icon/StarFilledIcon';
import { ReviewType } from '../main/ReviewsMain';

interface ReviewTopProps {
  reviewList: ReviewType[];
}

const ReviewTop = ({ reviewList }: ReviewTopProps) => {
  const starAverage =
    reviewList.length === 0
      ? 0
      : reviewList.reduce((acc, cur) => acc + cur.star, 0) / reviewList.length;

  return (
    <div className="py-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from(
            { length: Math.round(starAverage) },
            (_, index) => index + 1,
          ).map((th) => (
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
          <span className="title-sm-300 text-gray-80">{starAverage}</span>
          <span className="text-md-300 text-gray-40">
            ({reviewList.length})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewTop;
