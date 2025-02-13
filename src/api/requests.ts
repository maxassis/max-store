import { Product } from "../Pages/Main.tsx";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/produtos");
  if (!response.ok) {
    throw new Error("Erro ao buscar os produtos");
  }
  return response.json();
}
