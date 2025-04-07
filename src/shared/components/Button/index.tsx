import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

type ButtonProps = {
  children?: ReactNode;
  loading?: boolean;
  variant?: 'default' | 'rahmon';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = props => {
  const { children, loading = false, onClick, variant = 'default' } = props;

  const clickHandle = (e: any) => {
    return !loading && onClick?.(e);
  };

  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        variant === 'rahmon' && styles['_rahmon'],
      )}
      onClick={clickHandle}
    >
      {loading ? (
        <div className={styles.buttonContent}>...</div>
      ) : (
        <div className={styles.buttonContent}>{children}</div>
      )}
    </button>
  );
};

export default Button;
