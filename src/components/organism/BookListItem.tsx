import type { BookDocument } from '@/types/book.dto';
import { BookThumbnail } from '@/components/atom/BookThumbnail';
import { PriceText } from '@/components/atom/PriceText';
import { BookMeta } from '@/components/molecule/BookMeta';
import { BookActions } from '@/components/molecule/BookActions';
import { memo } from 'react';

export interface BookListItemProps {
  /** 도서 문서 데이터 */
  book: BookDocument;
  /** 찜 여부 */
  isFavorite: boolean;
  /** 찜 토글 핸들러 */
  onToggleFavorite: (isbn: string) => void;
  /** 상세보기 토글 핸들러 */
  onToggleExpand: (isbn: string) => void;
}

function BookListItem({ book, isFavorite, onToggleFavorite, onToggleExpand }: BookListItemProps) {
  const effectivePrice = book.sale_price > 0 ? book.sale_price : book.price;

  return (
    <div className="flex items-center p-[16px] pl-[48px]">
      {/* 도서 표지 */}
      <BookThumbnail
        thumbnail={book.thumbnail}
        title={book.title}
        size="sm"
        isFavorite={isFavorite}
        onToggleFavorite={() => onToggleFavorite(book.isbn)}
      />

      {/* 제목 + 저자 */}
      <BookMeta title={book.title} authors={book.authors} size="sm" />

      {/* 판매가 */}
      <PriceText price={effectivePrice} />

      {/* 구매하기 + 상세보기 버튼 */}
      <BookActions bookUrl={book.url} onToggleExpand={() => onToggleExpand(book.isbn)} />
    </div>
  );
}

export default memo(BookListItem);
