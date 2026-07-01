import { useRef } from 'react';
import SearchResultCount from '@/components/molecule/SearchResultCount';
import BookList from '@/components/organism/BookList';
import EmptyState from '@/components/atom/EmptyState';
import { useHistories, useHistoryActions } from '@/store/useHistoryStore';
import { useBookSearch } from './hooks/useBookSearch';
import { useIntersectionObserver } from '@/helpers/useIntersectionObserver';
import SearchBar from '@/components/organism/SearchBar';

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

  const histories = useHistories();
  const { addHistory, deleteHistory } = useHistoryActions();

  const handleSearchWithHistory = (keyword?: string) => {
    const targetKeyword = (keyword !== undefined ? keyword : searchValue).trim();
    if (!targetKeyword) return;

    addHistory(targetKeyword);
    handleSearch(targetKeyword);
  };

  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <main className="mx-auto flex w-[1000px] flex-col px-[20px]">
      <section className="mt-[80px] flex w-[568px] flex-col gap-4">
        <h2 className="text-title1 h-[36px] font-bold text-gray-900">도서 검색</h2>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearchWithHistory}
          histories={histories}
          onDeleteHistory={deleteHistory}
        />
      </section>

      <div className="mt-6">
        <SearchResultCount meta={meta} />

        {/* 엠티 컴포넌트 */}
        {!isLoading && books.length === 0 && <EmptyState message="검색된 결과가 없습니다." />}

        {/* 결과 도서 목록 */}
        {books.length > 0 && <BookList books={books} />}

        {/* 무한 스크롤 트리거 */}
        <div ref={observerRef} className="h-10 w-full" />
      </div>
    </main>
  );
}

export default SearchPage;
