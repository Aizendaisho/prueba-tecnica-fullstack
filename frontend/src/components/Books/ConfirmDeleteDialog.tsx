import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
    title: string;
  onConfirm: () => void;
};

export function ConfirmDeleteDialog({ title, onConfirm }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 size={16} className="mr-2" /> Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
    <DialogTitle>¿Eliminar este libro?</DialogTitle>
  </DialogHeader>
  <p className="text-sm text-muted-foreground">
    Estás a punto de eliminar: <strong>{title}</strong>. Esta acción no se puede deshacer.
  </p>
  <DialogFooter className="flex justify-end gap-2 mt-4">
    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={handleDelete}>Sí, eliminar</Button>
  </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
