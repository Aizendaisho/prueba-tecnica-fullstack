import { z } from "zod";

export const testSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  age: z.coerce.number().min(18, "Debes tener al menos 18 años"),
  salary: z.coerce.number().min(0, "El salario debe ser positivo"),
});

export type TestFormValues = z.infer<typeof testSchema>;
