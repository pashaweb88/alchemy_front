import { FC } from 'react';
import { Flex } from '@shared/components/Flex';
import searchImage from '../../images/search.png';
import filterImage from '../../images/filter.png';
import styles from './styles.module.css';

export const Filter: FC = () => {
  return (
    <Flex justify="space-between" align="center">
      <div className={styles.form}>
        <img src={searchImage} alt="search" />
        <input className={styles.input} />
      </div>
      <div className={styles.filter}>
        <img src={filterImage} alt="filter" />
      </div>
    </Flex>
  );
};

export default Filter;
