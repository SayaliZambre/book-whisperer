import { Heart } from 'lucide-react';
import { Book } from '@/hooks/useFavorites';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

export function BookCard({ book, isFavorite, onToggleFavorite, onClick }: BookCardProps) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <Card className="group cursor-pointer overflow-hidden border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in bg-card">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted" onClick={onClick}>
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <p className="text-muted-foreground text-sm font-medium px-4 text-center">
              No cover available
            </p>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavorite ? 'fill-accent text-accent' : 'text-foreground'
            }`}
          />
        </Button>
      </div>
      <CardContent className="p-4" onClick={onClick}>
        <h3 className="font-playfair font-semibold text-base line-clamp-2 mb-1 text-card-foreground">
          {book.title}
        </h3>
        {book.author_name && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {book.author_name[0]}
          </p>
        )}
        {book.first_publish_year && (
          <p className="text-xs text-muted-foreground mt-1">
            {book.first_publish_year}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
