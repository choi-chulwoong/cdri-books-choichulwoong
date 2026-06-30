import ErrorPage from '@/pages/ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={(e) => console.error(e)}>
      <div className="flex w-full max-w-[100vw] overflow-x-hidden">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}
