'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, Utensils, HeartPulse, ChefHat, Flame, CookingPot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from './ui/separator';
import React from 'react';

const formSchema = z.object({
  ingredients: z.string().min(3, {
    message: 'Por favor, introduce al menos tres caracteres.',
  }),
  restrictions: z.array(z.string()),
  style: z.string().default('casera'),
  specialConditions: z.array(z.string()).default(['ninguna']),
  flavor: z.string().default('normal'),
  devices: z.array(z.string()).default(['Estufa']),
});

export type RecipePreferences = Omit<z.infer<typeof formSchema>, 'ingredients'>;

type PreferencesFormProps = {
  onSubmit: (ingredients: string, preferences: RecipePreferences) => void;
  loading: boolean;
};

const restrictionOptions = [
  { id: 'sin picante', label: 'Sin Picante' },
  { id: 'sin aceites', label: 'Sin Aceites' },
  { id: 'sin frituras', label: 'Sin Frituras' },
  { id: 'bajo en carbohidratos', label: 'Bajo en Carbohidratos' },
  { id: 'sin lácteos', label: 'Sin Lácteos' },
  { id: 'sin gluten', label: 'Sin Gluten' },
];

const specialConditionOptions = [
  { id: 'ninguna', label: 'Ninguna' },
  { id: 'gastritis', label: 'Gastritis' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'hipertensión', label: 'Hipertensión' },
  { id: 'aumentar masa muscular', label: 'Aumentar Masa Muscular' },
  { id: 'bajar de peso', label: 'Bajar de Peso' },
  { id: 'apta para niños', label: 'Apta para Niños' },
];

const deviceOptions = [
  { id: 'Estufa', label: 'Estufa' },
  { id: 'Horno', label: 'Horno' },
  { id: 'Freidora de aire', label: 'Freidora de aire' },
  { id: 'Microondas', label: 'Microondas' },
  { id: 'Olla de presión', label: 'Olla de presión' },
  { id: 'Parrilla', label: 'Parrilla' },
  { id: 'Vaporera', label: 'Vaporera' },
];

export function PreferencesForm({ onSubmit, loading }: PreferencesFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: '',
      restrictions: [],
      style: 'casera',
      specialConditions: ['ninguna'],
      flavor: 'normal',
      devices: ['Estufa'],
    },
  });

  const specialConditions = form.watch('specialConditions');

  React.useEffect(() => {
    const lastSelected = specialConditions[specialConditions.length - 1];
    if (lastSelected === 'ninguna' && specialConditions.length > 1) {
      form.setValue('specialConditions', ['ninguna']);
    } else if (lastSelected !== 'ninguna' && specialConditions.includes('ninguna')) {
      form.setValue('specialConditions', specialConditions.filter(c => c !== 'ninguna'));
    }
    if (specialConditions.length === 0) {
      form.setValue('specialConditions', ['ninguna']);
    }
  }, [specialConditions, form]);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    const { ingredients, ...preferences } = values;
    onSubmit(ingredients, preferences);
  }

  return (
    <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2"><Utensils /> Ingredientes y Preferencias</CardTitle>
            <CardDescription>Dinos qué tienes y cómo te gusta comer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Ingredientes en tu despensa</FormLabel>
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

            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <FormLabel className="font-semibold flex items-center gap-2"><ChefHat /> Estilo de Receta</FormLabel>
                <Controller
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                      {['casera', 'gourmet', 'saludable/fit', 'rápida y sencilla'].map(value => (
                        <FormItem key={value} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={value} id={`style-${value}`} />
                          </FormControl>
                          <FormLabel htmlFor={`style-${value}`} className="font-normal capitalize cursor-pointer">{value.replace(/-/g, ' ')}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormLabel className="font-semibold flex items-center gap-2"><Flame /> Preferencia de Sabor</FormLabel>
                <Controller
                  control={form.control}
                  name="flavor"
                  render={({ field }) => (
                     <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                       {['normal', 'más especias', 'más suave', 'con aderezos', 'sin condimentos'].map(value => (
                        <FormItem key={value} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={value} id={`flavor-${value}`} />
                          </FormControl>
                          <FormLabel htmlFor={`flavor-${value}`} className="font-normal capitalize cursor-pointer">{value}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
            
            <Separator />

            <div className="space-y-4">
               <FormLabel className="font-semibold flex items-center gap-2"><HeartPulse /> Salud y Dietas Especiales</FormLabel>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specialConditionOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="specialConditions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </div>
            
            <Separator />

            <div className="space-y-4">
              <FormLabel className="font-semibold">Restricciones Alimenticias</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restrictionOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="restrictions"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.id])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <FormLabel className="font-semibold flex items-center gap-2"><CookingPot /> Dispositivos disponibles para cocinar</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deviceOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="devices"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </div>
            
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              <Sparkles className="mr-2" />
              {loading ? 'Cocinando tu idea...' : 'Generar Receta Personalizada'}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
