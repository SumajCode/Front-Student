# Sumaj Code

**Sumaj Code** es una plataforma educativa diseñada para facilitar el aprendizaje de programación en **Python** mediante métodos didácticos interactivos. Nuestro enfoque combina teoría, práctica y simulación para proporcionar una experiencia de aprendizaje que se adapta al ritmo de cada estudiante, permitiéndole avanzar en su proceso de aprendizaje de manera flexible y a su propio tiempo, según su disponibilidad y comodidad

## Features

- **Selección de módulos visual y accesible:**
La página de inicio presenta una interfaz clara e intuitiva donde los usuarios pueden explorar y seleccionar los diferentes módulos de aprendizaje disponibles.
- **Chat tipo foro integrado:**
Un espacio comunitario estilo foro donde estudiantes pueden plantear dudas, compartir conocimientos, comentar lecciones y colaborar con otros aprendices. Este foro fomenta el aprendizaje colaborativo y construye una comunidad activa en torno al contenido.
- **Área de lecciones multimedia:**
Las lecciones están compuestas por diferentes formatos de contenido para adaptarse a distintos estilos de aprendizaje:

🖼️ Imágenes ilustrativas que explican visualmente conceptos clave.

📄 Documentos PDF detallados con teoría, ejemplos y actividades.

🎥 Videos explicativos diseñados para explicar temas paso a paso.
- **Compilador de código en línea:**
Un entorno interactivo de codificación directamente en la plataforma, que permite al usuario:

Escribir y ejecutar código Python en tiempo real.

Recibir resultados inmediatos y mensajes de error claros.

Probar ejemplos presentados en las lecciones.

Guardar o comparar versiones de su código, si se habilita.

---

#Deploy
```bash
https://front-student-git-main-mortalwings-projects.vercel.app/
```

---

#tablero de tareas
```bash
https://trello.com/invite/b/681611d3e42ca4d38256bc70/ATTIee97f90887527b6624129cc054cccf5f75A69B1D/plataorm-for-pograming-gensoft
```

---

# Sumaj Code - Frontend

Este es el frontend del proyecto **Sumaj Code**, construido con:

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Turbopack](https://turbo.build/pack) para desarrollo más rápido

---

## Requisitos previos

- Node.js **v18 o superior**
- npm o yarn

Verifica tu versión de Node.js:

```bash
node -v
```
## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/SumajCode/Front-Student.git
cd Front-Student
```

2. Instala las dependencias:
```bash
  npm install
```

en caso de errores de punteros:
```bash
  npm install autoprefixer
  npm install -D tailwindcss postcss autoprefixer
```

Este proyecto utiliza Turbopack para un desarrollo más veloz.

```bash
  npm run dev

```

---

# Test

instalar dependencias
```bash
  npm install --save-dev babel-jest@^29.7.0
  npm install --save-dev @babel/preset-typescript
  npm install --save-dev jest-environment-jsdom
```

correr test
```bash
  npx jest
```

---

# Estructura del proyecto

descripcion de carpetas

```bash
Dashboard: Muestra cursos, módulos y contenidos del usuario. Navegación al viewer de cada contenido.

Viewer: Panel lateral con módulos y contenidos, mostrando detalles técnicos (puntos, reglas, funciones requeridas, etc).

UI: Componentes reutilizables para botones, tarjetas, diálogos, menús, inputs, iconos, etc.

Layout global: Componentes de navegación, menús, footer, user menu, etc.

Hooks personalizados: Para navegación, almacenamiento local, temas, etc.

Servicios de API: Encapsulan llamadas a microservicios docentes. Testing: Configuración con Jest y Testing Library. Tests ubicados en src/app/_tests_/ y subcarpetas.
```

division de carpetas

```bash
Front-Student/
├── src/
│   ├── app/
│   │   ├── learning/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── viewer/
│   │   │       └── layout.tsx, page.tsx, [moduleId]/
│   ├── modules/
│   │   └── learning/
│   │       └── components/
│   │           ├── dashboard/
│   │           │   └── CourseDashboard.tsx
│   │           └── viewer/
│   │               ├── ModuleList.tsx
│   │               └── NavigationButton.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── hover-card.tsx
│   │   ├── icons.tsx
│   │   ├── input.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   └── theme-provider.tsx
│   ├── globals/
│   │   ├── hooks/
│   │   └── layout/
│   │       ├── Footer.tsx
│   │       ├── Head.tsx
│   │       ├── components/
│   │       │   ├── AuthButtons.tsx
│   │       │   ├── MobileMenu.tsx
│   │       │   ├── MobileNavMenu.tsx
│   │       │   ├── Navigation.tsx
│   │       │   ├── NotificationsButton.tsx
│   │       │   └── UserMenu.tsx
│   │       ├── footer/
│   │       │   ├── FooterCopyright.tsx
│   │       │   └── FooterLogo.tsx
│   │       └── head/
│   │           ├── AuthButtons.tsx
│   │           ├── MobileMenu.tsx
│   │           ├── Navigation.tsx
│   │           └── NotificationsButton.tsx
│   └── lib/
│       └── api-service.ts, gateway-service.ts, ...
├── public/
├── package.json
├── jest.config.js
├── tailwind.config.js
└── ...
```

---

## Configuración de Desarrollo

### Importaciones de React en Archivos JSX/TSX

Esta aplicación requiere importar React explícitamente en todos los archivos que usan JSX o TSX. Esto es obligatorio para garantizar la compatibilidad entre diferentes entornos de desarrollo.

```jsx
// Forma correcta
import React from "react";

export function MyComponent() {
  return <div>Hello world</div>;
}
```

Se ha configurado ESLint para detectar y marcar como error la falta de importación de React. Para verificar o corregir automáticamente los archivos:

```bash
# Verificar si hay archivos sin la importación de React
npm run check-imports

# Corregir automáticamente los archivos (añadir las importaciones faltantes)
npm run lint:fix
```

### Linting y Formateo

- Utilizamos ESLint para mantener la consistencia y calidad del código
- Las reglas principales están configuradas en `.eslintrc.js`
- Para ejecutar las verificaciones manualmente: `npm run lint`

---

## Puerto de desarrollo fijo

Por defecto, este proyecto usará siempre el puerto **3004** para el servidor de desarrollo.

1. Crea (o edita) el archivo `.env.local` en la raíz del proyecto y agrega:

```
PORT=3004
```

2. Guarda el archivo y ejecuta:

```bash
npm run dev
```

El servidor Next.js arrancará siempre en http://localhost:3004 (si el puerto está libre).

---

## Variables de entorno

Después de clonar el repositorio, copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Luego, ajusta los valores si es necesario (por ejemplo, el puerto o las URLs de las APIs).
