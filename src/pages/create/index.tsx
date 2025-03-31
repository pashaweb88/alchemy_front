import { FC, useEffect } from 'react';
import { Layout } from '@shared/components/Layout';
import { Flex } from '@shared/components/Flex';

import styles from './styles.module.css';
import { InventoryModal, PixiCanvas, NewElementModal, TutorModal } from './components';

import { Element } from '@shared/models/elements';
import { game } from '@shared/game';
import { useGameStore } from './model';
import {
  MESSAGE_KEY_ADD_ITEM,
  MESSAGE_KEY_ADD_ITEM_LIMIT,
  MESSAGE_KEY_SELL_ITEM_FAIL,
  MESSAGE_KEY_SELL_ITEM,
  MESSAGE_KEY_OPEN_TUTOR,
  MESSAGE_KEY_OPEN_INVENTORY,
  MESSAGE_KEY_NEW_ELEMENT
} from '@shared/game/constants';
import { useSnackbar } from 'notistack';
import useResetUserInfo from '@shared/hooks/useResetUserInfo';
import Typography from '@shared/components/Typography';
import { spacing } from '@shared/mixins/MixSpacing';

export const Create: FC = () => {
  const {
    isInventoryOpen,
    isTutorOpen,
    closeInventoryHandle,
    closeTutorHandle,
    openTutorHandle,
    openInventoryHandle,
    setNewElement
  } = useGameStore();
  const { fetchUserData } = useResetUserInfo();
  // const { elements } = useElementsStore();
  const { enqueueSnackbar } = useSnackbar();

  const onElementChooseHandle = (element: Element) => {
    console.log(element);
    game.addItem(element, element.count);
  };

  const onMessage = (e: MessageEvent<{ key: string; val: any }>) => {
    const key = e.data.key;

    if (key === MESSAGE_KEY_ADD_ITEM) {
      return enqueueSnackbar({ message: 'Добавлено', variant: 'success' });
    }
    if (key === MESSAGE_KEY_ADD_ITEM_LIMIT) {
      return enqueueSnackbar({ message: 'Все элементы на поле', variant: 'error' });
    }
    if (key === MESSAGE_KEY_SELL_ITEM) {
      fetchUserData();
      return enqueueSnackbar({ message: 'Продано', variant: 'success' });
    }
    if (key === MESSAGE_KEY_OPEN_TUTOR) {
      return openTutorHandle();
    }
    if (key === MESSAGE_KEY_OPEN_INVENTORY) {
      return openInventoryHandle();
    }
    if (key === MESSAGE_KEY_NEW_ELEMENT) {
      return setNewElement(e.data.val);
    }
    if (key === MESSAGE_KEY_SELL_ITEM_FAIL) {
      return enqueueSnackbar({ message: 'Ошибка продажи', variant: 'error' });
    }
  };

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <Layout hideBackground>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          border: '2px solid blue',
          overflow: 'hidden'
        }}
      >
        <PixiCanvas />

      </div>
      {/*<Flex className={styles.wrapper} direction="column" fullWidth>*/}
      {/*  <div className={spacing({ pt: '2x' })}>*/}
      {/*    <Typography styles={{ width: '100%', fontWeight: 700 }} align="center" size={30}>*/}
      {/*      Создание*/}
      {/*    </Typography>*/}
      {/*  </div>*/}
      {/*  <Flex className={styles.field} fullWidth>*/}
      {/*    /!*<DndProvider backend={HTML5Backend}>*!/*/}
      {/*    /!*  <Board ref={ref} />*!/*/}
      {/*    /!*</DndProvider>*!/*/}
      {/*    <PixiCanvas />*/}
      {/*  </Flex>*/}
      {/*  /!*<BottomNavigation onMenuClick={navigationHandle} />*!/*/}
      {/*</Flex>*/}

      <InventoryModal
        open={isInventoryOpen}
        onElementAddHandle={onElementChooseHandle}
        onClose={closeInventoryHandle}
      />
      <NewElementModal />
      <TutorModal open={isTutorOpen} onClose={() => closeTutorHandle()} />
    </Layout>
  );
};

export default Create;
