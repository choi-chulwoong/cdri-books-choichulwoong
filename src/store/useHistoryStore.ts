import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SearchHistory } from '@/types/searchHistory.dto';
import type { QueryTarget } from '@/components/organism/DetailSearchPopup';

const isDev = import.meta.env.DEV;

interface HistoryStore {
  histories: SearchHistory[];
  actions: {
    addHistory: (query: string, target?: QueryTarget) => void;
    deleteHistory: (id: number) => void;
    clearState: () => void;
  };
}

export function calculateUpdatedHistories(
  histories: SearchHistory[],
  query: string,
  target: QueryTarget = 'title'
): SearchHistory[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return histories;

  // 지난 검색 기록 중 같은 검색어가 있는지 확인한다
  const existingIndex = histories.findIndex((item) => item.query === trimmedQuery);

  if (existingIndex !== -1) {
    // 존재한다면 해당 아이템을 복사하고 날짜와 타겟을 최신화한다.
    const targetItem = histories[existingIndex];
    const updatedItem: SearchHistory = {
      ...targetItem,
      queryTarget: target,
      dateTime: new Date().toISOString(),
    };

    const filtered = histories.filter((_, idx) => idx !== existingIndex);
    return [updatedItem, ...filtered];
  }

  // 새로운 검색어인 경우 추가한다.
  const maxId = histories.reduce((max, item) => Math.max(max, item.id), 0);

  const newEntry: SearchHistory = {
    id: maxId + 1,
    query: trimmedQuery,
    dateTime: new Date().toISOString(),
    queryTarget: target,
  };

  return [newEntry, ...histories].slice(0, 8);
}

const useHistoryStore = create<HistoryStore>()(
  persist(
    devtools(
      (set) => ({
        histories: [],
        actions: {
          addHistory: (query, target) => {
            set((state) => ({
              histories: calculateUpdatedHistories(state.histories, query, target),
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

export const useHistoryState = () => useHistoryStore((state) => state.histories);
export const useHistoryActions = () => useHistoryStore((state) => state.actions);

export default useHistoryStore;
