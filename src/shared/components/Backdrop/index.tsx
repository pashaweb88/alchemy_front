import { FC, ReactNode } from 'react';
import styles from './styles.module.css';
import frame from './images/frame.png';
import clsx from 'clsx';
import CloseIcon from '@shared/Icons/components/Close';

interface BackdropProps {
  children?: ReactNode;
  open?: boolean;
  widthPercent?: number;
  disableGutter?: boolean;
  onClose?: () => void;
  width?: number;
}

export const Backdrop: FC<BackdropProps> = ({
  children,
  open = false,
  widthPercent = 80,
  width,
  disableGutter = false,
  onClose
}) => {
  if (!open) {
    return null;
  }
  const w = width ? `${width}px` : `${widthPercent}%`;
  return (
    <div className={styles.backdrop}>
      <div className={clsx(styles.wrapper, disableGutter && styles['_no-gutter'])}>
        <div style={{ width: w }} className={styles.frame}>
          <img src={frame} alt="frame" />
          <div className={styles.close} onClick={onClose}>
            <CloseIcon size={35} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Backdrop;
