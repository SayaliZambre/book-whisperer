import { Book } from '@/hooks/useFavorites';
import { BookCard } from './BookCard';
import { SkeletonCard } from './SkeletonCard';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  isFavorite: (key: string) => boolean;
  onToggleFavorite: (book: Book) => void;
  onBookClick: (book: Book) => void;
}

export function BookGrid({
  books,
  loading,
  isFavorite,
  onToggleFavorite,
  onBookClick,
}: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          isFavorite={isFavorite(book.key)}
          onToggleFavorite={() => onToggleFavorite(book)}
          onClick={() => onBookClick(book)}
        />
      ))}
    </div>
  );
}
