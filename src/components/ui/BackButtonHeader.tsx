import clsx from 'clsx';

import BackButton from './BackButton';

interface BackButtonProps {
  as?: React.ElementType;
  backButton: {
    label?: string;
    backUrl?: string;
    onClick?: () => void;
  };
  confirmButton?: {
    label: string;
    onClick?: () => void;
  };
  fixed?: boolean;
  padding?: boolean;
  relative?: 'lg' | 'md';
  className?: string;
}

const BackButtonHeader = ({
  as: Wrapper = 'div',
  backButton,
  confirmButton,
  fixed = false,
  padding = true,
  relative = 'lg',
  className,
}: BackButtonProps) => {
  return (
    <Wrapper className={className}>
      <div
        className={clsx('flex w-full justify-center bg-gray-00', {
          'fixed z-10': fixed,
        })}
      >
        <div
          className={clsx(
            'flex h-[3rem] w-full items-center justify-between',
            {
              'max-w-screen-lg': relative === 'lg',
              'max-w-screen-md': relative === 'md',
            },
            {
              'pb-4 pt-3': padding,
            },
          )}
        >
          <BackButton {...backButton} />
          {confirmButton && (
            <button
              className="title-sm-300 text-primary"
              onClick={confirmButton.onClick}
            >
              {confirmButton.label}
            </button>
          )}
        </div>
      </div>
      {fixed && <div className="h-[3rem]" />}
    </Wrapper>
  );
};

export default BackButtonHeader;
