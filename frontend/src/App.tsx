import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TestPage from "./pages/TestPage";
import BookDetailPage from "./pages/books/[id]";
import { Toaster } from "sonner";



const BooksPage = lazy(() => import("./pages/BooksPage"));
const AuthorsPage = lazy(() => import("./pages/AuthorsPage"));

function App() {
  return (
    <Router>
      <div className="p-6">
        <nav className="flex gap-4 mb-6">
          <Link to="/books" className="text-blue-600 font-semibold">Libros</Link>
          <Link to="/authors" className="text-green-600 font-semibold">Autores</Link>
          <Link to="/test" className="text-green-600 font-semibold">test</Link>
        </nav>

        <Suspense fallback={<Skeleton className="w-full h-48" />}>
          <Routes>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />


          </Routes>
        </Suspense>
            <Toaster />
      </div>
    </Router>
  );
}

export default App;
