import { useState } from 'react';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { getSearchBookAPI } from '@/apis/book/book';
import type { QueryTarget } from '@/components/organism/DetailSearchPopup';

const PAGE_SIZE = 10;

export function useBookSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [submittedTarget, setSubmittedTarget] = useState<QueryTarget | undefined>(undefined);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['books', 'search', submittedKeyword, submittedTarget],
    queryFn: ({ pageParam }) =>
      getSearchBookAPI({
        query: submittedKeyword,
        page: pageParam,
        size: PAGE_SIZE,
        target: submittedTarget,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta.is_end) return undefined;
      return allPages.length + 1;
    },
    enabled: !!submittedKeyword,
    placeholderData: keepPreviousData,
  });

  const handleFetch = (keyword?: string, target?: QueryTarget) => {
    const targetKeyword = (keyword !== undefined ? keyword : searchValue).trim();
    if (!targetKeyword) return;

    setSubmittedKeyword(targetKeyword);
    setSubmittedTarget(target);
  };

  const books = data?.pages.flatMap((page) => page.documents) ?? [];
  const latestMeta = data?.pages[data.pages.length - 1]?.meta ?? {
    total_count: 0,
    pageable_count: 0,
    is_end: true,
  };

  return {
    searchValue,
    setSearchValue,
    handleFetch,
    books,
    meta: latestMeta,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    submittedTarget,
    setSubmittedTarget,
  };
}
