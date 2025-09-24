'use client';

import { useRef } from 'react';
import { Heart, Apple, ListChecks, Flame, Clock, BarChart3, Download, Copy } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import type { Recipe } from '@/lib/types';
import { useFavorites } from '@/hooks/use-favorites';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type RecipeDisplayProps = {
  recipe: Recipe;
};

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const isRecipeFavorite = isFavorite(recipe.id);
  const recipeContentRef = useRef<HTMLDivElement>(null);

  const handleFavoriteToggle = () => {
    if (isRecipeFavorite) {
      removeFavorite(recipe.id);
      toast({
        title: 'Quitado de favoritos',
        description: `"${recipe.recipeName}" ya no está en tus favoritos.`,
      });
    } else {
      addFavorite(recipe);
      toast({
        title: '¡Guardado en favoritos!',
        description: `"${recipe.recipeName}" se ha añadido a tu colección.`,
      });
    }
  };

  const getInstructions = (instructions: string) => {
    const byNewline = instructions.split('\n').filter(step => step.trim());
    if (byNewline.length > 1) {
      return byNewline;
    }
    const byNumber = instructions.split(/(?=\d+\.\s)/).filter(step => step.trim());
    if (byNumber.length > 1) {
      return byNumber;
    }
    return [instructions];
  };

  const instructions = getInstructions(recipe.instructions);

  const handleCopyToClipboard = () => {
    const recipeText = `
### ${recipe.recipeName} ###

✨ **Ingredientes** ✨
${recipe.ingredients.map(ingredient => `- ${ingredient}`).join('\n')}

🍲 **Preparación** 🍲
${instructions.map((step, index) => `${index + 1}. ${step.replace(/^\d+\.\s*/, '')}`).join('\n')}

💚 **Nota de Salud** 💚
${recipe.healthNote}
    `.trim();

    navigator.clipboard.writeText(recipeText).then(() => {
      toast({
        title: '✅ Receta copiada al portapapeles',
      });
    });
  };

  const handleDownloadPdf = () => {
    const input = recipeContentRef.current;
    if (!input) return;

    html2canvas(input, {
      scale: 2, // Aumenta la resolución de la captura
      backgroundColor: null, // Mantiene el fondo original
      onclone: (document) => {
        // Asegura que en el clon para el PDF el fondo sea blanco y texto negro
        const clonedElement = document.getElementById(input.id);
        if (clonedElement) {
            clonedElement.style.backgroundColor = 'white';
            Array.from(clonedElement.getElementsByTagName('*')).forEach(el => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.color = 'black';
            });
        }
      }
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      let position = 0;
      let heightLeft = height;

      pdf.addImage(imgData, 'PNG', 0, position, width, height);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - height;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, width, height);
        heightLeft -= pdfHeight;
      }
      
      const fileName = `Receta-${recipe.recipeName.replace(/\s+/g, '-')}.pdf`;
      pdf.save(fileName);
    });
  };

  return (
    <Card id="recipe-card" className="w-full animate-in fade-in-50 duration-500 overflow-hidden border-primary/20 shadow-lg bg-card/80 backdrop-blur-sm">
      <div ref={recipeContentRef} id="recipe-content-for-pdf">
        <CardHeader className="bg-primary/5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="font-headline text-2xl md:text-3xl text-primary">{recipe.recipeName}</CardTitle>
              <CardDescription className="mt-2">Una receta única generada especialmente para ti.</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteToggle}
              aria-label={isRecipeFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              className="shrink-0 text-muted-foreground hover:text-red-500 print-hidden"
            >
              <Heart className={isRecipeFavorite ? 'fill-red-500 text-red-500' : ''} />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{recipe.prepTime}</span>
            </Badge>
            <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium capitalize">{recipe.difficulty}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <div>
            <h3 className="flex items-center gap-2 font-headline text-xl font-semibold">
              <ListChecks className="text-primary" />
              ✨ Ingredientes ✨
            </h3>
            <Separator className="my-3" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary pt-1">&#x2713;</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-headline text-xl font-semibold">
              <Flame className="text-primary" />
              🍲 Preparación 🍲
            </h3>
            <Separator className="my-3" />
            <div className="prose prose-p:my-2 prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-5 space-y-3 text-foreground/90 dark:prose-invert">
              {instructions.map((step, index) => (
                  <p key={index} className="flex items-start gap-3">
                    <span className="font-bold text-primary">{index + 1}.</span>
                    <span>{step.replace(/^\d+\.\s*/, '')}</span>
                  </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-headline text-xl font-semibold">
              <Apple className="text-primary" />
              💚 Nota de Salud 💚
            </h3>
            <Separator className="my-3" />
            <p className="italic text-foreground/80">{recipe.healthNote}</p>
          </div>
        </CardContent>
      </div>
      <CardFooter className="bg-primary/5 p-6 flex-col sm:flex-row gap-4 justify-center print-hidden">
        <Button onClick={handleDownloadPdf} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Descargar en PDF
        </Button>
        <Button onClick={handleCopyToClipboard}>
          <Copy className="mr-2 h-4 w-4" />
          Copiar receta
        </Button>
      </CardFooter>
    </Card>
  );
}
