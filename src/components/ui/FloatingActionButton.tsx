import Capsule from './Capsule';

interface FloatingActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const FloatingActionButton = ({
  href,
  icon,
  label,
}: FloatingActionButtonProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 z-30 -translate-x-1/2">
      <Capsule
        href={href}
        size="lg"
        variant="primary"
        className="flex items-center gap-1 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.10)]"
      >
        <span className="text-[1.5rem]">{icon}</span>
        <span className="title-sm-300">{label}</span>
      </Capsule>
    </div>
  );
};

export default FloatingActionButton;
