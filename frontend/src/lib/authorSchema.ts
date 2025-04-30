import { z } from "zod";

export const authorSchema = z.object({
  id: z.coerce.number().min(1, "ID requerido"),
  firstName: z.string().min(2, "Nombre requerido"),
  lastName: z.string().min(2, "Apellido requerido"),
  idBook: z.coerce.number().optional(), // ← cambiar aquí
});


export type AuthorFormValues = z.infer<typeof authorSchema>;
