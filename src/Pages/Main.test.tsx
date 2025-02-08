import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./Main";

// Criamos um QueryClient para os testes
const queryClient = new QueryClient();

describe("Main Component", () => {
  it("renders the title 'Max Store' correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    );

    // Verifica se o texto "Max Store" está presente na tela
    const titleElement = screen.getByText(/Max Store/i);
    expect(titleElement).toBeInTheDocument();
  });
});
