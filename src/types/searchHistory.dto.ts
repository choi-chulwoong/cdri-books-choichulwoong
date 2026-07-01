import type { QueryTarget } from '@/components/organism/DetailSearchPopup';

export interface SearchHistory {
  /** 기록 ID */
  id: number;
  /** 검색어 */
  query: string;
  /** 검색 날짜 */
  dateTime: string;
  /** 검색 필드 */
  queryTarget: QueryTarget;
}
