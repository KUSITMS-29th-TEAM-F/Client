import { ScholarshipType } from '../../../pages/scholarship/ScholarshipDetail';
import { ReviewType } from '../main/ReviewsMain';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviewList: ReviewType[];
  scholarship: ScholarshipType;
}

const ReviewList = ({ reviewList, scholarship }: ReviewListProps) => {
  return (
    <ul>
      {reviewList.length === 0 ? (
        <p className="py-4 text-center text-gray-50">후기가 없습니다.</p>
      ) : (
        reviewList.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            scholarship={scholarship}
          />
        ))
      )}
    </ul>
  );
};

export default ReviewList;
