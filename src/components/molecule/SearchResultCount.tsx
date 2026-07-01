import type { BookSearchMeta } from '@/types/book.dto';

export interface SearchResultCountProps {
  meta: BookSearchMeta;
}

function SearchResultCount({ meta }: SearchResultCountProps) {
  return (
    <p className="text-body2 flex gap-[16px]">
      도서 검색 결과
      <span>
        총 <span className="text-primary">{meta.total_count?.toLocaleString()}</span>건
      </span>
    </p>
  );
}

export default SearchResultCount;
