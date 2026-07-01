import { memo } from 'react';
import ChevronUpIcon from '@/assets/images/ic_chevron_up.svg';
import type { BookDocument } from '@/types/book.dto';
import { BookThumbnail } from '@/components/atom/BookThumbnail';
import { BookMeta } from '@/components/molecule/BookMeta';
import Button from '@/components/atom/Button';
import { BookPriceInfo } from '@/components/molecule/BookPriceInfo';

export interface BookDetailItemProps {
  /** 도서 문서 데이터 */
  book: BookDocument;
  /** 찜 여부 */
  isFavorite: boolean;
  /** 찜 토글 핸들러 */
  onToggleFavorite: (isbn: string) => void;
  /** 상세보기 닫기(접기) 핸들러 */
  onCollapse: () => void;
}

function BookDetailItem({ book, isFavorite, onToggleFavorite, onCollapse }: BookDetailItemProps) {
  const handlePurchase = () => {
    if (book.url) window.open(book.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-[24px] pr-[16px] pb-[40px] pl-[54px]">
      <div className="flex">
        {/* 왼쪽: 대형 썸네일 */}
        <BookThumbnail
          thumbnail={book.thumbnail}
          title={book.title}
          size="lg"
          isFavorite={isFavorite}
          onToggleFavorite={() => onToggleFavorite(book.isbn)}
        />

        {/* 중간: 콘텐츠 영역 */}
        <div className="ml-[32px] flex w-full min-w-[360px] flex-1 flex-col pt-[20px]">
          <BookMeta title={book.title} authors={book.authors} size="lg" />

          {book.contents && (
            <div className="mt-[16px] flex flex-col gap-2">
              <p className="text-body2-bold">책 소개</p>

              <div className="mt-[12px] flex flex-col gap-y-3 text-[10px] leading-[16px] font-medium">
                {book.contents
                  .split('. ') // '. '을 기준으로 문자열 분리
                  .filter((sentence) => sentence.trim() !== '')
                  .map((sentence, index) => (
                    <span key={`${book.isbn}-${index}`}>{sentence.trim()}.</span>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽: 버튼 영역 */}
        <div className="ml-[48px] flex flex-1 flex-col items-end justify-between pt-[3px]">
          <Button
            variant="ghost"
            size="md"
            rightIcon={<img src={ChevronUpIcon} />}
            onClick={onCollapse}
            className="shrink-0"
          >
            상세보기
          </Button>

          <div className="flex w-full flex-col gap-[28px]">
            <BookPriceInfo price={book.price} salePrice={book.sale_price} />
            <Button variant="primary" size="lg" fullWidth onClick={handlePurchase}>
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BookDetailItem);
