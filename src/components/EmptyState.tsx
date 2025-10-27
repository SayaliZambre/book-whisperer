import { BookOpen, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'favorites' | 'no-results';
}

export function EmptyState({ type }: EmptyStateProps) {
  const configs = {
    search: {
      icon: Search,
      title: 'Discover Your Next Great Read',
      description: 'Search millions of books from the Open Library collection',
    },
    favorites: {
      icon: BookOpen,
      title: 'No Favorites Yet',
      description: 'Start adding books to your favorites by clicking the heart icon',
    },
    'no-results': {
      icon: Search,
      title: 'No Books Found',
      description: 'Try adjusting your search query or filters',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-playfair font-semibold mb-2 text-foreground">
        {config.title}
      </h3>
      <p className="text-muted-foreground text-center max-w-md">
        {config.description}
      </p>
    </div>
  );
}
