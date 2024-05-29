import Link from 'next/link';

import NavBarHide from './global-style/NavBarHide';
import XIcon from './icon/XIcon';
import { useRouter } from 'next/navigation';

interface DialogHeaderProps {
  title: string;
  closeOnClick?: () => void;
  confirmButton?: {
    onClick?: () => void;
  };
}

const DialogHeader = ({
  title,
  closeOnClick,
  confirmButton,
}: DialogHeaderProps) => {
  const router = useRouter();

  const handleCloseButtonClick = () => {
    if (closeOnClick) {
      closeOnClick();
    } else {
      router.back();
    }
  };

  return (
    <>
      <NavBarHide />
      <div>
        <header className="fixed top-0 z-50 w-full bg-white px-4 py-4">
          <div className="mx-auto grid max-w-screen-md grid-cols-3">
            <button
              className="text-left text-[1.25rem]"
              onClick={handleCloseButtonClick}
            >
              <XIcon />
            </button>
            <h1 className="title-sm-200 text-center text-gray-90">{title}</h1>
            <div className="text-right">
              <button
                className="title-sm-300 text-primary"
                onClick={confirmButton?.onClick}
              >
                저장
              </button>
            </div>
          </div>
        </header>
        <div className="h-[56px]" />
      </div>
    </>
  );
};

export default DialogHeader;
