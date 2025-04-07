import { BrowserRouter, Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage, Tasks, Feats, Elements, Create } from '@pages';
import {
  ROUTE_ELEMENTS,
  ROUTE_MAIN,
  ROUTE_FEATS,
  ROUTE_POTION,
  ROUTE_TASKS
} from '@shared/constants/routes';
import { useResetUserInfo } from '@shared/hooks/useResetUserInfo';
import { login } from '@shared/utils/login';
import { Layout } from '@shared/components/Layout';
import { Flex } from '@shared/components/Flex';
import { Typography } from '@shared/components/Typography';
import { getTasks } from '@shared/models/tasks';
import { getFriends } from '@shared/models/friends';
const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);
  const { fetchUserData } = useResetUserInfo();

  const init = async () => {
    await login();
    await fetchUserData();
  };

  useEffect(() => {
    init().then(() => {
      setLoading(false);
      getTasks();
      getFriends();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {loading ? (
          <Layout hideNavigation>
            <Flex style={{ width: '100%', height: '100%' }} align="center" justify="center">
              <Typography>Loading</Typography>
            </Flex>
          </Layout>
        ) : (
          <Routes>
            <Route path={ROUTE_MAIN} element={<MainPage />} />
            <Route path={ROUTE_ELEMENTS} element={<Elements />} />
            <Route path={ROUTE_FEATS} element={<Feats />} />
            <Route path={ROUTE_POTION} element={<Create />} />
            <Route path={ROUTE_TASKS} element={<Tasks />} />
          </Routes>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
