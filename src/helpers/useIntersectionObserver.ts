import { useEffect, type RefObject } from 'react';

interface UseIntersectionObserverParams {
  targetRef: RefObject<HTMLDivElement | null>;
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function useIntersectionObserver({
  targetRef,
  onIntersect,
  hasNextPage,
  isFetchingNextPage,
}: UseIntersectionObserverParams) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef, onIntersect, hasNextPage, isFetchingNextPage]);
}
