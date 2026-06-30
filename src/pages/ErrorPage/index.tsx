import Button from '@/components/atom/Button';
import { useMemo } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    resetErrorBoundary?.();
    navigate(-1);
  };

  const localError = useMemo(() => (error ? (error as Error) : null), [error]);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center p-4">
      <h1 className="text-body1 mb-1 text-red-800">에러가 발생했습니다</h1>
      {localError && (
        <pre className="text-text-primary mt-4 max-w-[50%] rounded bg-red-50 p-4">
          에러 메시지 : {localError.message}
        </pre>
      )}
      <div className="mt-[25px]">
        <Button type="button" onClick={handleClickBackButton}>
          뒤로 가기
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
