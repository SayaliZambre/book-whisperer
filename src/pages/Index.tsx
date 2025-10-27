import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { BookGrid } from '@/components/BookGrid';
import { BookModal } from '@/components/BookModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { EmptyState } from '@/components/EmptyState';
import { FilterBar } from '@/components/FilterBar';
import { ChatSidebar } from '@/components/ChatSidebar';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetchBooks } from '@/hooks/useFetchBooks';
import { useFavorites, Book } from '@/hooks/useFavorites';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Heart, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { books, loading, error } = useFetchBooks(debouncedQuery);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  const sortedBooks = useMemo(() => {
    const booksCopy = [...books];
    
    switch (sortBy) {
      case 'year-desc':
        return booksCopy.sort((a, b) => 
          (b.first_publish_year || 0) - (a.first_publish_year || 0)
        );
      case 'year-asc':
        return booksCopy.sort((a, b) => 
          (a.first_publish_year || 0) - (b.first_publish_year || 0)
        );
      case 'title':
        return booksCopy.sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      default:
        return booksCopy;
    }
  }, [books, sortBy]);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleToggleFavorite = () => {
    if (selectedBook) {
      toggleFavorite(selectedBook);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Chat Sidebar */}
      <aside className="w-80 hidden md:block">
        <ChatSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl md:text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  BookFinder
                </h1>
              </div>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for books by title..."
            />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="mb-6 bg-muted">
            <TabsTrigger value="search" className="data-[state=active]:bg-background">
              <BookOpen className="w-4 h-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-background">
              <Heart className="w-4 h-4 mr-2" />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {debouncedQuery && sortedBooks.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Found {sortedBooks.length} results
                </p>
                <FilterBar sortBy={sortBy} onSortChange={setSortBy} />
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-destructive">Error: {error}</p>
              </div>
            )}

            {!debouncedQuery && !loading && <EmptyState type="search" />}

            {debouncedQuery && !loading && sortedBooks.length === 0 && (
              <EmptyState type="no-results" />
            )}

            <BookGrid
              books={sortedBooks}
              loading={loading}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onBookClick={handleBookClick}
            />
          </TabsContent>

          <TabsContent value="favorites">
            {favorites.length === 0 ? (
              <EmptyState type="favorites" />
            ) : (
              <BookGrid
                books={favorites}
                loading={false}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onBookClick={handleBookClick}
              />
            )}
          </TabsContent>
        </Tabs>
        </main>

        {/* Book Details Modal */}
        <BookModal
          book={selectedBook}
          open={modalOpen}
          onOpenChange={setModalOpen}
          isFavorite={selectedBook ? isFavorite(selectedBook.key) : false}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
};

export default Index;
