/** 숫자를 한국 통화 형식으로 변환 (예: 13300 → "13,300원") */
export const formatPrice = (price: number): string => `${price.toLocaleString('ko-KR')}원`;
