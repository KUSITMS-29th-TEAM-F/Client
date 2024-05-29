import clsx from 'clsx';

interface PrivacySectionLayoutProps {
  isVisible?: boolean;
  children: React.ReactNode;
}

const PrivacySectionLayout = ({
  isVisible = true,
  children,
}: PrivacySectionLayoutProps) => {
  return (
    <div
      className={clsx('flex flex-col gap-10', {
        hidden: !isVisible,
      })}
    >
      {children}
    </div>
  );
};

export default PrivacySectionLayout;
