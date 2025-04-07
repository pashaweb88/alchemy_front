import { CSSProperties, FC } from 'react';

interface FrameIconProps {
  styles?: CSSProperties;
}

export const FrameIcon: FC<FrameIconProps> = ({ styles }) => {
  return (
    <svg
      width="304"
      height="65"
      viewBox="0 0 304 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1H295C295 5.41828 298.582 9 303 9V56C298.582 56 295 59.5817 295 64H9C9 59.5817 5.41828 56 1 56V9C5.41828 9 9 5.41828 9 1Z"
        fill="#0E0923"
      />
      <path
        d="M295 1H295.5V0.5H295V1ZM9 1V0.5H8.5V1H9ZM303 9H303.5V8.5H303V9ZM303 56V56.5H303.5V56H303ZM295 64V64.5H295.5V64H295ZM9 64H8.5V64.5H9V64ZM1 56H0.5V56.5H1V56ZM1 9V8.5H0.5V9H1ZM295 0.5H9V1.5H295V0.5ZM303 8.5C298.858 8.5 295.5 5.14214 295.5 1H294.5C294.5 5.69442 298.306 9.5 303 9.5V8.5ZM303.5 56V9H302.5V56H303.5ZM295.5 64C295.5 59.8579 298.858 56.5 303 56.5V55.5C298.306 55.5 294.5 59.3056 294.5 64H295.5ZM9 64.5H295V63.5H9V64.5ZM1 56.5C5.14214 56.5 8.5 59.8579 8.5 64H9.5C9.5 59.3056 5.69442 55.5 1 55.5V56.5ZM0.5 9V56H1.5V9H0.5ZM8.5 1C8.5 5.14214 5.14214 8.5 1 8.5V9.5C5.69442 9.5 9.5 5.69442 9.5 1H8.5Z"
        fill="#EBD09B"
      />
    </svg>
  );
};

export default FrameIcon;
