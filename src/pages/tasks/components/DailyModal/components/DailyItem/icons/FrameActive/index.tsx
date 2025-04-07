import { CSSProperties, FC } from 'react';

interface FrameActiveIconProps {
  styles?: CSSProperties;
}

export const FrameActiveIcon: FC<FrameActiveIconProps> = ({ styles }) => {
  return (
    <svg
      width="78"
      height="53"
      viewBox="0 0 78 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1H69C69 5.41828 72.5817 9 77 9V44C72.5817 44 69 47.5817 69 52H9C9 47.5817 5.41828 44 1 44V9C5.41828 9 9 5.41828 9 1Z"
        fill="#EBD09B"
      />
      <path
        d="M69 1H69.5V0.5H69V1ZM9 1V0.5H8.5V1H9ZM77 9H77.5V8.5H77V9ZM77 44V44.5H77.5V44H77ZM69 52V52.5H69.5V52H69ZM9 52H8.5V52.5H9V52ZM1 44H0.5V44.5H1V44ZM1 9V8.5H0.5V9H1ZM69 0.5H9V1.5H69V0.5ZM77 8.5C72.8579 8.5 69.5 5.14214 69.5 1H68.5C68.5 5.69442 72.3056 9.5 77 9.5V8.5ZM77.5 44V9H76.5V44H77.5ZM69.5 52C69.5 47.8579 72.8579 44.5 77 44.5V43.5C72.3056 43.5 68.5 47.3056 68.5 52H69.5ZM9 52.5H69V51.5H9V52.5ZM1 44.5C5.14214 44.5 8.5 47.8579 8.5 52H9.5C9.5 47.3056 5.69442 43.5 1 43.5V44.5ZM0.5 9V44H1.5V9H0.5ZM8.5 1C8.5 5.14214 5.14214 8.5 1 8.5V9.5C5.69442 9.5 9.5 5.69442 9.5 1H8.5Z"
        fill="#EBD09B"
      />
    </svg>
  );
};

export default FrameActiveIcon;
