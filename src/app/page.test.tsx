/// <reference types="vitest" />
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("muestra el título principal", () => {
    render(<Home />);
    expect(screen.getByText(/Qué aprender ahora/i)).toBeInTheDocument();
  });

  it("muestra al menos 6 cursos", () => {
    render(<Home />);
    const cursos = screen.getAllByText(/Curso de ejemplo/i);
    expect(cursos.length).toBeGreaterThanOrEqual(6);
  });

  it("filtra cursos con el buscador", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/buscar cursos/i);
    fireEvent.change(input, { target: { value: "3" } });
    expect(screen.getByText(/Curso de ejemplo 3/i)).toBeInTheDocument();
  });
});
