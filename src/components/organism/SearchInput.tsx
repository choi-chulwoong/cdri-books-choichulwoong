import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import SearchIcon from '@/assets/images/ic_search.svg';
import clsx from 'clsx';
import useClickOutside from '@/helpers/useClickOutside';
import SearchHistoryList from '@/components/molecule/SearchHistoryList';
import type { SearchHistory } from '@/types/searchHistory.dto';

export interface SearchInputProps {
  /** 현재 검색어 */
  value: string;
  /** 검색어 변경 핸들러 */
  onChange: (value: string) => void;
  onSearch?: (keyword: string) => void;
  histories?: SearchHistory[];
  onDeleteHistory?: (id: number) => void;
}

function SearchInput({
  value,
  onChange,
  onSearch,
  histories = [],
  onDeleteHistory,
}: SearchInputProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleClickOutside = useCallback(() => {
    setIsFocused(false);
  }, []);

  useClickOutside([searchContainerRef], handleClickOutside);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
      setIsFocused(false);
    }
  };

  const handleHistoryClick = (id: number) => {
    const historyItem = histories.find((item) => item.id === id);
    if (historyItem) {
      onChange(historyItem.query);
      onSearch?.(historyItem.query);
    }
    setIsFocused(false);
  };

  const hasHistories = histories.length > 0;
  const borderStyle =
    isFocused && hasHistories ? 'rounded-tl-[25px] rounded-tr-[25px]' : 'rounded-full';

  return (
    <div
      ref={searchContainerRef}
      className={clsx(
        'bg-lightgray relative flex h-[50px] flex-1 items-center gap-2 border border-transparent p-[10px] transition-colors',
        borderStyle
      )}
    >
      <span className="text-text-subtitle shrink-0">
        <img src={SearchIcon} alt="검색 아이콘" />
      </span>

      <input
        type="text"
        value={value}
        onClick={() => setIsFocused(true)}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={'검색어를 입력하세요'}
        className="text-body2 placeholder:text-text-subtitle flex-1 bg-transparent outline-none"
      />

      {/* 최근 검색 기록 */}
      {isFocused && hasHistories && (
        <SearchHistoryList
          histories={histories}
          onDelete={onDeleteHistory}
          onClick={handleHistoryClick}
        />
      )}
    </div>
  );
}

export default SearchInput;
