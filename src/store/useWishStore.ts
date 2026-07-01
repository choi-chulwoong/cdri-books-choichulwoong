import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookDocument } from '@/types/book.dto';

interface WishStore {
  wishList: BookDocument[];
  actions: {
    toggleWish: (book: BookDocument) => void;
  };
}

const useWishStore = create<WishStore>()(
  persist(
    (set) => ({
      wishList: [],
      actions: {
        toggleWish: (book) =>
          set((state) => {
            const isExisted = state.wishList.some((item) => item.isbn === book.isbn);

            const updatedList = isExisted
              ? state.wishList.filter((item) => item.isbn !== book.isbn)
              : [book, ...state.wishList];

            return { wishList: updatedList };
          }),
      },
    }),
    {
      name: 'book-wish-storage',
      partialize: (state) => ({ wishList: state.wishList }),
    }
  )
);

export const useWishState = () => useWishStore((state) => state.wishList);
export const useWishActions = () => useWishStore((state) => state.actions);

export default useWishStore;
