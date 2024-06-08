import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Header from '../../components/foundation/header/Header';
import ReviewsMain from '../../components/foundation/main/ReviewsMain';
import { ScholarshipType } from '../scholarship/ScholarshipDetail';
import axios from '../../api/axios';

const FoundationDetail = () => {
  const params = useParams<{ id: string }>();

  const [scholarship, setScholarship] = useState<ScholarshipType>({
    scholarshipId: 0,
    scholarShipImage: '',
    scholarshipName: '',
    scholarshipFoundation: '',
    remainingDay: 0,
    applyPossible: '',
    supportAmount: '',
    applicationPeriod: '',
    hashTag: '',
    conditionCheckResponseList: [],
    detailContents: '',
    likes: 0,
    memberIsLiked: false,
    memberIsStored: false,
    applyLink: '',
  });

  useQuery({
    queryKey: ['announcements', params.id],
    queryFn: async () => {
      const res = await axios.get(`/announcements/${params.id}`);
      setScholarship(res.data.data);
      console.log(res.data.data);
      return res.data;
    },
  });

  return (
    <div className="relative px-4 pb-16">
      <div className="mx-auto w-full max-w-screen-lg">
        <Header scholarship={scholarship} />
        <div className="h-[0.5rem]">
          <div className="absolute left-0 h-[0.5rem] w-screen bg-gray-05" />
        </div>
        <ReviewsMain scholarship={scholarship} />
      </div>
    </div>
  );
};

export default FoundationDetail;
