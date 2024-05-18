import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/main/MainLayout';

// render - dashboard
const LinksList = Loadable(lazy(() => import('../pages/links/LinksListPage')));

const MainRoutes = {
  path: '/',
  element: <MainLayout/>,
  children: [
    {
      path: '/links',
      element: <LinksList />
    }
  ]
};

export default MainRoutes;
