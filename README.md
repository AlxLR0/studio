# 🍳 Cookify AI - Tu Asistente de Cocina Inteligente

![Cookify AI Hero](https://picsum.photos/seed/comida-preparada/1200/600)

**Cookify AI** es una aplicación web innovadora diseñada para transformar tu experiencia en la cocina. ¿Tienes ingredientes en tu refri y no sabes qué preparar? ¡No hay problema! Simplemente introduce los ingredientes que tienes a la mano, ajusta tus preferencias, y deja que nuestra inteligencia artificial cree una receta única, deliciosa y personalizada para ti.

Este proyecto fue desarrollado con Next.js, React y Genkit, y está diseñado para ser una herramienta práctica y divertida tanto para chefs experimentados como para principiantes.

---

## 🔥 Características Principales

-   **Generación de Recetas con IA:** Utiliza un modelo de lenguaje avanzado para crear recetas coherentes y creativas a partir de una lista de ingredientes.
-   **Personalización Extrema:** Ajusta la receta a tu gusto con un formulario de preferencias completo:
    -   **Estilo de Cocina:** Elige entre `Casera`, `Gourmet`, `Saludable/Fit` o `Rápida y sencilla`.
    -   **Preferencia de Sabor:** Desde `Más especias` hasta `Suave` o `Sin condimentos`.
    -   **Condiciones de Salud:** Recetas adaptadas para `Gastritis`, `Diabetes`, `Hipertensión`, y más.
    -   **Restricciones Alimenticias:** Filtra por `Sin gluten`, `Sin lácteos`, `Bajo en carbohidratos`, etc.
    -   **Dispositivos de Cocina:** La IA prioriza los electrodomésticos que tienes, como `Freidora de aire`, `Horno` o `Vaporera`.
-   **Instrucciones Claras:** Cada receta incluye una lista de ingredientes con cantidades aproximadas, instrucciones paso a paso, tiempo de preparación y nivel de dificultad.
-   **Guardado de Favoritos:** ¿Te encantó una receta? Guárdala en tus favoritos para acceder a ella fácilmente en cualquier momento. Los favoritos se almacenan localmente en tu navegador.
-   **Diseño Moderno y Responsivo:** Una interfaz limpia y atractiva construida con **shadcn/ui** y **Tailwind CSS**, totalmente adaptable a dispositivos móviles y de escritorio.
-   **Modo Claro y Oscuro:** Cambia entre temas para una experiencia visual más cómoda.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido con un stack de tecnologías moderno y robusto:

-   **Framework:** [Next.js](https://nextjs.org/) (con App Router)
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
-   **Inteligencia Artificial:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
-   **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 🚀 Cómo Empezar

Para correr este proyecto en tu entorno de desarrollo local, sigue estos sencillos pasos:

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) en tu sistema.

### 1. Clona el Repositorio

```bash
git clone https://github.com/tu-usuario/cookify-ai.git
cd cookify-ai
```

### 2. Instala las Dependencias

El proyecto usa `npm` para gestionar los paquetes. Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

### 3. Configura las Variables de Entorno

Para que la inteligencia artificial funcione, necesitas una API Key de Google AI.

1.  Crea un archivo llamado `.env` en la raíz del proyecto.
2.  Añade tu API key de la siguiente manera:

    ```env
    GEMINI_API_KEY=TU_API_KEY_DE_GOOGLE_AI
    ```

### 4. Ejecuta el Servidor de Desarrollo

Una vez instaladas las dependencias y configuradas las variables de entorno, puedes iniciar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:9002](http://localhost:9002).

¡Y listo! Ya puedes empezar a generar tus propias recetas con la ayuda de Cookify AI.

---

¡Gracias por visitar el repositorio! Si tienes alguna idea o sugerencia, no dudes en abrir un *issue* o un *pull request*.
