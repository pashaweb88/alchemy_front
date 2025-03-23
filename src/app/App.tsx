import { BrowserRouter, Route, Routes } from 'react-router';

import { getUserData } from '@shared/models/user';
import { useEffect } from 'react';

import {
  ROUTE_ELEMENTS,
  ROUTE_MAIN,
  ROUTE_FEATS,
  ROUTE_POTION,
  ROUTE_TASKS
} from '@shared/constants/routes';
import { MainPage, Tasks, Feats, Elements, Create } from '@pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import './App.scss';
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_MAIN} element={<MainPage />} />
          <Route path={ROUTE_ELEMENTS} element={<Elements />} />
          <Route path={ROUTE_FEATS} element={<Feats />} />
          <Route path={ROUTE_POTION} element={<Create />} />
          <Route path={ROUTE_TASKS} element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
