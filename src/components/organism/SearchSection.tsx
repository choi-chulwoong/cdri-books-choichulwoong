import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import SearchBar from '@/components/molecule/SearchBar';

export interface SearchSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** 현재 검색어  */
  searchValue: string;
  /** 검색어 변경 핸들러 */
  onSearchChange: (value: string) => void;
  /** 검색 실행 핸들러 */
  onSearch: () => void;
  /** 상세검색 버튼 클릭 핸들러 */
  onDetailSearch?: () => void;
}
function SearchSection({
  searchValue,
  onSearchChange,
  onSearch,
  onDetailSearch,
  ...props
}: SearchSectionProps) {
  return (
    <section {...props} className={clsx('flex w-[568px] flex-col gap-4', props?.className)}>
      <h2 className="text-title1 h-[36px]">도서 검색</h2>
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        onSearch={onSearch}
        onDetailSearch={onDetailSearch}
      />
    </section>
  );
}

export default SearchSection;
