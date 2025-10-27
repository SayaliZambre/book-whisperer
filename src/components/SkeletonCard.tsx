import { Card, CardContent } from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <div className="relative aspect-[2/3] bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" />
      <CardContent className="p-4 space-y-2">
        <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded" />
        <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded w-2/3" />
        <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded w-1/3" />
      </CardContent>
    </Card>
  );
}
