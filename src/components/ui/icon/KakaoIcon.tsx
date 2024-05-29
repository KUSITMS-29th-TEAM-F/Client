import { SVGProps } from 'react';

const KakaoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6561 0C4.76923 0 -0.00424194 3.70743 -0.00424194 8.27362C-0.00424194 11.1164 1.84355 13.6216 4.65078 15.114L3.46629 19.4551C3.35969 19.8401 3.79795 20.1481 4.13553 19.923L9.31764 16.4821C9.7559 16.5235 10.2001 16.5472 10.6502 16.5472C16.5371 16.5472 21.3105 12.8398 21.3105 8.27362C21.3105 3.70743 16.543 0 10.6561 0Z"
        fill="current-color"
      />
    </svg>
  );
};

export default KakaoIcon;
