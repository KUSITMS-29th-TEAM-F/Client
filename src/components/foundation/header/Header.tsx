import { Link, useNavigate } from 'react-router-dom';

import ChevronLeftIcon from '../../ui/icon/ChevronLeftIcon';
import ChevronRightIcon from '../../ui/icon/ChevronRightIcon';
import { ScholarshipType } from '../../../pages/scholarship/ScholarshipDetail';

interface HeaderProps {
  scholarship: ScholarshipType;
}

const Header = ({ scholarship }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <header>
      <div className="py-3">
        <Link
          to="#"
          className="text-[1.5rem] text-gray-60"
          onClick={handleBackButtonClick}
        >
          <ChevronLeftIcon />
        </Link>
      </div>
      <div className="flex items-center gap-3 pb-4 pt-2">
        <div className="aspect-square w-[4.125rem] overflow-hidden rounded-lg">
          {scholarship.scholarShipImage && (
            <img
              src={scholarship.scholarShipImage}
              alt={scholarship.scholarshipName}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg-300 text-gray-70">
            {scholarship.scholarshipFoundation}
          </h1>
          <Link
            to={scholarship.applyLink}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1 text-gray-40"
          >
            <span className="text-md-200">재단 홈페이지</span>
            <span>
              <ChevronRightIcon />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
