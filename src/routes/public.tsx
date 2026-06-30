import { PublicLayout } from '@/components/template/PublicLayout';
import SearchPage from '@/pages/SearchPage';
import { Navigate, type RouteObject } from 'react-router-dom';

const publicRoute: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/search" replace />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <Navigate to="/search" replace />,
      },
    ],
  },
];

export default publicRoute;
