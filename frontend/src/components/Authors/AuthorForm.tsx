import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthorFormValues, authorSchema } from "@/lib/authorSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createAuthor, updateAuthor } from "@/services/authorService";

type Props = {
  defaultValues?: Partial<AuthorFormValues>;
  onSuccess?: () => void;
  mode?: "create" | "edit";
};

export function AuthorForm({ defaultValues, onSuccess, mode = "create" }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues,
  });

  const onSubmit = async (data: AuthorFormValues) => {
    try {
      setLoading(true);

      if (mode === "edit") {
        await updateAuthor(data.id, { ...data, idBook: data.idBook ?? 0 });
        alert("Autor actualizado");
      } else {
        await createAuthor({ ...data, idBook: data.idBook ?? 0 });
        alert("Autor creado");
      }

      reset();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Error al guardar autor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="id">ID</Label>
        <Input type="number" {...register("id")} />
        {errors.id && <p className="text-sm text-red-500">{errors.id.message}</p>}
      </div>

      <div>
        <Label htmlFor="firstName">Nombre</Label>
        <Input {...register("firstName")} />
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
      </div>

      <div>
        <Label htmlFor="lastName">Apellido</Label>
        <Input {...register("lastName")} />
        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
      </div>

      <div>
      <Label htmlFor="idBook">ID del libro</Label>
<Input type="number" {...register("idBook")} />
{errors.idBook && <p className="text-sm text-red-500">{errors.idBook.message}</p>}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : mode === "edit" ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
}
