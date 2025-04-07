import { FC, useMemo, useState } from 'react';
import frame from './images/frame.png';
import styles from './styles.module.css';
import { ElementCard } from '@pages/elements/components/ElementCard';
import { spacing } from '@shared/mixins/MixSpacing';
import { Flex } from '@shared/components/Flex';
import { InfoContent } from '@pages/elements/components/InfoContent';
import clsx from 'clsx';
import minusIcon from '@assets/icons/minus.svg';
import plusIcon from '@assets/icons/plus.svg';
import crossIcon from '@assets/icons/close.svg';
import { getElements, setElementModal, useElementsStore } from '@shared/models/elements';
import { formatNumber } from '@shared/utils/format-sum-to-k';
import { buyElement } from '@shared/api/buy-element';
import WebApp from '@twa-dev/sdk';
import { getUserData } from '@shared/models/user';
import { sellElementApi } from '@shared/api/sell-element';
import { useSnackbar } from 'notistack';
import { validateTelegramUser } from '@shared/utils/validate-telegram-user';
import { Typography } from '@shared/components/Typography';

type State = {
  buyCount: number;
};

export const ElementModal: FC = () => {
  const [{ buyCount }, set] = useState<State>({ buyCount: 1 });

  const dispatch = (payload: Partial<State>) => set(prev => ({ ...prev, ...payload }));

  const { currentElementModal } = useElementsStore();
  const { enqueueSnackbar } = useSnackbar();

  const cover = `${import.meta.env.VITE_APP_HOST}/elements/${currentElementModal?.name_eng}.webp`;
  const totalSumToBuy = Number(currentElementModal?.price) * buyCount;
  const [incomeHour] = useMemo(() => {
    const incomeHour = formatNumber(currentElementModal?.income_hour || '0');
    return [incomeHour];
  }, []);

  const decreaseHandle = () => {
    dispatch({ buyCount: buyCount - 1 });
  };

  const increaseHandle = () => {
    dispatch({ buyCount: buyCount + 1 });
  };

  const buyHandle = async () => {
    const tgUser = WebApp.initDataUnsafe.user;
    if (!tgUser?.id) {
      return console.log('No tg user');
    }

    const response = await buyElement({
      name: currentElementModal?.name_eng || '',
      count: buyCount
    });

    if (response.error) {
      return enqueueSnackbar({ message: response.error, variant: 'error' });
    }

    if (response.result?.success) {
      getUserData();
      getElements();
      setElementModal(undefined);
    }
  };

  const sellHandle = async () => {
    if (!validateTelegramUser()) return;

    if ((currentElementModal?.count || 0) < buyCount) {
      return enqueueSnackbar({ message: 'Недостаточно элементов', variant: 'error' });
    }
    const response = await sellElementApi({
      name: currentElementModal?.name_eng || '',
      count: buyCount
    });

    if (response.error) {
      return enqueueSnackbar({ message: response.error, variant: 'error' });
    }

    if (response.result) {
      getUserData();
      getElements();
      setElementModal(undefined);
    }
  };
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <img src={frame} alt="frame" />

        <div className={styles.close} onClick={() => setElementModal(undefined)}>
          <img src={crossIcon} alt="cross-button" />
        </div>
        <div className={styles.content}>
          <div className={spacing({ mb: '4x' })}>
            <ElementCard name={currentElementModal?.name_eng} src={cover} />
          </div>

          <div className={clsx(styles.explanation, spacing({ mb: '2x' }))}>? + ? = 'x';</div>

          <div className={spacing({ px: '2x', mb: '2x' })}>
            <Flex className={clsx(styles.divider, spacing({ py: '2x' }))} noWrap fullWidth>
              <InfoContent title="Уровень">
                <Typography size={16} weight={600}>
                  {currentElementModal?.level}
                </Typography>
              </InfoContent>
              <InfoContent title="Прибыль в час">
                <Typography size={16} weight={600}>
                  {incomeHour}
                </Typography>
              </InfoContent>
              <InfoContent title="Категория">
                <Typography size={16} weight={600}>
                  {currentElementModal?.name_rus}
                </Typography>
              </InfoContent>
            </Flex>
            <Flex className={clsx(spacing({ py: '2x' }))} noWrap fullWidth>
              <InfoContent title="Кол-во">
                <Typography size={16} weight={600}>
                  {currentElementModal?.count}
                </Typography>
              </InfoContent>
              <InfoContent title="Стоимость">
                <Typography size={16} weight={600}>
                  {formatNumber(currentElementModal?.price || '')}
                </Typography>
              </InfoContent>
              <InfoContent title="Комбинация">
                <Typography size={16} weight={600}>
                  ?
                </Typography>
              </InfoContent>
            </Flex>
          </div>

          <Flex
            className={spacing({ px: '2x', py: '4x', mb: '6x' })}
            justify="space-between"
            align="center"
            fullWidth
            noWrap
          >
            <Flex gap="m" align="center" noWrap>
              <img
                onClick={decreaseHandle}
                className={styles.iconButton}
                src={minusIcon}
                alt="minus-icon"
              />
              <Typography size={16} weight={600}>
                {buyCount}
              </Typography>
              <img
                onClick={increaseHandle}
                className={styles.iconButton}
                src={plusIcon}
                alt="plus-icon"
              />
            </Flex>
            <Flex>
              <Typography size={16} weight={600}>
                {formatNumber(totalSumToBuy.toString())}
              </Typography>
            </Flex>
          </Flex>

          <Flex direction="column" gap="m" fullWidth>
            <button className={styles.button} onClick={buyHandle}>
              <div className={styles.buttonContent}>Купить</div>
            </button>
            <button className={clsx(styles.button, styles['_rahmon'])} onClick={sellHandle}>
              <div className={styles.buttonContent}>Продать</div>
            </button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ElementModal;
