import { useEffect, useState } from "react";
import { Author, getAuthors, deleteAuthor } from "@/services/authorService";
import { Book, getBooks } from "@/services/bookService";
import { AuthorForm } from "@/components/Authors/AuthorForm";
import { EditAuthorDialog } from "@/components/Authors/EditAuthorDialog";
import { ConfirmDeleteDialog } from "@/components/Books/ConfirmDeleteDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 5;

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fetchData = async () => {
    try {
      const authorsRes = await getAuthors();
      const booksRes = await getBooks();

      setAuthors(authorsRes.data);
      setBooks(booksRes.data);
      setVisibleCount(PAGE_SIZE);
    } catch (error) {
      console.error("Error al cargar autores o libros", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    await deleteAuthor(id);
    setRefresh(!refresh);
  };

  const filteredAuthors = authors.filter((author) =>
    `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleAuthors = filteredAuthors.slice(0, visibleCount);

  const getBooksCountForAuthor = (authorId: number) => {
    return books.filter((book) => book.id === authorId).length;
  };
  

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Autores</h1>

      <Input
        placeholder="Buscar autor por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <AuthorForm onSuccess={() => setRefresh(!refresh)} />

      <div className="grid gap-4 grid-cols-2">
        {visibleAuthors.map((author) => (
          <Card key={author.id} className="p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {author.firstName} {author.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">
                Libros publicados: {getBooksCountForAuthor(author.id)}
              </p>
            </div>
            <div className="flex gap-2">
              <EditAuthorDialog
                author={author}
                onUpdated={() => setRefresh(!refresh)}
              />
              <ConfirmDeleteDialog
                title={`${author.firstName} ${author.lastName}`}
                onConfirm={() => handleDelete(author.id)}
              />
            </div>
          </Card>
        ))}
      </div>

      {visibleCount < filteredAuthors.length && (
        <div className="text-center mt-4">
          <Button onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}>
            Cargar más
          </Button>
        </div>
      )}
    </div>
  );
}
