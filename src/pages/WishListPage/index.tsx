import { useRef } from 'react';
import SearchResultCount from '@/components/molecule/SearchResultCount';
import BookList from '@/components/organism/BookList';
import EmptyState from '@/components/atom/EmptyState';
import { useIntersectionObserver } from '@/helpers/useIntersectionObserver';
import { useWishList } from './useWishList';
import { useWishActions } from '@/store/useWishStore';

function MyWishPage() {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { books, meta, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useWishList();

  const { toggleWish } = useWishActions();

  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <main className="mx-auto flex w-[1000px] flex-col px-[20px]">
      <section className="relative mt-[80px] flex w-[568px] flex-col gap-4">
        <h2 className="text-title1 h-[36px] font-bold">내가 찜한 책</h2>
      </section>

      <div className="mt-6">
        <SearchResultCount meta={meta} label="내가 찜한 책" />

        {!isLoading && books.length === 0 && <EmptyState message="찜한 책이 없습니다." />}

        {books.length > 0 && <BookList books={books} wishList={books} onToggleWish={toggleWish} />}

        <div ref={observerRef} className="h-10 w-full" />
      </div>
    </main>
  );
}

export default MyWishPage;
