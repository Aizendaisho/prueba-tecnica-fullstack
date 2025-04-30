import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, BookFormValues } from "@/lib/bookSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createBook,updateBook } from "@/services/bookService";
import { toast } from "sonner";


type BookFormProps = {
  defaultValues?: Partial<BookFormValues>;
  onSuccess?: () => void;
  mode?: "create" | "edit";
};


export function BookForm({ onSuccess, mode }: BookFormProps) {

  const [submitted, setSubmitted] = useState<BookFormValues | null>(null);
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      setLoading(true);
  
      const fullDate = new Date(data.publishDate).toISOString();
      const payload = { ...data, publishDate: fullDate };
  
      if (mode === "edit") {
        await updateBook(data.id, payload); // ← Esto debe existir
        toast.success("📘 Libro actualizado");
      } else {
        await createBook(payload);
        toast.success("📗 Libro creado");
      }
  
      reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al guardar");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="id">ID</Label>
          <Input id="id" type="number" {...register("id")} />
          {errors.id && <p className="text-sm text-red-500">{errors.id.message}</p>}
        </div>

        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Input id="description" {...register("description")} />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <Label htmlFor="pageCount">Páginas</Label>
          <Input id="pageCount" type="number" {...register("pageCount")} />
          {errors.pageCount && <p className="text-sm text-red-500">{errors.pageCount.message}</p>}
        </div>

        <div>
          <Label htmlFor="excerpt">Extracto</Label>
          <Input id="excerpt" {...register("excerpt")} />
          {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt.message}</p>}
        </div>

        <div>
          <Label htmlFor="publishDate">Fecha de publicación</Label>
          <Input id="publishDate" type="date" {...register("publishDate")} />
          {errors.publishDate && <p className="text-sm text-red-500">{errors.publishDate.message}</p>}
        </div>

        <Button type="submit">Enviar</Button>
      </form>

      {submitted && (
        <div className="p-4 mt-4 border rounded bg-muted">
          <h2 className="font-semibold text-lg mb-2">Libro enviado:</h2>
          <p><strong>ID:</strong> {submitted.id}</p>
          <p><strong>Título:</strong> {submitted.title}</p>
          <p><strong>Descripción:</strong> {submitted.description}</p>
          <p><strong>Páginas:</strong> {submitted.pageCount}</p>
          <p><strong>Extracto:</strong> {submitted.excerpt}</p>
          <p><strong>Publicación:</strong> {submitted.publishDate}</p>
        </div>
      )}
    </div>
  );
}


