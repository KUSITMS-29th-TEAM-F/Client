import clsx from 'clsx';

interface PopUpProps {
  confirmButton: {
    label: string;
  };
  cancelButton: {
    label: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const PopUp = ({
  confirmButton,
  cancelButton,
  onConfirm,
  onCancel,
  children,
}: PopUpProps) => {
  const popUpButtonList: {
    label: string;
    style: 'default' | 'danger';
    onClick?: () => void;
  }[] = [
    {
      label: cancelButton.label,
      style: 'default',
      onClick: onCancel,
    },
    {
      label: confirmButton.label,
      style: 'danger',
      onClick: onConfirm,
    },
  ];

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-full cursor-pointer items-center justify-center bg-black bg-opacity-50"
      onClick={onCancel}
    >
      <div
        className="mx-6 w-[22rem] cursor-auto rounded-2xl border border-gray-15 bg-gray-00"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <p className="text-pop-up px-6 py-9 text-center text-gray-60">
          {children}
        </p>
        <div className="flex border-t border-gray-15">
          {popUpButtonList.map((popUpButton, index) => (
            <button
              key={index}
              className={clsx(
                'text-lg-200 flex-1 border-r border-gray-15 py-4 last:border-r-0',
                {
                  'text-gray-40': popUpButton.style === 'default',
                  'text-danger-40': popUpButton.style === 'danger',
                },
              )}
              onClick={popUpButton.onClick}
            >
              {popUpButton.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
