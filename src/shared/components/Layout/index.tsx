import { FC, ReactNode } from 'react';
import styles from './styles.module.css';
import bg from '@assets/images/alchemy-bcg.png';
import { BottomNavigation } from './components';

interface LayoutProps {
  children?: ReactNode;
  hideBackground?: boolean;
}

export const Layout: FC<LayoutProps> = ({ children, hideBackground }) => {
  return (
    <div className={styles.base}>
      {!hideBackground && (
        <div className={styles.background}>
          <img src={bg} alt="background" />
        </div>
      )}

      <div className={styles.content}>{children}</div>

      <BottomNavigation />
    </div>
  );
};

export default Layout;
