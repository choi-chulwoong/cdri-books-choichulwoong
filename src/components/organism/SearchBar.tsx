import SearchInput from '@/components/organism/SearchInput';
import type { SearchHistory } from '@/types/searchHistory.dto';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (keyword?: string) => void;
  onDetailSearch?: () => void;
  histories?: SearchHistory[];
  onDeleteHistory?: (id: number) => void;
}

function SearchBar({
  value,
  onChange,
  onSearch,
  onDetailSearch,
  histories,
  onDeleteHistory,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-[16px]">
      <SearchInput
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        histories={histories}
        onDeleteHistory={onDeleteHistory}
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
