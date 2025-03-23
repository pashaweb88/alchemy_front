import { FC, ReactNode } from 'react';
import styles from './styles.module.css';
interface ScrollProps {
  children?: ReactNode;
}

export const Scroll: FC<ScrollProps> = ({ children }) => {
  return <div className={styles.scroll}>{children}</div>;
};

export default Scroll;
