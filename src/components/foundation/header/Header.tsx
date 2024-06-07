import { Link, useNavigate } from 'react-router-dom';

import ChevronLeftIcon from '../../ui/icon/ChevronLeftIcon';
import ChevronRightIcon from '../../ui/icon/ChevronRightIcon';

const Header = () => {
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
          <img
            src="/images/placeholders/mirae-asset.png"
            alt="미래에셋재단 이미지"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg-300 text-gray-70">미래에셋박현주재단</h1>
          <Link to="#" className="flex items-center gap-1 text-gray-40">
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
