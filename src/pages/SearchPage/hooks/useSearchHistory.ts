import { useCallback } from 'react';
import { useHistoryActions, useHistoryState } from '@/store/useHistoryStore';
import type { SearchHistory } from '@/types/searchHistory.dto';
import type { QueryTarget } from '@/components/organism/DetailSearchPopup';

interface UseSearchHistoryProps {
  searchValue: string;
  setSubmittedTarget: (target: QueryTarget | undefined) => void;
  handleFetch: (keyword?: string, target?: QueryTarget) => void;
}

export function useSearchHistory({
  searchValue,
  setSubmittedTarget,
  handleFetch,
}: UseSearchHistoryProps) {
  const histories = useHistoryState();
  const { addHistory, deleteHistory } = useHistoryActions();

  const handleSearchWithHistory = useCallback(
    (keyword?: string, target?: SearchHistory['queryTarget']) => {
      const targetKeyword = (keyword !== undefined ? keyword : searchValue).trim();
      if (!targetKeyword) return;

      const finalTarget = target ?? 'title';

      setSubmittedTarget(finalTarget);
      addHistory(targetKeyword, finalTarget);
      handleFetch(targetKeyword, finalTarget);
    },
    [searchValue, setSubmittedTarget, addHistory, handleFetch]
  );

  return {
    histories,
    deleteHistory,
    handleSearchWithHistory,
  };
}
