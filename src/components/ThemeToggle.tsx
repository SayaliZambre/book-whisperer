import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className="rounded-full bg-card border-border hover:bg-accent transition-all"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-card-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-card-foreground" />
      )}
    </Button>
  );
}
