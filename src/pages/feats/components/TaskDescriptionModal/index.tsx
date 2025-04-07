import { FC } from 'react';
import { Backdrop } from '@shared/components/Backdrop';
import { Flex } from '@shared/components/Flex';
import { Typography } from '@shared/components/Typography';
import { CoinText } from '@shared/components/CoinText';
import { Button } from '@shared/components/Button';

import styles from './styles.module.css';
import { spacing } from '@shared/mixins/MixSpacing';
import { FeatureType } from '@pages/feats/mock';

interface TaskDescriptionModalProps {
  onClose?: () => void;
  task?: FeatureType;
}

export const TaskDescriptionModal: FC<TaskDescriptionModalProps> = ({ onClose, task }) => {
  return (
    <Backdrop width={350} open={Boolean(task)} onClose={onClose}>
      <Flex gap="m" align="center" direction="column" className={spacing({ px: '1x' })} fullWidth>
        <div className={styles.avatar}>
          <img src={task?.avatar} alt="avatar" />
        </div>

        <Typography align="center" size={16} weight={600}>
          {task?.title}
        </Typography>
        <Flex align="center" direction="column">
          <Typography styles={{ color: '#EAD0A5' }}>Награда за выполнение</Typography>
          <CoinText coinSize={30}>
            <Typography size={24} weight={600}>
              {task?.price}
            </Typography>
          </CoinText>
        </Flex>
        <Typography size={9} styles={{ color: '#8D8D8D' }}>
          {task?.description}
        </Typography>

        <Flex direction="column" align="center" fullWidth>
          <Typography styles={{ color: '#EAD0A5' }}>Игроков с этим достижением</Typography>
          <Typography size={24} weight={600}>
            {task?.playerPercent}%
          </Typography>
        </Flex>
        <Button onClick={onClose}>Закрыть</Button>
      </Flex>
    </Backdrop>
  );
};

export default TaskDescriptionModal;
