/**
 * 응답 관련 메타 정보
 */
export interface BookSearchMeta {
  /** 검색된 총 문서 수 */
  total_count: number;
  /** 중복된 문서를 제외하고, 처음부터 요청 페이지까지의 노출 가능 문서 수 */
  pageable_count: number;
  /** 현재 페이지가 마지막 페이지인지 여부. false면 다음 페이지 요청 가능 */
  is_end: boolean;
}

/**
 * 개별 도서 정보 문서
 */
export interface BookDocument {
  /** 도서 제목 */
  title: string;
  /** 도서 소개 */
  contents: string;
  /** 도서 상세 URL */
  url: string;
  /** * 국제 표준 도서번호 (ISBN10 또는 ISBN13)
   * 두 값이 모두 제공될 경우 공백(' ')으로 구분됨
   */
  isbn: string;
  /** 도서 출판날짜 (ISO 8601 형식: YYYY-MM-DDTHH:mm:ss.SSS+TZ) */
  datetime: string;
  /** 도서 저자 리스트 */
  authors: string[];
  /** 도서 출판사 */
  publisher: string;
  /** 도서 번역자 리스트 */
  translators: string[];
  /** 도서 정가 */
  price: number;
  /** 도서 판매가 */
  sale_price: number;
  /** 도서 표지 미리보기 URL */
  thumbnail: string;
  /** 도서 판매 상태 정보 (예: '정상판매', '품절', '절판' 등) */
  status: string;
}
