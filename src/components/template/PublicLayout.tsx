import ErrorPage from '@/pages/ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../organism/AppHeader';

export function PublicLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={(e) => console.error(e)}>
      <div className="flex w-full max-w-[100vw] flex-col items-center">
        <AppHeader />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}
