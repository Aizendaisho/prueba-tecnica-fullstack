import { useEffect, useState } from "react";
import { Book, getBooks, deleteBook } from "@/services/bookService";
import { BookForm } from "@/components/Books/BookForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditBookDialog } from "@/components/Books/EditBookDialog";
import { ConfirmDeleteDialog } from "@/components/Books/ConfirmDeleteDialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PAGE_SIZE = 5;

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = () =>
    getBooks()
      .then((res) => {
        setBooks(res.data);
        setVisibleCount(PAGE_SIZE); // reiniciar visible
      })
      .catch((err) => console.error(err));

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      toast.success("Libro eliminado correctamente");
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar el libro");
    }
  };
  

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Libros</h1>

      <BookForm onSuccess={() => setRefresh(!refresh)} />
      <Input
        placeholder="Buscar por título o descripción..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />


      <div className="grid gap-4 grid-cols-2 ">
        {visibleBooks.map((book) => (
          <Card key={book.id} className="p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-muted-foreground">{book.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="secondary" asChild>
  <a href={`/books/${book.id}`}>Ver detalles</a>
</Button>
              <EditBookDialog
                book={book}
                onUpdated={() => setRefresh(!refresh)}
              />
              <ConfirmDeleteDialog
                title={book.title}
                onConfirm={() => handleDelete(book.id)}
              />
            </div>
          </Card>
        ))}
      </div>

      {visibleCount < filteredBooks.length && (
        <div className="text-center mt-4">
          <Button onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}>
            Cargar más
          </Button>
        </div>
      )}
    </div>
  );
}
