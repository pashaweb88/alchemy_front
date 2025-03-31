import { CSSProperties, FC, ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

interface TypographyProps {
  children?: ReactNode;
  color?: 'primary' | 'secondary';
  size?: number;
  weight?: number;
  align?: 'left' | 'center' | 'right';
  styles?: CSSProperties;
  className?: string;
}

export const Typography: FC<TypographyProps> = ({
  children,
  color = 'primary',
  size = 10,
  weight = 400,
  align = 'left',
  styles: cssStyles,
  className
}) => {
  return (
    <p
      className={clsx(styles.base, styles[`_${color}`], className)}
      style={{ fontSize: `${size}px`, fontWeight: weight, textAlign: align, ...cssStyles }}
    >
      {children}
    </p>
  );
};

export default Typography;
