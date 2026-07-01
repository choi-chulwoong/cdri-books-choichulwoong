export type BookMetaSize = 'sm' | 'lg';

export interface BookMetaProps {
  /** 도서 제목 (BookDocument.title) */
  title: string;
  /** 저자 목록 (BookDocument.authors) */
  authors: string[];
  size?: BookMetaSize;
}

export function BookMeta({ title, authors, size = 'sm' }: BookMetaProps) {
  const authorText = authors.join(', ');

  if (size === 'lg') {
    return (
      <div className="flex items-start gap-[16px]">
        <h3 className="text-title3 max-w-[70%] leading-tight">{title}</h3>
        <p className="text-caption text-text-subtitle truncate leading-tight">{authorText}</p>
      </div>
    );
  }

  return (
    <div className="ml-[48px] flex w-full max-w-[408px] items-center gap-[16px]">
      <p className="text-title3 truncate">{title}</p>
      <p className="text-body2 text-text-secondary truncate">{authorText}</p>
    </div>
  );
}
