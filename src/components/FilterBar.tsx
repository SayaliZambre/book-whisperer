import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function FilterBar({ sortBy, onSortChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Sort by:</span>
      </div>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="year-desc">Year (Newest)</SelectItem>
          <SelectItem value="year-asc">Year (Oldest)</SelectItem>
          <SelectItem value="title">Title (A-Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
