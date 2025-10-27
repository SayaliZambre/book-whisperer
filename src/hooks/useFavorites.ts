import { useState, useEffect } from 'react';

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
  subject?: string[];
  publisher?: string[];
}

const FAVORITES_KEY = 'bookfinder_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const addFavorite = (book: Book) => {
    const newFavorites = [...favorites, book];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const removeFavorite = (bookKey: string) => {
    const newFavorites = favorites.filter(book => book.key !== bookKey);
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const isFavorite = (bookKey: string) => {
    return favorites.some(book => book.key === bookKey);
  };

  const toggleFavorite = (book: Book) => {
    if (isFavorite(book.key)) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
