import { FC, useState } from 'react';
import { Layout } from '@shared/components/Layout';
import { Flex } from '@shared/components/Flex';
import { spacing } from '@shared/mixins/MixSpacing';
import { PageHeader } from '@shared/components/PageHeader';
import { Typography } from '@shared/components/Typography';
import { Scroll } from '@shared/components/Scroll';
import { CoinText } from '@shared/components/CoinText';
import { Task, TaskDescriptionModal } from './components';
import buttonFrame from './images/button-frame.png';
import styles from './styles.module.css';
import { Button } from '@shared/components/Button';
import { FeatureMock, FeatureType } from '@pages/feats/mock';

type State = {
  feature?: FeatureType;
};
export const Feats: FC = () => {
  const [{ feature }, set] = useState<State>({ feature: undefined });

  const dispatch = (payload: Partial<State>) => set(prev => ({ ...prev, ...payload }));

  const closeHandle = () => dispatch({ feature: undefined });

  return (
    <Layout hideBackground>
      <PageHeader color="green">
        <Flex
          className={spacing({ px: '1x' })}
          style={{ height: '100%' }}
          justify="center"
          align="center"
          direction="column"
          fullWidth
        >
          <Typography align="center" size={32} weight={600}>
            Достижения
          </Typography>
        </Flex>
      </PageHeader>
      <Flex className={spacing({ px: '2x', mb: '4x' })}>
        <div className={styles.button}>
          <img src={buttonFrame} alt="frame" />
          <div className={styles.content}>
            <CoinText>
              <Typography size={16} weight={600} styles={{ color: '#EBD09B' }}>
                500 000
              </Typography>
            </CoinText>
          </div>
        </div>
        <div className={styles.button}>
          <img src={buttonFrame} alt="frame" />
          <div className={styles.content}>
            <Typography size={16} weight={600} styles={{ color: '#EBD09B' }}>
              2/4
            </Typography>
          </div>
        </div>
      </Flex>

      <Scroll>
        <Flex className={spacing({ px: '4x' })} direction="column" fullWidth>
          {FeatureMock.map((el, index) => (
            <Task
              key={index}
              onClick={() => dispatch({ feature: FeatureMock[index] })}
              RenderBefore={<img src={el.avatar} alt="avater" />}
              RenderAfter={<Button>Получить</Button>}
            >
              <Flex direction="column">
                <Typography size={12} weight={600}>
                  {el.title}
                </Typography>
                <CoinText>
                  <Typography size={12} styles={{ color: '#968E8C' }}>
                    {el.price}
                  </Typography>
                </CoinText>
              </Flex>
            </Task>
          ))}
        </Flex>
      </Scroll>
      <TaskDescriptionModal task={feature} onClose={closeHandle} />
    </Layout>
  );
};

export default Feats;
