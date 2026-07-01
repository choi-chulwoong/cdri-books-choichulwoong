import LikeFillIcon from '@/assets/images/ic_like_fill.svg';
import LikeLineIcon from '@/assets/images/ic_like_line.svg';

export type ThumbnailSize = 'sm' | 'lg';

export interface BookThumbnailProps {
  /** 도서 표지 미리보기 URL */
  thumbnail: string;
  /** 도서 제목  */
  title: string;
  /** 이미지 크기 프리셋 */
  size?: ThumbnailSize;
  /** 찜 여부  */
  isFavorite?: boolean;
  /** 찜 토글 핸들러 */
  onToggleFavorite?: () => void;
}

const sizeMap: Record<ThumbnailSize, string> = {
  sm: 'w-[48px] h-[68px]',
  lg: 'w-[210px] h-[280px]',
};

export function BookThumbnail({
  thumbnail,
  title,
  size = 'sm',
  isFavorite = false,
  onToggleFavorite,
}: BookThumbnailProps) {
  return (
    <div className={`relative shrink-0 ${sizeMap[size]}`}>
      {thumbnail ? (
        <img src={thumbnail} alt={`${title} 표지`} className="h-full w-full rounded object-cover" />
      ) : (
        <div className="bg-lightgray flex h-full w-full items-center justify-center rounded" />
      )}

      {/* 찜 하트 버튼 */}
      {onToggleFavorite && (
        <button
          type="button"
          onClick={onToggleFavorite}
          className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center"
        >
          {isFavorite ? <img src={LikeFillIcon} /> : <img src={LikeLineIcon} />}
        </button>
      )}
    </div>
  );
}
