import { FC } from 'react';
import { Layout } from '@shared/components/Layout';
import { Filter, List } from '@pages/elements/components';
import { useElementsStore } from '@shared/models/elements';
import { ElementModal } from '@pages/elements/components/ElementModal';
import { Scroll } from '@shared/components/Scroll';
import { PageHeader } from '@shared/components/PageHeader';
import { Typography } from '@shared/components/Typography';
import { CoinText } from '@shared/components/CoinText';
import { Flex } from '@shared/components/Flex';
import { useUserStore } from '@shared/models/user';
import { formatNumber } from '@shared/utils/format-sum-to-k';
import { spacing } from '@shared/mixins/MixSpacing';

export const Elements: FC = () => {
  const { currentElementModal } = useElementsStore();
  const { user } = useUserStore();
  return (
    <Layout hideBackground>
      <PageHeader>
        <Flex
          style={{ height: '100%' }}
          justify="center"
          align="center"
          direction="column"
          fullWidth
        >
          <Typography align="center" size={32} weight={600}>
            Elements
          </Typography>
          <CoinText coinSize={60} offsetY={5}>
            <Typography align="center" size={32} weight={600}>
              {formatNumber(user?.balance || '0')}
            </Typography>
          </CoinText>
        </Flex>
      </PageHeader>
      <div className={spacing({ pr: '10x', pl: '8x', mb: '2x' })}>
        <Filter />
      </div>
      <Scroll>
        <List />
      </Scroll>
      {currentElementModal && <ElementModal />}
    </Layout>
  );
};

export default Elements;
