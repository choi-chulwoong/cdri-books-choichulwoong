import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SearchHistory } from '@/types/searchHistory.dto';

const isDev = import.meta.env.DEV;

interface HistoryStore {
  histories: SearchHistory[];
  actions: {
    addHistory: (query: string) => void;
    deleteHistory: (id: number) => void;
    clearState: () => void;
  };
}

function calculateUpdatedHistories(histories: SearchHistory[], query: string): SearchHistory[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return histories;

  // 1. 중복 키워드가 이미 존재하는지 확인
  const existingIndex = histories.findIndex((item) => item.query === trimmedQuery);

  if (existingIndex !== -1) {
    // 존재한다면: 해당 아이템 날짜 최신화 후 맨 앞으로 이동
    const targetItem = histories[existingIndex];
    const updatedItem: SearchHistory = {
      ...targetItem,
      dateTime: new Date().toISOString(),
    };
    const filtered = histories.filter((_, idx) => idx !== existingIndex);

    return [updatedItem, ...filtered];
  }

  // 2. 새로운 검색어인 경우
  const maxId = histories.reduce((max, item) => Math.max(max, item.id), 0);

  const newEntry: SearchHistory = {
    id: maxId + 1,
    query: trimmedQuery,
    dateTime: new Date().toISOString(),
    queryTarget: 'title',
  };

  return [newEntry, ...histories].slice(0, 8);
}

const useHistoryStore = create<HistoryStore>()(
  persist(
    devtools(
      (set) => ({
        histories: [],
        actions: {
          addHistory: (query) => {
            set((state) => ({
              histories: calculateUpdatedHistories(state.histories, query),
            }));
          },
          deleteHistory: (id) => {
            set((state) => ({
              histories: state.histories.filter((item) => item.id !== id),
            }));
          },
          clearState: () => {
            set({ histories: [] });
          },
        },
      }),
      { name: 'search-history-devtools', enabled: isDev }
    ),
    {
      name: 'search-history-storage',
      partialize: (state) => ({ histories: state.histories }),
    }
  )
);

// 외부 컴포넌트용 커스텀 훅 셀렉터
export const useHistories = () => useHistoryStore((state) => state.histories);
export const useHistoryActions = () => useHistoryStore((state) => state.actions);

export default useHistoryStore;
