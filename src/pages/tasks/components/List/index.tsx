import { FC } from 'react';
import { Typography } from '@shared/components/Typography';
import { Flex } from '@shared/components/Flex';
import { Task } from '@pages/tasks/components';
import { CoinText } from '@shared/components/CoinText';
import { spacing } from '@shared/mixins/MixSpacing';
import arrowRight from '../../images/arrow-icon.png';
import { useTasksStore } from '@shared/models/tasks';

interface ListProps {
  onClick?: (index: number) => void;
}
export const List: FC<ListProps> = ({ onClick: handle }) => {
  const { tasks } = useTasksStore();
  return (
    <div>
      <Typography size={16} weight={600} className={spacing({ mb: '4x' })}>
        Задания
      </Typography>
      <Flex direction="column" gap="m" fullWidth>
        {tasks.map((el, index) => (
          <Task
            key={el.id}
            onClick={() => el.isActive && handle?.(index)}
            RenderBefore={
              <img src={`${import.meta.env.VITE_APP_HOST}${el.avatarUrl}`} alt="avatar" />
            }
            RenderAfter={<img src={arrowRight} alt="avatar" />}
            disabled={!el.isActive}
          >
            <Flex direction="column" fullWidth>
              <Typography size={12} weight={600}>
                {el.title}
              </Typography>
              <CoinText>
                <Typography color="secondary" size={12}>
                  {el.reward}
                </Typography>
              </CoinText>
            </Flex>
          </Task>
        ))}
      </Flex>
    </div>
  );
};

export default List;
