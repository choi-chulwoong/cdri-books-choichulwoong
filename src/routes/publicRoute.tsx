import { PublicLayout } from '@/components/template/PublicLayout';
import SearchPage from '@/pages/SearchPage';
import { Navigate, type RouteObject } from 'react-router-dom';
import routes from '@/routes';

const publicRoute: RouteObject[] = [
  {
    element: <PublicLayout />,
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
