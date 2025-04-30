import { z } from "zod";

export const bookSchema = z.object({
  id: z.coerce.number().min(1, "ID requerido"),
  title: z.string().min(3, "El título es muy corto"),
  description: z.string().min(10, "La descripción es muy corta"),
  pageCount: z.coerce.number().min(1, "Debe tener al menos una página"),
  excerpt: z.string().min(5, "El extracto es muy corto"),
  publishDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Fecha inválida",
    }),
});

export type BookFormValues = z.infer<typeof bookSchema>;
