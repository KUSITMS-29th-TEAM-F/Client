import type { SVGProps } from 'react';

const ArrowBarToUpIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth || 2}
        d="M12 10v10m0-10l4 4m-4-4l-4 4M4 4h16"
      ></path>
    </svg>
  );
};

export default ArrowBarToUpIcon;
