import type { BookSearchMeta } from '@/types/book.dto';

export interface SearchResultCountProps {
  meta: BookSearchMeta;
  label: string;
}

function SearchResultCount({ meta, label }: SearchResultCountProps) {
  return (
    <p className="text-body2 flex gap-[16px]">
      {label}
      <span>
        총 <span className="text-primary">{meta.total_count?.toLocaleString()}</span>건
      </span>
    </p>
  );
}

export default SearchResultCount;
