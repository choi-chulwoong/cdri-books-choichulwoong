import { useWishState } from '@/store/useWishStore';
import { useState, useMemo } from 'react';

const PAGE_SIZE = 10;

export function useWishList() {
  const wishBooks = useWishState();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const books = useMemo(() => {
    return wishBooks.slice(0, visibleCount);
  }, [wishBooks, visibleCount]);

  const hasNextPage = visibleCount < wishBooks.length;

  const fetchNextPage = () => {
    if (hasNextPage) {
      setVisibleCount((prev) => prev + PAGE_SIZE);
    }
  };

  const meta = useMemo(
    () => ({
      total_count: wishBooks.length,
      pageable_count: wishBooks.length,
      is_end: !hasNextPage,
    }),
    [wishBooks.length, hasNextPage]
  );

  return {
    books,
    meta,
    hasNextPage,
    fetchNextPage,
    isLoading: false,
    isFetchingNextPage: false,
  };
}
