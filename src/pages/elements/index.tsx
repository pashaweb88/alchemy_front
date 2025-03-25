import { FC, useEffect } from 'react';
import { Layout } from '@shared/components/Layout';
import { Filter, Header, List } from '@pages/elements/components';
import { getElements, useElementsStore } from '@shared/models/elements';
import ElementModal from '@pages/elements/components/ElementModal';

export const Elements: FC = () => {
  const { currentElementModal } = useElementsStore();

  return (
    <Layout hideBackground>
      <Header />
      <Filter />
      <List />
      {currentElementModal && <ElementModal />}
    </Layout>
  );
};

export default Elements;
