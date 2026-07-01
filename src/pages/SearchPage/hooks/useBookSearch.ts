import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchBookAPI } from '@/apis/book/book';

const PAGE_SIZE = 10;

export function useBookSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['books', 'search', submittedKeyword],
    queryFn: ({ pageParam }) =>
      getSearchBookAPI({
        query: submittedKeyword,
        page: pageParam,
        size: PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta.is_end) return undefined;
      return allPages.length + 1;
    },
    enabled: !!submittedKeyword,
  });

  const handleSearch = (keyword?: string) => {
    const targetKeyword = (keyword !== undefined ? keyword : searchValue).trim();
    if (!targetKeyword) return;
    setSubmittedKeyword(targetKeyword);
  };

  const books = data?.pages.flatMap((page) => page.documents) ?? [];
  const initialMeta = {
    total_count: 0,
    pageable_count: 0,
    is_end: true,
  };
  const latestMeta = data?.pages[data.pages.length - 1]?.meta ?? initialMeta;

  return {
    searchValue,
    setSearchValue,
    handleSearch,
    books,
    meta: latestMeta,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}
