import Link from 'next/link';
import { ChefHat, BookHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold text-primary whitespace-nowrap">
            Cookify AI
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav>
            <Button variant="ghost" asChild>
              <Link href="/favorites">
                <BookHeart className="mr-2 h-4 w-4" />
                Favoritos
              </Link>
            </Button>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
