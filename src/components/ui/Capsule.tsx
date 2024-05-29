import clsx from 'clsx';
import Link from 'next/link';

interface CapsuleProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  as?: React.ElementType;
  className?: string;
  variant?:
    | 'default'
    | 'primary'
    | 'stroke-default'
    | 'stroke-primary'
    | 'stroke-success'
    | 'stroke-danger';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Capsule = ({
  href,
  children,
  variant = 'default',
  className,
  size,
  as: Wrapper = href ? Link : 'div',
  ...props
}: CapsuleProps) => {
  return (
    <Wrapper
      {...props}
      href={href}
      className={clsx(
        'rounded-full',
        className,
        {
          'border border-primary bg-primary text-gray-00':
            variant === 'primary',
          'border border-gray-05 bg-gray-05 text-gray-40':
            variant === 'default',
          'border border-primary bg-gray-00 text-primary':
            variant === 'stroke-primary',
          'border border-gray-15 bg-gray-00 text-gray-30':
            variant === 'stroke-default',
          'border border-success-20 bg-gray-00 text-success-50':
            variant === 'stroke-success',
          'border border-danger-50 bg-gray-00 text-danger-50':
            variant === 'stroke-danger',
        },
        {
          'title-sm-200 px-6 py-3': size === 'lg',
          'text-lg-200 px-4 py-2': size === 'md',
          'caption-300 px-3 py-1': size === 'sm',
        },
      )}
    >
      {children}
    </Wrapper>
  );
};

export default Capsule;
