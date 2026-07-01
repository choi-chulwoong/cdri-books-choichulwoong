import type { KeyboardEvent } from 'react';
import SearchIcon from '@/assets/images/ic_search.svg';

export interface SearchInputProps {
  /** 현재 검색어 */
  value: string;
  /** 검색어 변경 핸들러 */
  onChange: (value: string) => void;
  /** Enter 또는 검색 버튼 클릭 시 호출 */
  onSearch?: () => void;
  placeholder?: string;
}

function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = '검색어를 입력하세요',
}: SearchInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.();
  };

  return (
    <div className="focus-within:border-primary bg-lightgray flex h-[50px] flex-1 items-center gap-2 rounded-full border border-transparent p-[10px] transition-colors">
      <span className="text-text-subtitle shrink-0">
        <img src={SearchIcon} alt="검색 아이콘" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="text-body2 placeholder:text-text-subtitle flex-1 bg-transparent outline-none"
      />
    </div>
  );
}

export default SearchInput;
