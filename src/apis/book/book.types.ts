import type { BookDocument, BookSearchMeta } from '@/types/book.dto';

export type queryTarget = 'title' | 'isbn' | 'publisher' | 'person';

/**
 * 도서 검색 API 요청 쿼리 파라미터
 */
export interface GetSearchBookParams {
  /** 검색을 원하는 질의어 (필수 값) */
  query: string;

  /**
   * 결과 문서 정렬 방식 (기본값: 'accuracy')
   * - 'accuracy': 정확도순
   * - 'latest': 발간일순
   */
  sort?: 'accuracy' | 'latest';

  /** 결과 페이지 번호 (1~50 사이의 값, 기본값: 1) */
  page?: number;

  /** 한 페이지에 보여질 문서 수 (1~50 사이의 값, 기본값: 10) */
  size?: number;

  /**
   * 검색 필드 제한
   * - 'title': 제목
   * - 'isbn': ISBN
   * - 'publisher': 출판사
   * - 'person': 인명
   */
  target?: queryTarget;
}

export interface GetSearchBookResponse {
  meta: BookSearchMeta;
  documents: BookDocument[];
}
