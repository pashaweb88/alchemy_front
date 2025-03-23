import { FC, ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

interface TypographyProps {
  children?: ReactNode;
  color?: 'primary' | 'secondary';
  size?: number;
  weight?: number;
}

export const Typography: FC<TypographyProps> = ({
  children,
  color = 'primary',
  size = 10,
  weight = 400
}) => {
  return (
    <p
      className={clsx(styles.base, styles[`_${color}`])}
      style={{ fontSize: `${size}px`, fontWeight: weight }}
    >
      {children}
    </p>
  );
};

export default Typography;
