import type { BookDocument } from '@/types/book.dto';
import { memo, useCallback, useState } from 'react';
import BookDetailItem from '@/components/organism/BookDetailItem';
import BookListItem from '@/components/organism/BookListItem';

export interface BookListProps {
  books: BookDocument[];
  wishList: BookDocument[];
  onToggleWish?: (book: BookDocument) => void;
}

function BookList({ books, wishList, onToggleWish }: BookListProps) {
  const [expandedIsbn, setExpandedIsbn] = useState<string | null>(null);

  const toggleExpand = useCallback((isbn: string) => {
    setExpandedIsbn((prev) => (prev === isbn ? null : isbn));
  }, []);

  const handleCollapse = useCallback(() => {
    setExpandedIsbn(null);
  }, []);

  return (
    <section className="mt-[36px]">
      <ul className="list-none divide-y divide-[#D2D6DA]">
        {books.map((book) => {
          const isExpanded = expandedIsbn === book.isbn;

          const isFavorite = wishList.some((item) => item.isbn === book.isbn);

          return (
            <li key={book.isbn}>
              {isExpanded ? (
                <BookDetailItem
                  book={book}
                  isFavorite={isFavorite}
                  onToggleFavorite={() => onToggleWish(book)}
                  onCollapse={handleCollapse}
                />
              ) : (
                <BookListItem book={book} onToggleExpand={toggleExpand} />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default memo(BookList);
