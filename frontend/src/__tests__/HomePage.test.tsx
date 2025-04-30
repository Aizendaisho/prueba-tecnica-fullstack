import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";

describe("HomePage", () => {
  it("muestra el título de bienvenida", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/bienvenido/i)).toBeInTheDocument();
  });

  it("muestra los botones para navegar a libros y autores", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /ver libros/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver autores/i })).toBeInTheDocument();
  });
});
