import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom"; // ✅ Importando MemoryRouter
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Main from "./Main";

vi.mock("../components/CarrinhoBtn.tsx", () => ({
  default: () => <button data-testid="carrinho-btn">Carrinho</button>,
}));

global.fetch = vi.fn();

let queryClient: QueryClient;

describe("Main Component", () => {
  beforeEach(() => {
    queryClient = new QueryClient(); // Criar novo QueryClient antes de cada teste
  });

  afterEach(() => {
    vi.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it("renders the title 'Max Store' correctly", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const titleElement = screen.getByText(/Max Store/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the CarrinhoBtn component", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const carrinhoBtn = screen.getByTestId("carrinho-btn");
    expect(carrinhoBtn).toBeInTheDocument();
  });

  it("renders products when data is fetched successfully", async () => {
    // Mock da resposta da API
    const mockProducts = [
      {
        _id: "1",
        name: "Product 1",
        price: 100,
        image: "image1.jpg",
        description: "Description 1",
        stock: 10,
      },
      {
        _id: "2",
        name: "Product 2",
        price: 200,
        image: "image2.jpg",
        description: "Description 2",
        stock: 5,
      },
    ];

    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      mockProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });
});
