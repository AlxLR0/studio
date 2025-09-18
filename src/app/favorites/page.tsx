import { FavoritesList } from '@/components/favorites-list';

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Favorite Recipes
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Your collection of culinary creations. Revisit your saved recipes anytime.
        </p>
      </div>
      <FavoritesList />
    </div>
  );
}
