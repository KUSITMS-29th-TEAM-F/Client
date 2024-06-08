import { ScholarshipType } from '../../../pages/scholarship/ScholarshipDetail';
import Status from '../../ui/Status';
import StarFilledIcon from '../../ui/icon/StarFilledIcon';
import ThumbUpIcon from '../../ui/icon/ThumbUpIcon';
import { ReviewType } from '../main/ReviewsMain';

interface ReviewItemProps {
  review: ReviewType;
  scholarship: ScholarshipType;
}

const ReviewItem = ({ review, scholarship }: ReviewItemProps) => {
  return (
    <li className="flex flex-col gap-4 border-b border-gray-05 py-6">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: review.star }, (_, index) => index + 1).map(
          (th) => (
            <span key={th} className="text-primary">
              <StarFilledIcon />
            </span>
          ),
        )}
        {Array.from({ length: 5 - review.star }, (_, index) => index + 1).map(
          (th) => (
            <span key={th} className="text-gray-15">
              <StarFilledIcon />
            </span>
          ),
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg-300 text-gray-80">{review.name}</h2>
        <div>
          <Status variant="primary">
            {scholarship.applicationPeriod.split(' ')[1]} 모집
          </Status>
          <Status variant={review.status === 'PASS' ? 'success' : 'danger'}>
            {review.status === 'PASS' ? '합격' : '불합격'}
          </Status>
        </div>
        <p className="text-sm-extra text-gray-70">{review.contents}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="aspect-square w-[1.25rem] overflow-hidden rounded-full">
              <img
                src="/images/placeholders/placeholder-profile.png"
                alt="프로필 임시 이미지"
              />
            </div>
            <span className="text-md-200 text-gray-60">익명</span>
          </div>
          <span className="caption-200 text-gray-30">{review.date}</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-primary">
          <span>
            <ThumbUpIcon />
          </span>
          <span className="caption-300">0</span>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
