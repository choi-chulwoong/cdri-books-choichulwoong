import { useCallback, useState } from 'react';
import { useHistoryActions } from '@/store/useHistoryStore';
import type { QueryTarget } from '@/components/organism/DetailSearchPopup';

interface UseBookDetailedSearchProps {
  /** 일반 검색어 입력창을 초기화하기 위한 세터 */
  setSearchValue: (value: string) => void;
  /** API 호출 */
  handleFetch: (keyword?: string, target?: QueryTarget) => void;
}

export function useBookDetailedSearch({ setSearchValue, handleFetch }: UseBookDetailedSearchProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addHistory } = useHistoryActions();

  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);

  const handleDetailSearchSubmit = useCallback(
    (keyword: string, target: QueryTarget) => {
      // 검색어 초기화
      setSearchValue('');
      // 검색기록 저장
      addHistory(keyword, target);
      // API 호출
      handleFetch(keyword, target);
      // 팝업 닫기
      closeDetail();
    },
    [setSearchValue, addHistory, handleFetch]
  );

  return {
    isDetailOpen,
    openDetail,
    closeDetail,
    handleDetailSearchSubmit,
  };
}
