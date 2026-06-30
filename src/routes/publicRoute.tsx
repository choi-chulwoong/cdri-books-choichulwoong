import { Layout } from '@/components/template/Layout';
import SearchPage from '@/pages/SearchPage';
import { Navigate, type RouteObject } from 'react-router-dom';
import routes from '@/routes/routes';

const publicRoute: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to={routes.SEARCH} replace />,
      },
      {
        path: routes.SEARCH,
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <Navigate to={routes.SEARCH} replace />,
      },
    ],
  },
];

export default publicRoute;
