import { FC } from 'react';
import { Layout } from '@shared/components/Layout';
import { Flex } from '@shared/components/Flex';

import styles from './styles.module.css';
import { InventoryModal, PixiCanvas, NewElementModal } from './components';

import { Element, useElementsStore } from '@shared/models/elements';
import { game } from '@shared/game';
import { useGameStore } from '@shared/game/model';

export const Create: FC = () => {
  const { isInventoryOpen, closeInventoryHandle, boardElements, addBoardElement } = useGameStore();
  const { elements } = useElementsStore();
  console.log(elements);

  const onElementChooseHandle = (element: Element) => {
    const boardEelementCount = boardElements?.[element.name_eng] || 0;
    if (boardEelementCount + 1 <= element.count) {
      addBoardElement(element.name_eng);
      game.addItem(element);
    }
  };

  return (
    <Layout hideBackground>
      <Flex className={styles.wrapper} direction="column" fullWidth>
        <Flex className={styles.field} fullWidth>
          {/*<DndProvider backend={HTML5Backend}>*/}
          {/*  <Board ref={ref} />*/}
          {/*</DndProvider>*/}
          <PixiCanvas />
        </Flex>
        {/*<BottomNavigation onMenuClick={navigationHandle} />*/}
      </Flex>

      <InventoryModal
        open={isInventoryOpen}
        onElementAddHandle={onElementChooseHandle}
        onClose={closeInventoryHandle}
      />
      <NewElementModal />
    </Layout>
  );
};

export default Create;
