import { FC } from 'react';
import { useElementsStore } from '@shared/models/elements';
import { Flex } from '@shared/components/Flex';

import { Item } from './components';

export const List: FC = () => {
  const { elements } = useElementsStore();

  return (
    <div>
      {Object.entries(elements).map(([level, data], index) => (
        <div key={index}>
          <p>Elements level {level}</p>
          <Flex justify="space-between">
            {data.elements.map((el, index) => (
              <Item element={el} key={index} />
            ))}
          </Flex>
        </div>
      ))}
    </div>
  );
};

export default List;
