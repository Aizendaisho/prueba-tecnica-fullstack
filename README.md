# 🧪 Prueba Técnica Full Stack — .NET 8 + React + Tailwind

Este proyecto es una aplicación full stack que permite gestionar libros y autores utilizando una API REST intermedia desarrollada en .NET 8 y un frontend moderno en React 18 + Tailwind. Cumple con los requerimientos establecidos para una prueba técnica profesional.

---

## 🚀 Tecnologías utilizadas

### Backend (.NET 8)
- ASP.NET Core Web API
- Clean Architecture
- HttpClient (para consumo de FakeRestAPI)
- Swagger (OpenAPI)

### Frontend (React + Vite)
- React 18 + TypeScript
- TailwindCSS
- shadcn/ui
- Axios
- React Hook Form + Zod
- React Router DOM + Lazy Loading
- Toasts con sonner
- Vite
- Vitest + React Testing Library + jsdom

### Utilidades del Monorepo
- `concurrently` para correr frontend y backend al mismo tiempo

---

## 📁 Estructura del Monorepo

```
Prueba_tecnica/
├── backend/         # API REST en .NET 8 (Clean Architecture)
│   ├── API/
│   ├── Application/
│   ├── Domain/
│   └── Infrastructure/
│   └── CleanArchitectureApi.sln
├── frontend/        # React + Tailwind + shadcn/ui
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── lib/validations.ts
│   │   └── __tests__/  # pruebas unitarias
│   └── vitest.config.ts
├── package.json     # Scripts globales (concurrently)
├── .gitignore
└── README.md
```

---

## 📦 Requisitos previos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Node.js 18+ y npm
- Git

---

## ▶️ Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/Aizendaisho/prueba-tecnica-fullstack.git
cd prueba-tecnica-fullstack
```

2. Instala dependencias del frontend:

```bash
cd frontend
npm install
cd ..
```

3. Instala dependencias raíz (incluyendo concurrently):

```bash
npm install
```

4. Ejecuta el proyecto completo (frontend + backend):

```bash
npm run dev
```

- 📘 Backend: [https://localhost:7249/swagger](https://localhost:7249/swagger)
- 🌐 Frontend: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Cómo ejecutar las pruebas del frontend

Desde la carpeta `frontend`, ejecuta:

```bash
npm run test
```

Esto utiliza `vitest`, `@testing-library/react` y `jsdom` para pruebas unitarias.

Puedes encontrar ejemplos en:
- `src/__tests__/HomePage.test.tsx`
- `src/__tests__/BookForm.test.tsx`
- `src/__tests__/AuthorForm.test.tsx`

---

## 📌 Funcionalidades principales

### 📚 Libros
- Crear, listar, editar y eliminar libros
- Buscar libros por título o descripción
- Lazy loading (5 en 5)
- Página de detalle del libro con autor relacionado
- Validaciones con Zod centralizadas en `lib/validations.ts`
- Toasts para éxito/error con `sonner`
- Diálogos de confirmación al eliminar

### 👤 Autores
- Crear, listar, editar y eliminar autores
- Buscar autores por nombre
- Mostrar cantidad de libros publicados por autor
- Lazy loading (5 en 5)
- Toasts para éxito/error
- Diálogos de confirmación al eliminar

---

## 🔗 API externa usada

Este proyecto consume como fuente de datos la [FakeRestAPI](https://fakerestapi.azurewebsites.net/). Los datos no se persisten realmente.

---

## ✅ Requerimientos cumplidos

✔ React 18 + Tailwind + shadcn/ui  
✔ Clean Architecture en backend .NET 8  
✔ CRUD de libros y autores  
✔ Página de detalle del libro con autor  
✔ Lazy loading y búsqueda  
✔ Toasts de notificación  
✔ Sin uso de base de datos real (proxy HTTP)  
✔ Monorepo estructurado con concurrently  
✔ README y .gitignore configurados  
✔ Subido a GitHub públicamente  
✔ Pruebas unitarias con Vitest (HomePage, BookForm, AuthorForm)  
✔ Validaciones centralizadas en un único archivo  
✔ Diálogo dinámico para editar y eliminar  
✔ Página de bienvenida por defecto  

---

## 🧑‍💻 Autor

Desarrollado por Araldi Ulises Garcia Feliz (https://github.com/Aizendaisho) — Full Stack Developer.
