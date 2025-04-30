import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthorFormValues, authorSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createAuthor, updateAuthor } from "@/services/authorService";
import { toast } from "sonner";

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
        toast.success("Autor actualizado");
      } else {
        await createAuthor({ ...data, idBook: data.idBook ?? 0 });
        toast.success("Autor creado");
      }

      reset();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar autor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
<div>
<Label htmlFor="id">ID del autor</Label>
<Input id="id" type="number" {...register("id")} />
</div>


<div>
  <Label htmlFor="firstName">Nombre</Label>
  <Input id="firstName" {...register("firstName")} />
</div>

<div>
  <Label htmlFor="lastName">Apellido</Label>
  <Input id="lastName" {...register("lastName")} />
</div>

<div>
<Label htmlFor="idBook">ID del libro</Label>
<Input id="idBook" type="number" {...register("idBook")} />
</div>


      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : mode === "edit" ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
}
