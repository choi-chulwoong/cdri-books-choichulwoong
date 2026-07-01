import type { BookDocument } from '@/types/book.dto';
import { useCallback, useState } from 'react';
import BookDetailItem from '@/components/organism/BookDetailItem';
import BookListItem from '@/components/organism/BookListItem';

export interface BookListProps {
  books: BookDocument[];
}

function BookList({ books }: BookListProps) {
  /** 현재 펼쳐진 도서의 isbn */
  const [expandedIsbn, setExpandedIsbn] = useState<string | null>(null);
  /** 찜된 도서 isbn 집합 */
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((isbn: string) => {
    setExpandedIsbn((prev) => (prev === isbn ? null : isbn));
  }, []);

  const handleCollapse = useCallback(() => {
    setExpandedIsbn(null);
  }, []);

  const toggleFavorite = useCallback((isbn: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(isbn)) {
        next.delete(isbn);
      } else {
        next.add(isbn);
      }
      return next;
    });
  }, []);

  return (
    <section className="mt-[36px]">
      <ul className="list-none divide-y divide-[#D2D6DA]">
        {books.map((book) => {
          const isExpanded = expandedIsbn === book.isbn;
          const isFavorite = favorites.has(book.isbn);

          return (
            <li key={book.isbn}>
              {isExpanded ? (
                <BookDetailItem
                  book={book}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
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

export default BookList;
