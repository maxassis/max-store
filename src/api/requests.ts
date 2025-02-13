import { Product } from "../Pages/Main.tsx";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/produtos");
  if (!response.ok) {
    throw new Error("Erro ao buscar os produtos");
  }
  return response.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`http://localhost:3000/produtos/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar o produto");
  }
  return response.json();
}

// export async function fetchData<T>(endpoint: string): Promise<T> {
//   const response = await fetch(`http://localhost:3000/${endpoint}`);
//   if (!response.ok) {
//     throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
//   }
//   return response.json();
// }
