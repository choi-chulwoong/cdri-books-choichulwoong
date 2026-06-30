import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import publicRoute from '@/routes/public';

const router = createBrowserRouter(publicRoute);

export default function App() {
  return <RouterProvider router={router} />;
}
