import { FC } from 'react';
import Backdrop from '@shared/components/Backdrop';
import Scroll from '@shared/components/Scroll';
import Typography from '@shared/components/Typography';
import { Flex } from '@shared/components/Flex';
import { DailyItem } from './components';
import chest from '../../images/chest.png';
import Button from '@shared/components/Button';
import { spacing } from '@shared/mixins/MixSpacing';
import { useUserStore } from '@shared/models/user';
import { useClaimDaily } from '../../hooks';
import useResetUserInfo from '@shared/hooks/useResetUserInfo';
import { useSnackbar } from 'notistack';

interface DailyModalProps {
  open?: boolean;
  onClose?: () => void;
}
const days = [
  {
    reward: 500
  },
  {
    reward: 1000
  },
  {
    reward: 2500
  },
  {
    reward: 5000
  },
  {
    reward: 10000
  },
  {
    reward: 25000
  },
  {
    reward: 50000
  },
  {
    reward: 100000
  },
  {
    reward: 250000
  }
];
export const DailyModal: FC<DailyModalProps> = ({ open, onClose }) => {
  const { user } = useUserStore();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isPending } = useClaimDaily({
    onSuccess: () => {
      console.log(days[user?.dailyDay || 0] || days[0]);
      const day = days[user?.dailyDay || 0] || days[0];

      enqueueSnackbar({ message: `+${day.reward}`, variant: 'success' });
      fetchUserData();
      onClose?.();
    },
    onError: e => {
      console.log(e);
      enqueueSnackbar({ message: `Ошибка`, variant: 'success' });
    }
  });
  const { fetchUserData } = useResetUserInfo();

  const claimHandle = async () => {
    mutate();
  };

  return (
    <Backdrop width={315} open={open} onClose={onClose}>
      <Scroll>
        <Typography align="center" size={16} weight={600}>
          Ежедневная награда
        </Typography>

        <img src={chest} style={{ width: '50%', margin: '7px auto' }} alt="chest" />
        <Flex className={spacing({ mb: '2x' })} justify="space-between" fullWidth>
          {days.map((el, index) => (
            <DailyItem
              key={index}
              reward={el.reward}
              day={index + 1}
              active={index < (user?.dailyDay || 0)}
            />
          ))}
        </Flex>
        {user?.isDailyReady ? (
          <Button onClick={claimHandle} loading={isPending}>
            Забрать награду
          </Button>
        ) : (
          <Button variant="rahmon">Возвращайся завтра</Button>
        )}
      </Scroll>
    </Backdrop>
  );
};

export default DailyModal;
