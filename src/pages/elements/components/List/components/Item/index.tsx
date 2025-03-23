import { Element, setElementModal } from '@shared/models/elements';
import { FC } from 'react';
import frame from '../../images/frame.svg';
import styles from './styles.module.css';

import { ElementCard, InfoContent } from '../../components';
import { Flex } from '@shared/components/Flex';
import { spacing } from '@shared/mixins/MixSpacing';
import { useUserStore } from '@shared/models/user';

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

  const cover = `${import.meta.env.VITE_APP_HOST}/elements/${element.name_eng}.webp`;
  return (
    <div onClick={clickHandle} className={styles.item}>
      <img src={frame} alt="element-frame" />
      <div className={styles.content}>
        <Flex align="center" justify="center" className={spacing({ mb: '2x' })} fullWidth>
          <p className={styles.counter}>{userElementCount}</p>
        </Flex>
        <ElementCard src={cover} name={element.name_rus} isNew />
        <Flex align="stretch" justify="space-between" fullWidth noWrap>
          <InfoContent title="Прибыль в час">
            <p>@</p>
            <p>123.12</p>
          </InfoContent>
          <div className={styles.divider} />
          <InfoContent title="Категория">
            <p>@</p>
            <p>{element.name_rus}</p>
          </InfoContent>
        </Flex>
      </div>
    </div>
  );
};

export default Item;
