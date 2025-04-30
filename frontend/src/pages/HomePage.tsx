import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <Card className="p-8 max-w-xl space-y-4">
        <h1 className="text-3xl font-bold">📚 Bienvenido</h1>
        <p className="text-muted-foreground">
          Esta es una aplicación para gestionar libros y autores. Puedes ver, agregar, editar o eliminar datos desde las secciones correspondientes.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/books">
              <BookOpen size={16} className="mr-2" />
              Ver Libros
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/authors">
              <UserRound size={16} className="mr-2" />
              Ver Autores
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
