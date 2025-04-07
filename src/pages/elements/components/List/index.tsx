import { memo, useState } from 'react';
import { useElementsStore } from '@shared/models/elements';
import { Flex } from '@shared/components/Flex';

import { Item } from './components';
import { Typography } from '@shared/components/Typography';
import clsx from 'clsx';
import { spacing } from '@shared/mixins/MixSpacing';
import styles from './styles.module.css';
import { ArrowDownIcon } from '@shared/components/ArrowDownIcon';
import { ArrowUpIcon } from '@shared/components/ArrowUpIcon';

export const List = memo(() => {
  const { elements } = useElementsStore();
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const toggle = (level: string) => {
    if (collapsed.includes(level)) {
      setCollapsed(collapsed.filter(el => el !== level));
    } else {
      setCollapsed([...collapsed, level]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {Object.entries(elements).map(([level, data], index) => {
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
            {/*<Flex justify="space-between">*/}
            {/*  {new Array(data.totalElements).fill(false).map((_, index) => {*/}
            {/*    const element = data.openedElements[index];*/}
            {/*    if (!element) {*/}
            {/*      return <p>?</p>;*/}
            {/*    }*/}
            {/*    return <Item element={element} key={index} />;*/}
            {/*  })}*/}
            {/*</Flex>*/}
            {collapsed.includes(level) ? null : (
              <Flex gap="xs" className={styles.grid} fullWidth>
                {data.openedElements?.map(element =>
                  element ? <Item element={element} key={index} /> : null
                )}
              </Flex>
            )}
          </div>
        );
      })}
    </div>
  );
});

List.displayName = 'ElementList';

export default List;
