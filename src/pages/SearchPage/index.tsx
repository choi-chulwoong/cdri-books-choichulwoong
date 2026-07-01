import { useRef } from 'react';
import SearchResultCount from '@/components/molecule/SearchResultCount';
import BookList from '@/components/organism/BookList';
import EmptyState from '@/components/atom/EmptyState';
import DetailSearchPopup from '@/components/organism/DetailSearchPopup';
import SearchInput from '@/components/organism/SearchInput';
import { useWishActions, useWishState } from '@/store/useWishStore';
import { useBookSearch } from './hooks/useBookSearch';
import { useBookDetailedSearch } from './hooks/useBookDetaildSearch';
import { useSearchHistory } from './hooks/useSearchHistory';
import { useIntersectionObserver } from '@/helpers/useIntersectionObserver';

function SearchPage() {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    searchValue,
    setSearchValue,
    handleFetch,
    books,
    meta,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    setSubmittedTarget,
  } = useBookSearch();

  // 상세 검색 팝업 핸들러
  const { isDetailOpen, openDetail, closeDetail, handleDetailSearchSubmit } = useBookDetailedSearch(
    {
      setSearchValue,
      handleFetch,
    }
  );

  // 검색 기록 및 검색 실행 핸들러
  const { histories, deleteHistory, handleSearchWithHistory } = useSearchHistory({
    searchValue,
    setSubmittedTarget,
    handleFetch,
  });

  // 찜하기 전역 상태
  const wishBooks = useWishState();
  const { toggleWish } = useWishActions();

  // 무한 스크롤 옵저버
  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <main className="mx-auto flex w-[1000px] flex-col px-[20px]">
      {/* 상단 검색 폼 섹션 */}
      <section className="relative mt-[80px] flex w-[568px] flex-col gap-4">
        <h2 className="text-title1 h-[36px] font-bold text-gray-900">도서 검색</h2>
        <div className="flex items-center gap-[16px]">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearchWithHistory}
            histories={histories}
            onDeleteHistory={deleteHistory}
          />
          <button
            type="button"
            className="text-body2 border-text-subtitle text-text-subtitle flex h-[35.27px] cursor-pointer items-center rounded-[8px] border p-[10px] hover:opacity-60"
            onClick={openDetail}
          >
            상세검색
          </button>
        </div>

        {isDetailOpen && (
          <DetailSearchPopup onClose={closeDetail} onSearch={handleDetailSearchSubmit} />
        )}
      </section>

      {/* 하단 결과 목록 섹션 */}
      <div className="mt-6">
        <SearchResultCount label="도서 검색 결과" meta={meta} />

        {!isLoading && books.length === 0 && <EmptyState message="검색된 결과가 없습니다." />}

        {books.length > 0 && (
          <BookList books={books} wishList={wishBooks} onToggleWish={toggleWish} />
        )}

        <div ref={observerRef} className="h-10 w-full" />
      </div>
    </main>
  );
}

export default SearchPage;
