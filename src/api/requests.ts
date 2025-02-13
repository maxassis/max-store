export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`http://localhost:3000/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
  }
  return response.json();
}
