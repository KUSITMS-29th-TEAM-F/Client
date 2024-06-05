import { Link } from 'react-router-dom';

import { ScholarshipType } from '../date/ScholarshipsSection';

interface ScholarshipItemProps {
  scholarship: ScholarshipType;
}

const ScholarshipItem = ({ scholarship }: ScholarshipItemProps) => {
  return (
    <li key={scholarship.applyId}>
      <Link
        to={`/my-scholarships/${scholarship.applyId}`}
        className="flex items-center gap-4 rounded-2xl border border-gray-10 bg-gray-00 p-4 pb-3"
      >
        <div className="overflow-hidden rounded-lg">
          <img
            src={scholarship.announcementImageUrl}
            alt={scholarship.scholarShipName}
            width={64}
            height={64}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-md-300 text-gray-70">
            {scholarship.scholarShipName}
          </h3>
          <div className="text-md-200 text-gray-40">
            {scholarship.scholarShipFoundation}
          </div>
          <div className="caption-200 text-gray-30">
            {scholarship.applicationPeriod}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ScholarshipItem;
