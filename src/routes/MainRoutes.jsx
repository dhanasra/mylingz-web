import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/main/MainLayout';
import CreateLinkPage from '../pages/links/CreateLinkPage';

// render - dashboard
const LinksList = Loadable(lazy(() => import('../pages/links/LinksListPage')));
const CreateLink = Loadable(lazy(() => import('../pages/links/CreateLinkPage')));
const LinkDetails = Loadable(lazy(() => import('../pages/links/LinkDetailsPage')));

const MainRoutes = {
  path: '/',
  element: <MainLayout/>,
  children: [
    {
      path: '/links',
      element: <LinksList />
    },
    {
      path: '/links/create',
      element: <CreateLink />
    },
    {
      path: '/links/:linkId/details',
      element: <LinkDetails />
    }
  ]
};

export default MainRoutes;
