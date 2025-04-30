import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AuthorForm } from "@/components/Authors/AuthorForm";

// Mockear servicios
vi.mock("@/services/authorService", () => ({
  createAuthor: vi.fn(() => Promise.resolve()),
  updateAuthor: vi.fn(() => Promise.resolve()),
}));

describe("AuthorForm", () => {
  it("permite completar y enviar el formulario en modo creación", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    render(<AuthorForm mode="create" onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/id del autor/i), "5");
    await user.type(screen.getByLabelText(/nombre/i), "Gabriel");
    await user.type(screen.getByLabelText(/apellido/i), "García");
    await user.type(screen.getByLabelText(/id del libro/i), "123");

    await user.click(screen.getByRole("button", { name: /crear/i }));

    expect(onSuccess).toHaveBeenCalled();
  });

  it("muestra 'Actualizar' si el formulario está en modo edición", () => {
    render(
      <AuthorForm
        mode="edit"
        defaultValues={{
          id: 1,
          firstName: "Test",
          lastName: "User",
          idBook: 10,
        }}
      />
    );

    expect(screen.getByRole("button", { name: /actualizar/i })).toBeInTheDocument();
  });
});
