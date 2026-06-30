import SearchInput from '@/components/atom/SearchInput';

export interface SearchBarProps {
  /** 현재 검색어 */
  value: string;
  /** 검색어 변경 핸들러 */
  onChange: (value: string) => void;
  /** 검색 실행 핸들러 */
  onSearch: () => void;
  /** 상세검색 버튼 클릭 핸들러 */
  onDetailSearch?: () => void;
}

function SearchBar({ value, onChange, onSearch, onDetailSearch }: SearchBarProps) {
  return (
    <div className="flex items-center gap-[16px]">
      <SearchInput
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="검색어를 입력하세요"
      />
      <button
        className="text-body2 border-text-subtitle text-text-subtitle flex h-[35.27px] cursor-pointer rounded-[8px] border p-[10px] hover:opacity-60"
        onClick={onDetailSearch}
      >
        상세검색
      </button>
    </div>
  );
}

export default SearchBar;
