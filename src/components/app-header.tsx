import Link from 'next/link';
import { ChefHat, BookHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">
            Herbology AI
          </span>
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/favorites">
              <BookHeart className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
