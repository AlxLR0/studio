'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  ingredients: z.string().min(3, {
    message: 'Por favor, introduce al menos un ingrediente.',
  }),
});

type IngredientFormProps = {
  onSubmit: (ingredients: string) => void;
  loading: boolean;
};

export function IngredientForm({ onSubmit, loading }: IngredientFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: '',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.ingredients);
  }

  return (
    <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Introduce tus Ingredientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="ej: pechuga de pollo, brócoli, ajo, aceite de oliva"
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              <Sparkles className="mr-2" />
              {loading ? 'Generando...' : 'Generar Receta'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
