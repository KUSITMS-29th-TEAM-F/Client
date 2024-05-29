import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

import ChevronLeftIcon from './icon/ChevronLeftIcon';

interface BackButtonProps {
  label?: string;
  backUrl?: string;
  onClick?: () => void;
}

const BackButton = ({ label, backUrl, onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    if (onClick) {
      onClick();
    }
    if (backUrl === '-1') {
      navigate(-1);
    }
  };

  return (
    <Link
      to={backUrl === undefined || backUrl === '-1' ? '#' : backUrl}
      className="flex items-center gap-1 text-gray-40"
      onClick={handleBackButtonClick}
    >
      <span
        className={clsx({
          'text-[1.25rem]': label !== undefined,
          'text-[1.5rem]': label === undefined,
        })}
      >
        <ChevronLeftIcon />
      </span>
      <span className="text-lg-200">{label}</span>
    </Link>
  );
};

export default BackButton;
