import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card.tsx";
import CarrinhoBtn from "../components/CarrinhoBtn.tsx";
import { fetchData } from "../api/requests.ts";

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  qtdProduct: number;
}

function Main() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchData<Product[]>("produtos"),
  });

  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="max-w-[87.5rem] h-full m-auto p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Max Store</h1>
          <CarrinhoBtn />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <h1>Loading...</h1>
          </div>
        )}

        {isError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Erro:</strong>
            <span className="block sm:inline">
              &nbsp;Ocorreu um erro ao obter os produtos, recarregue a pagina.
            </span>
          </div>
        )}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data
            ?.filter((item) => item.stock > 0)
            .map((product) => (
              <Card
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                id={product._id}
                description={product.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
