export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(
    `https://max-store-backend.onrender.com/${endpoint}`
  );
  if (!response.ok) {
    throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
  }
  return response.json();
}
