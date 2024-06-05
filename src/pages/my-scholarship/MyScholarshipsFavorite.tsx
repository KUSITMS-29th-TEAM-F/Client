import { Link } from 'react-router-dom';
import Capsule from '../../components/ui/Capsule';
import HeartFilledIcon from '../../components/ui/icon/HeartFilledIcon';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useState } from 'react';
import GrayBackground from '../../components/ui/global-style/GrayBackground';

const MyScholarshipsFavorite = () => {
  const [scholarshipList, setScholarshipList] = useState<
    {
      scholarshipId: number;
      scholarShipImage: string;
      scholarshipName: string;
      scholarshipFoundation: string;
      scholarshipStatus: string;
      applicationPeriod: string;
      remainingDays: number;
      applyPossible: string;
      startDate: string;
      endDate: string;
      status: 'PASS' | 'FAIL' | 'NONE';
    }[]
  >([]);

  useQuery({
    queryKey: ['announcements', 'likes'],
    queryFn: async () => {
      const res = await axios.get('/announcements/likes');
      setScholarshipList(res.data.data.announcementResponseList);
      return res.data;
    },
  });

  return (
    <main className="p-4 pb-16">
      <GrayBackground />
      <ul className="mx-auto grid max-w-screen-lg grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scholarshipList.map((scholarship) => (
          <li key={scholarship.scholarshipId}>
            <Link
              to={`/scholarships/${scholarship.scholarshipId}`}
              className="flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-4 pb-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Capsule size="sm">D-12</Capsule>
                  <Capsule
                    size="sm"
                    variant={
                      scholarship.applyPossible === '판단불가'
                        ? 'stroke-default'
                        : scholarship.applyPossible === '지원불가'
                          ? 'stroke-danger'
                          : 'stroke-success'
                    }
                  >
                    {scholarship.applyPossible}
                  </Capsule>
                </div>
                <div>
                  <span className="text-[1.5rem] text-primary">
                    <HeartFilledIcon />
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={scholarship.scholarShipImage}
                    alt={scholarship.scholarshipName}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-md-300 text-gray-70">
                    {scholarship.scholarshipName}
                  </h3>
                  <div className="text-md-200 text-gray-40">
                    {scholarship.scholarshipFoundation}
                  </div>
                  <div className="caption-200 text-gray-30">
                    {scholarship.applicationPeriod}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MyScholarshipsFavorite;
