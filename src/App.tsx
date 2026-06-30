import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import publicRoute from '@/routes/publicRoute';

const router = createBrowserRouter(publicRoute);

export default function App() {
  return <RouterProvider router={router} />;
}
