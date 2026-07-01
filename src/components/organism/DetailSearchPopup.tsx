import { useState, useRef } from 'react';
import useClickOutside from '@/helpers/useClickOutside';
import Button from '@/components/atom/Button';
import Dropdown, { type DropdownOption } from '@/components/molecule/Dropdown';
import CloseIcon from '@/assets/images/ic_close_gray.svg';

export type QueryTarget = 'title' | 'publisher' | 'person';

interface DetailSearchPopupProps {
  onClose: () => void;
  onSearch: (keyword: string, target: QueryTarget) => void;
}

const TARGET_OPTIONS: DropdownOption<QueryTarget>[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
];

function DetailSearchPopup({ onClose, onSearch }: DetailSearchPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState('');
  const [target, setTarget] = useState<QueryTarget>('title');

  useClickOutside([popupRef], onClose);

  const handleSubmit = () => {
    if (!keyword.trim()) return;
    onClose();
    onSearch(keyword.trim(), target);
  };

  return (
    <div
      ref={popupRef}
      className="absolute right-0 bottom-[-8px] z-50 w-[360px] translate-x-[146px] translate-y-full rounded-[8px] bg-white px-[24px] py-[36px] transition-all"
      style={{ boxShadow: '0px 4px 14px 6px #97979726' }}
    >
      <div className="absolute top-[8px] right-[8px]">
        <button type="button" onClick={onClose} className="cursor-pointer">
          <img src={CloseIcon} alt="닫기" />
        </button>
      </div>

      <div className="flex items-center gap-[4px]">
        <div className="w-[100px]">
          <Dropdown<QueryTarget> options={TARGET_OPTIONS} value={target} onChange={setTarget} />
        </div>

        <div className="border-b-primary flex h-[36px] w-[208px] items-center border-b px-[9.45px] py-[5px]">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="검색어 입력"
            className="text-caption placeholder:text-text-caption flex-1 bg-transparent outline-none placeholder:text-[14px]"
            autoFocus
          />
        </div>
      </div>

      <Button
        size="lg"
        className="mt-[16px] max-h-[36px]"
        onClick={handleSubmit}
        disabled={!keyword.trim()}
        fullWidth
      >
        검색하기
      </Button>
    </div>
  );
}

export default DetailSearchPopup;
