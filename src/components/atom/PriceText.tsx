import { formatPrice } from '@/utils/common';
import clsx from 'clsx';

export interface PriceTextProps {
  /** 가격 */
  price: number;
  /** 텍스트 라벨 */
  label?: string;
  /** true → 취소선 스타일 (정가), false → 강조 스타일 (판매가) */
  isOriginal?: boolean;
}

export function PriceText({ price, label, isOriginal = false }: PriceTextProps) {
  return (
    <span className="ml-[22px] flex shrink-0 items-center gap-[8px] text-right">
      {label && (
        <span className="text-text-subtitle text-[10px] leading-[26px] font-medium">{label}</span>
      )}
      <span
        className={clsx(
          'min-w-[76px] text-[18px] leading-[26px]',
          isOriginal ? 'font-[350] line-through' : 'font-bold'
        )}
      >
        {formatPrice(price)}
      </span>
    </span>
  );
}
