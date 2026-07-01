import { PriceText } from '@/components/atom/PriceText';

export interface BookPriceInfoProps {
  /** 도서 정가 (BookDocument.price) */
  price: number;
  /** 도서 판매가 (BookDocument.sale_price) */
  salePrice: number;
}

export function BookPriceInfo({ price, salePrice }: BookPriceInfoProps) {
  const hasDiscount = salePrice > 0 && salePrice !== price;
  const effectiveSalePrice = salePrice > 0 ? salePrice : price;

  return (
    <div className={`flex flex-col items-end justify-center gap-[8px]`}>
      {hasDiscount && <PriceText price={price} label="원가" isOriginal />}
      <PriceText price={effectiveSalePrice} label={hasDiscount ? '할인가' : undefined} />
    </div>
  );
}
