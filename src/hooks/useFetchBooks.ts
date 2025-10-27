import { useState, useEffect } from 'react';
import { Book } from './useFavorites';

interface FetchBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export function useFetchBooks(query: string): FetchBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=24`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data.docs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { books, loading, error };
}
