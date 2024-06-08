import { useState } from 'react';

import ReviewList from '../review/ReviewList';
import ReviewTop from '../review/ReviewTop';
import { useQuery } from '@tanstack/react-query';
import axios from '../../../api/axios';
import { ScholarshipType } from '../../../pages/scholarship/ScholarshipDetail';

export interface ReviewType {
  id: number;
  star: number;
  name: string;
  status: string;
  contents: string;
  date: string;
}

interface ReviewsMainProps {
  scholarship: ScholarshipType;
}

const ReviewsMain = ({ scholarship }: ReviewsMainProps) => {
  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  useQuery({
    queryKey: ['review'],
    queryFn: async () => {
      const res = await axios.get('/review');
      setReviewList(res.data.data.reviewList);
      return res.data;
    },
  });

  return (
    <main>
      <ReviewTop reviewList={reviewList} />
      <ReviewList reviewList={reviewList} scholarship={scholarship} />
    </main>
  );
};

export default ReviewsMain;
