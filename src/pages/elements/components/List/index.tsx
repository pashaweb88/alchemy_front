import { FC } from 'react';
import { useElementsStore } from '@shared/models/elements';
import { Flex } from '@shared/components/Flex';

import { Item } from './components';

export const List: FC = () => {
  const { elements } = useElementsStore();

  return (
    <div>
      {Object.entries(elements).map(([level, data], index) => {
        return (
          <div key={index}>
            <p>Elements level {level}</p>
            <Flex justify="space-between">
              {new Array(data.totalElements).fill(false).map((_, index) => {
                const element = data.openedElements[index];
                if (!element) {
                  return <p>?</p>;
                }
                return <Item element={element} key={index} />;
              })}
            </Flex>
          </div>
        );
      })}

      <p>asd</p>
    </div>
  );
};

export default List;
