import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";import { Book } from "@/services/bookService";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookForm } from "./BookForm";

type Props = {
  book: Book;
  onUpdated: () => void;
};

export function EditBookDialog({ book, onUpdated }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil size={16} className="mr-2" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
  <DialogTitle>Editar Libro</DialogTitle>
  <BookForm
    defaultValues={book}
    onSuccess={() => {
      onUpdated();
      setOpen(false);
    }}
    mode="edit"
  />
</DialogContent>
    </Dialog>
  );
}
