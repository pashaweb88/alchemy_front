import { FC, ReactNode, useMemo } from 'react';
import styles from './styles.module.css';
import blue from '@assets/images/magics/page-magic-blue.png';
import purple from '@assets/images/magics/page-magic-purple.png';
import green from '@assets/images/magics/page-magic-green.png';

interface PageHeaderProps {
  children?: ReactNode;
  color?: 'green' | 'purple' | 'blue';
}

export const PageHeader: FC<PageHeaderProps> = ({ children, color = 'blue' }) => {
  const src = useMemo(() => {
    switch (color) {
      case 'green':
        return green;
      case 'purple':
        return purple;
      case 'blue':
        return blue;
      default:
        return blue;
    }
  }, []);

  return (
    <div className={styles.header}>
      <img src={src} alt="header-background" />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageHeader;
