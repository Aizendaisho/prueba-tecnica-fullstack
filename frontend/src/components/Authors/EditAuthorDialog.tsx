import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Author } from "@/services/authorService";
  import { useState } from "react";
  import { Pencil } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { AuthorForm } from "./AuthorForm";
  
  type Props = {
    author: Author;
    onUpdated: () => void;
  };
  
  export function EditAuthorDialog({ author, onUpdated }: Props) {
    const [open, setOpen] = useState(false);
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil size={16} className="mr-2" /> Editar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Editar Autor</DialogTitle>
          <AuthorForm
            defaultValues={author}
            mode="edit"
            onSuccess={() => {
              onUpdated();
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
  