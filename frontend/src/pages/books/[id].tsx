import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book, getBookById } from "@/services/bookService";
import { Author, getAuthors } from "@/services/authorService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const bookRes = await getBookById(Number(id));
        setBook(bookRes.data);

        const authorsRes = await getAuthors();
        const foundAuthor = authorsRes.data.find(
          (a) => a.idBook === bookRes.data.id
        );
        setAuthor(foundAuthor ?? null);
      } catch (err) {
        console.error("Error al cargar el libro:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (!book) {
    return <p className="text-center mt-10 text-red-500">Libro no encontrado.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-6">
      <h1 className="text-2xl font-bold">Detalles del Libro</h1>

      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p className="text-muted-foreground">{book.description}</p>
        </div>

        <div>
          <p><strong>Páginas:</strong> {book.pageCount}</p>
          <p><strong>Extracto:</strong> {book.excerpt}</p>
          <p><strong>Fecha de publicación:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
        </div>

        <div>
          <p><strong>Autor relacionado:</strong> {author ? `${author.firstName} ${author.lastName}` : "Sin autor asignado"}</p>
        </div>

        <Button variant="outline" onClick={() => history.back()}>← Volver</Button>
      </Card>
    </div>
  );
}
