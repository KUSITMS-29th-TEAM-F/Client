import clsx from 'clsx';

export interface StatusProps {
  children: React.ReactNode;
  variant: 'default' | 'primary' | 'success' | 'danger' | 'stroke-default';
}

const Status = ({ children, variant }: StatusProps) => {
  return (
    <span
      className={clsx('rounded-full px-2 py-0.5 text-[0.6875rem] font-medium', {
        'bg-gray-00 text-gray-40': variant === 'default',
        'bg-primary-00 text-primary-80': variant === 'primary',
        'bg-success-01 text-success-60': variant === 'success',
        'bg-danger-00 text-danger-50': variant === 'danger',
        'border border-gray-10 bg-gray-00 text-gray-40':
          variant === 'stroke-default',
      })}
    >
      {children}
    </span>
  );
};

export default Status;
