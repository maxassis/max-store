// src/Pages/Main.test.tsx
import { screen } from "@testing-library/react";
import Main from "./Main";
import { renderWithProviders } from "../test-utils"; // Importa a função auxiliar

describe("Main Component", () => {
  it("renders the title 'Max Store' correctly", () => {
    // Renderiza o componente Main com o QueryClientProvider
    renderWithProviders(<Main />);

    // Verifica se o texto "Max Store" está presente na tela
    const titleElement = screen.getByText(/Max Store/i);
    expect(titleElement).toBeInTheDocument();
  });
});
