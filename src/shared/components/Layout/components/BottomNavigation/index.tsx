import { FC } from 'react';
import styles from './styles.module.css';
import frame from '../../images/frame.png';
import active from '../../images/active.png';
import { PotionIcon, TasksIcon, FeatsIcon, HomeIcon, ElementsIcon } from '@shared/Icons';
import {
  ROUTE_ELEMENTS,
  ROUTE_MAIN,
  ROUTE_TASKS,
  ROUTE_POTION,
  ROUTE_FEATS
} from '@shared/constants/routes';
import { useLocation, useNavigate } from 'react-router';
import clsx from 'clsx';

export const BottomNavigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      title: 'Main',
      Icon: HomeIcon,
      route: ROUTE_MAIN
    },
    {
      title: 'Elements',
      Icon: ElementsIcon,
      route: ROUTE_ELEMENTS
    },
    {
      title: 'Create',
      Icon: PotionIcon,
      route: ROUTE_POTION
    },
    {
      title: 'Tasks',
      Icon: TasksIcon,
      route: ROUTE_TASKS
    },
    {
      title: 'Feats',
      Icon: FeatsIcon,
      route: ROUTE_FEATS
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.relative}>
        <img src={frame} alt="frame" className={styles.blur} />
        <img src={frame} alt="frame" className={styles.frame} />

        <nav className={styles.nav}>
          {items.map(({ title, Icon, route }, i) => {
            const isActive = location.pathname === route;
            const color = isActive ? '#EAD0A5' : 'white';

            return (
              <div key={i} className={styles.item} onClick={() => navigate(route)}>
                <img
                  src={active}
                  className={clsx(styles.active, isActive && styles['_active'])}
                  alt="active-image"
                />
                <div className={styles.content}>
                  <Icon color={color} />
                  <p style={{ color }}>{title}</p>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default BottomNavigation;
