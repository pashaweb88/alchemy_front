import { Element, setElementModal } from '@shared/models/elements';
import { FC } from 'react';
import frame from '../../images/frame.svg';
import styles from './styles.module.css';

import { ElementCard, InfoContent } from '../../components';
import { Flex } from '@shared/components/Flex';
import { spacing } from '@shared/mixins/MixSpacing';
import { useUserStore } from '@shared/models/user';
import { getCoverUrl } from '@shared/utils/get-cover-url';
import { Typography } from '@shared/components/Typography';
import { formatNumber } from '@shared/utils/format-sum-to-k';

interface ItemProps {
  element: Element;
}
export const Item: FC<ItemProps> = ({ element }) => {
  const { user } = useUserStore();

  const userElementCount =
    (user?.userElements || []).find(el => el.name === element.name_eng)?.count || 0;

  const clickHandle = () => {
    setElementModal(element);
  };

  const cover = getCoverUrl(element.name_eng);
  return (
    <div onClick={clickHandle} className={styles.item}>
      <img src={frame} alt="element-frame" />
      <div className={styles.content}>
        <Flex align="center" justify="center" className={spacing({ mb: '05x' })} fullWidth>
          <p className={styles.counter}>{userElementCount}</p>
        </Flex>

        <ElementCard src={cover} name={element.name_rus} isNew />

        <Flex
          className={spacing({ py: '05x' })}
          align="stretch"
          gap="s"
          justify="space-between"
          fullWidth
          noWrap
        >
          <InfoContent justify="end" title="Прибыль в час">
            <Typography>{formatNumber(element.income_hour)}</Typography>
          </InfoContent>
          <div className={styles.divider} />
          <InfoContent justify="start" title="Категория">
            <Typography>{element.name_rus}</Typography>
          </InfoContent>
        </Flex>
      </div>
    </div>
  );
};

export default Item;
