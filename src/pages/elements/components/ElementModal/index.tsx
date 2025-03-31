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

interface ElementModalProps {
  onSuccessBuy?: () => void;
}
type State = {
  buyCount: number;
};

export const ElementModal: FC<ElementModalProps> = ({ onSuccessBuy }) => {
  const [{ buyCount }, set] = useState<State>({ buyCount: 1 });

  const dispatch = (payload: Partial<State>) => set(prev => ({ ...prev, ...payload }));

  const { currentElementModal } = useElementsStore();
  const { enqueueSnackbar } = useSnackbar();

  const cover = `${import.meta.env.VITE_APP_HOST}/elements/${currentElementModal?.name_eng}.webp`;

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
          <div className={spacing({ mb: '2x' })}>
            <ElementCard name={currentElementModal?.name_eng} src={cover} />
          </div>

          <div className={styles.explanation}>? + ? = 'x';</div>

          <Flex className={clsx(styles.divider, spacing({ py: '2x' }))} noWrap fullWidth>
            <InfoContent title="Уровень">
              <p>{currentElementModal?.level}</p>
            </InfoContent>
            <InfoContent title="Прибыль в час">
              <p>{incomeHour}</p>
            </InfoContent>
            <InfoContent title="Категория">
              <p>w</p>
            </InfoContent>
          </Flex>
          <Flex className={clsx(spacing({ py: '2x' }))} noWrap fullWidth>
            <InfoContent title="Кол-во">
              <p>1</p>
            </InfoContent>
            <InfoContent title="Стоимость">
              <p>{formatNumber(currentElementModal?.price || '')}</p>
            </InfoContent>
            <InfoContent title="Комбинация">
              <p>w</p>
            </InfoContent>
          </Flex>

          <Flex justify="space-between" align="center" fullWidth noWrap>
            <Flex gap="m" align="center" noWrap>
              <img
                onClick={decreaseHandle}
                className={styles.iconButton}
                src={minusIcon}
                alt="minus-icon"
              />
              <span>{buyCount}</span>
              <img
                onClick={increaseHandle}
                className={styles.iconButton}
                src={plusIcon}
                alt="plus-icon"
              />
            </Flex>
            <Flex>50k</Flex>
          </Flex>

          <button className={styles.button} onClick={buyHandle}>
            <div className={styles.buttonContent}>Kupit</div>
          </button>
          <button className={clsx(styles.button, styles['_rahmon'])} onClick={sellHandle}>
            <div className={styles.buttonContent}>Prodat</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementModal;
