import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './styles.module.css';

type ButtonProps = {
  children?: ReactNode;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = props => {
  const { children, loading = false, onClick } = props;

  const clickHandle = (e: any) => {
    return !loading && onClick?.(e);
  };

  return (
    <button {...props} className={styles.button} onClick={clickHandle}>
      {loading ? (
        <div className={styles.buttonContent}>...</div>
      ) : (
        <div className={styles.buttonContent}>{children}</div>
      )}
    </button>
  );
};

export default Button;
