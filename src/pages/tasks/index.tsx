import { FC } from 'react';
import { Layout } from '@shared/components/Layout';
import { Flex } from '@shared/components/Flex';
import { PageHeader } from '@shared/components/PageHeader';
import { Typography } from '@shared/components/Typography';
import { Scroll } from '@shared/components/Scroll';
import { Friends, Daily, List, TaskDescriptionModal } from './components';
import { spacing } from '@shared/mixins/MixSpacing';
import { useTasksStore } from '@shared/models/tasks';

export const Tasks: FC = () => {
  const { taskModal, tasks } = useTasksStore();
  const { setState } = useTasksStore;

  const clickHandle = (index: number) => setState(() => ({ taskModal: tasks[index] }));

  const closeHandle = () => setState(() => ({ taskModal: undefined }));

  return (
    <Layout hideBackground>
      <PageHeader>
        <Flex
          className={spacing({ px: '1x' })}
          style={{ height: '100%' }}
          justify="center"
          align="center"
          direction="column"
          fullWidth
        >
          <Typography align="center" size={32} weight={600}>
            Заработай больше монет!
          </Typography>
        </Flex>
      </PageHeader>
      <Scroll>
        <Friends />
        <Flex
          direction="column"
          className={spacing({ px: '4x' })}
          style={{ paddingBottom: '100px' }}
          gap="xl"
          fullWidth
        >
          <Daily />
          <List onClick={clickHandle} />
        </Flex>
      </Scroll>

      <TaskDescriptionModal task={taskModal} onClose={closeHandle} />
    </Layout>
  );
};

export default Tasks;
