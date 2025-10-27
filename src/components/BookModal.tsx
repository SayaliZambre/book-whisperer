import { Book } from '@/hooks/useFavorites';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, BookOpen, User, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BookModalProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function BookModal({
  book,
  open,
  onOpenChange,
  isFavorite,
  onToggleFavorite,
}: BookModalProps) {
  if (!book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl md:text-3xl pr-8 text-card-foreground">
            {book.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-[300px_1fr] gap-6 mt-4">
          <div className="space-y-4">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted shadow-medium">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <p className="text-muted-foreground text-sm font-medium px-4 text-center">
                    No cover available
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={onToggleFavorite}
              variant={isFavorite ? "default" : "outline"}
              className="w-full"
            >
              <Heart
                className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`}
              />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>

          <div className="space-y-6">
            {book.author_name && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Author(s)</p>
                  <p className="text-base text-card-foreground">{book.author_name.join(', ')}</p>
                </div>
              </div>
            )}

            {book.first_publish_year && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">First Published</p>
                  <p className="text-base text-card-foreground">{book.first_publish_year}</p>
                </div>
              </div>
            )}

            {book.edition_count && (
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Editions</p>
                  <p className="text-base text-card-foreground">{book.edition_count} edition(s)</p>
                </div>
              </div>
            )}

            {book.publisher && book.publisher.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Publishers</p>
                <p className="text-sm text-card-foreground">
                  {book.publisher.slice(0, 3).join(', ')}
                  {book.publisher.length > 3 && ` and ${book.publisher.length - 3} more`}
                </p>
              </div>
            )}

            {book.subject && book.subject.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {book.subject.slice(0, 10).map((subject, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {subject}
                    </Badge>
                  ))}
                  {book.subject.length > 10 && (
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      +{book.subject.length - 10} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => window.open(`https://openlibrary.org${book.key}`, '_blank')}
            >
              View on Open Library
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
