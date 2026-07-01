import { useRef } from 'react';
import SearchResultCount from '@/components/molecule/SearchResultCount';
import BookList from '@/components/organism/BookList';
import SearchSection from '@/components/organism/SearchSection';
import { useBookSearch } from './hooks/useBookSearch';
import { useIntersectionObserver } from '@/helpers/useIntersectionObserver';
import EmptyState from '@/components/atom/EmptyState';

function SearchPage() {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    searchValue,
    setSearchValue,
    handleSearch,
    books,
    meta,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useBookSearch();

  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <main className="mx-auto flex w-[1000px] flex-col px-[20px]">
      <SearchSection
        className="mt-[80px]"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
      />

      <div className="mt-6">
        <SearchResultCount meta={meta} />
        {!isLoading && books.length === 0 && <EmptyState message="검색된 결과가 없습니다." />}
        {books.length > 0 && <BookList books={books} />}
        <div ref={observerRef} className="h-10 w-full" />
      </div>
    </main>
  );
}

export default SearchPage;
