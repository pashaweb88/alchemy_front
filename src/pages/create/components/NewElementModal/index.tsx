import { FC } from 'react';
import Backdrop from '@shared/components/Backdrop';
import { useGameStore } from '../../model';
import { Flex } from '@shared/components/Flex';
import { getCoverUrl } from '@shared/utils/get-cover-url';
import { Card, InfoContent } from './components';
import { formatNumber } from '@shared/utils/format-sum-to-k';
import { spacing } from '@shared/mixins/MixSpacing';
import { Button } from '@shared/components/Button';
import { useClaimElement } from '../../hooks';
import { enqueueSnackbar } from 'notistack';
import { useResetUserInfo } from '@shared/hooks/useResetUserInfo';

export const NewElementModal: FC = () => {
  const { newElement, setNewElement } = useGameStore();
  const { fetchUserData } = useResetUserInfo();

  const cover = getCoverUrl(newElement?.name_eng);
  const { mutate, isPending } = useClaimElement({
    onSuccess: () => {
      fetchUserData();
      setNewElement(null);
      enqueueSnackbar({ message: 'Новый элемент добавлен в иныентарь', variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar({ message: 'Ошибка', variant: 'error' });
    }
  });
  const submitHandle = () => {
    mutate({ name: newElement?.name_eng || '', count: 1 });
  };
  const closeHandle = () => setNewElement(null);

  return (
    <Backdrop open={Boolean(newElement)} widthPercent={70} onClose={closeHandle}>
      <Flex
        direction="column"
        gap="2xl"
        align="center"
        justify="space-between"
        fullWidth
        className={spacing({ pb: '1x' })}
        style={{ height: '100%' }}
      >
        {newElement && <Card src={cover} element={newElement} isNew />}
        <Flex direction="column" fullWidth>
          <Flex
            style={{ borderBottom: '1px solid #aaaaaa' }}
            className={spacing({ pb: '4x' })}
            noWrap
            fullWidth
          >
            <InfoContent title="Уровень">
              <p>{newElement?.level}</p>
            </InfoContent>
            <InfoContent title="Прибыль в час">
              <p>{formatNumber(newElement?.income_hour)}</p>
            </InfoContent>
            <InfoContent title="Категория">
              <p>{newElement?.category}</p>
            </InfoContent>
          </Flex>
          <Flex className={spacing({ pt: '4x' })} noWrap fullWidth>
            <InfoContent title="Кол-во">
              <p>1</p>
            </InfoContent>
            <InfoContent title="Стоимость">
              <p>{formatNumber(newElement?.price)}</p>
            </InfoContent>
            <InfoContent title="Комбинации">
              <p>?</p>
            </InfoContent>
          </Flex>
        </Flex>
        <Button loading={isPending} onClick={submitHandle}>
          Большой успех!
        </Button>
      </Flex>
    </Backdrop>
  );
};

export default NewElementModal;
