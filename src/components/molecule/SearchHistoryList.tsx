import CloseIcon from '@/assets/images/ic_close.svg';
import type { SearchHistory } from '@/types/searchHistory.dto';

interface SearchHistoryListProps {
  histories: SearchHistory[];
  onClick?: (id: number) => void;
  onDelete?: (id: number) => void;
}

function SearchHistoryList({ histories, onClick, onDelete }: SearchHistoryListProps) {
  return (
    <div className="bg-lightgray text-text-subtitle text-caption absolute bottom-0 left-0 z-10 w-full translate-y-full rounded-br-[25px] rounded-bl-[25px] py-[28px] pr-[25px] pl-[51px]">
      <ul className="flex flex-col gap-[16px]">
        {histories.map((history) => (
          <li key={history.id} className="flex items-center justify-between">
            <span className="flex-1 cursor-pointer text-left" onClick={() => onClick?.(history.id)}>
              {history.query}
            </span>
            <button className="cursor-pointer" onClick={() => onDelete?.(history.id)}>
              <img src={CloseIcon} alt="삭제" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistoryList;
