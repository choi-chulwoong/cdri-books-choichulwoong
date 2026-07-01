import Button from '@/components/atom/Button';
import ChevronDownIcon from '@/assets/images/ic_chevron_down.svg';

export interface BookActionsProps {
  /** 도서 외부 구매 링크 */
  bookUrl: string;
  /** 상세보기 토글 핸들러 */
  onToggleExpand: () => void;
}

export function BookActions({ bookUrl, onToggleExpand }: BookActionsProps) {
  const handlePurchase = () => {
    if (bookUrl) window.open(bookUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="ml-[56px] flex shrink-0 items-center gap-[8px]">
      <Button variant="primary" size="md" onClick={handlePurchase}>
        구매하기
      </Button>
      <Button
        variant="ghost"
        size="md"
        onClick={onToggleExpand}
        rightIcon={<img src={ChevronDownIcon} />}
      >
        상세보기
      </Button>
    </div>
  );
}
