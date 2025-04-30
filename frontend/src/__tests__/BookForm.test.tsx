import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookForm } from "@/components/Books/BookForm";
import { vi } from "vitest";

// Mock del servicio (si lo estás usando directamente en el formulario)
vi.mock("@/services/bookService", () => ({
  createBook: vi.fn(() => Promise.resolve()),
  updateBook: vi.fn(() => Promise.resolve()),
}));

describe("BookForm", () => {
  it("permite completar y enviar el formulario de creación", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    render(<BookForm mode="create" onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/ID/i), "1");
    await user.type(screen.getByLabelText(/Título/i), "El Principito");
    await user.type(screen.getByLabelText(/Descripción/i), "Un cuento filosófico");
    await user.type(screen.getByLabelText(/Páginas/i), "96");
    await user.type(screen.getByLabelText(/Extracto/i), "Érase una vez...");
    await user.type(screen.getByLabelText(/Fecha de publicación/i), "1943-04-06");

    await user.click(screen.getByRole("button", { name: /crear/i }));

    // Esperamos a que termine la acción
    expect(onSuccess).toHaveBeenCalled();
  });
});
