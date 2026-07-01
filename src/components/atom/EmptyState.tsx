import BookIcon from '@/assets/images/ic_book.png';

export interface EmptyStateProps {
  message?: string;
}

function EmptyState({ message = '' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[24px] py-[120px]">
      <img src={BookIcon} alt="책 아이콘" className="size-[80px]" />
      <p className="text-caption text-text-secondary">{message}</p>
    </div>
  );
}

export default EmptyState;
