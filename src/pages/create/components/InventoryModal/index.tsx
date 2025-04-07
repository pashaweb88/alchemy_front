import { ChangeEvent, FC, useState } from 'react';
import { Backdrop } from '@shared/components/Backdrop';
import { useElementsStore } from '@shared/models/elements';
import { Flex } from '@shared/components/Flex';
import { InventoryItem, SearchIcon } from '..';
import { Element } from '@shared/models/elements';
import { Scroll } from '@shared/components/Scroll';
import { Typography } from '@shared/components/Typography';
import { spacing } from '@shared/mixins/MixSpacing';

import { CoinText } from '@shared/components/CoinText';
import { useUserStore } from '@shared/models/user';
import { formatNumber } from '@shared/utils/format-sum-to-k';

import clsx from 'clsx';
import styles from './styles.module.css';
import { ArrowDownIcon } from '@shared/components/ArrowDownIcon';
import { ArrowUpIcon } from '@shared/components/ArrowUpIcon';

interface InventoryModalProps {
  open?: boolean;
  onElementAddHandle?: (element: Element) => void;
  onClose?: () => void;
}

export const InventoryModal: FC<InventoryModalProps> = ({
  open = false,
  onElementAddHandle,
  onClose
}) => {
  const { elements } = useElementsStore();
  const { user } = useUserStore();

  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filteredElements = {
    ...elements,
    '1': {
      totalElements: elements?.['1']?.totalElements,
      openedElements: elements?.['1']?.openedElements.filter(
        el => el?.name_eng.includes(search) || el?.name_rus.includes(search)
      )
    },
    '2': {
      totalElements: elements?.['2']?.totalElements,
      openedElements: elements?.['2']?.openedElements.filter(
        el => el?.name_eng.includes(search) || el?.name_rus.includes(search)
      )
    },
    '3': {
      totalElements: elements?.['3']?.totalElements,
      openedElements: elements?.['3']?.openedElements.filter(
        el => el?.name_eng.includes(search) || el?.name_rus.includes(search)
      )
    }
  };

  const toggle = (level: string) => {
    if (collapsed.includes(level)) {
      setCollapsed(collapsed.filter(el => el !== level));
    } else {
      setCollapsed([...collapsed, level]);
    }
  };

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Backdrop open={open} widthPercent={90} onClose={onClose}>
      <Scroll>
        <Flex className={spacing({ pt: '5x', mb: '4x' })} justify="center" fullWidth>
          <CoinText coinSize={50} offsetY={5}>
            <Typography weight={600} size={32}>
              {formatNumber(user?.balance || '0')}
            </Typography>
          </CoinText>
        </Flex>
        <div className={clsx(styles['input-container'], spacing({ mb: '3x' }))}>
          <div className={styles['search-icon']}>
            <SearchIcon />
          </div>
          <input value={search} onChange={changeHandle} className={styles['gradient-input']} />
        </div>
        {Object.entries(filteredElements).map(([level, data], index) => {
          return (
            <div key={index}>
              <Flex
                className={clsx(spacing({ pt: '4x', mb: '2x' }), styles.title)}
                justify="space-between"
                onClick={() => toggle(level)}
                fullWidth
              >
                <Typography size={16}> Элементы {level} уровня</Typography>
                <Flex gap="s">
                  <Typography size={16}>
                    {data.openedElements?.length || 0} / {data.totalElements || 0}
                  </Typography>
                  {collapsed.includes(level) ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </Flex>
              </Flex>
              {collapsed.includes(level) ? null : (
                <div className={styles.grid}>
                  {/*{new Array(data.totalElements).fill(false).map((_, index) => {*/}
                  {/*  const element = data.openedElements[index];*/}
                  {/*  if (!element) {*/}
                  {/*    return <InventoryItem key={index} />;*/}
                  {/*  }*/}
                  {/*  return (*/}
                  {/*    <InventoryItem*/}
                  {/*      element={element}*/}
                  {/*      key={index}*/}
                  {/*      onDoubleClick={() => onElementAddHandle?.(element)}*/}
                  {/*    />*/}
                  {/*  );*/}
                  {/*})}*/}
                  {data?.openedElements?.map(element =>
                    element ? (
                      <InventoryItem
                        element={element}
                        key={index}
                        onDoubleClick={() => onElementAddHandle?.(element)}
                      />
                    ) : null
                  )}
                </div>
              )}
            </div>
          );
        })}
      </Scroll>
    </Backdrop>
  );
};

export default InventoryModal;
