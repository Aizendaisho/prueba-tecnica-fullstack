import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testSchema, TestFormValues } from "@/lib/testFormSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function TestForm() {
  const [submitted, setSubmitted] = useState<TestFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
  });

  const onSubmit = (data: TestFormValues) => {
    setSubmitted(data);
    reset();
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="age">Edad</Label>
          <Input id="age" type="number" {...register("age")} />
          {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
        </div>

        <div>
          <Label htmlFor="salary">Salario</Label>
          <Input id="salary" type="number" {...register("salary")} />
          {errors.salary && <p className="text-sm text-red-500">{errors.salary.message}</p>}
        </div>

        <Button type="submit">Enviar</Button>
      </form>

      {submitted && (
        <div className="p-4 mt-4 border rounded bg-muted">
          <h2 className="font-semibold text-lg mb-2">Datos enviados:</h2>
          <p><strong>Nombre:</strong> {submitted.name}</p>
          <p><strong>Edad:</strong> {submitted.age}</p>
          <p><strong>Salario:</strong> ${submitted.salary}</p>
        </div>
      )}
    </div>
  );
}
