import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card.tsx";
import CarrinhoBtn from "../components/CarrinhoBtn.tsx";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/produtos");
  if (!response.ok) {
    throw new Error("Erro ao buscar os produtos");
  }
  return response.json();
}

function Main() {
  const { data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isError)
    return (
      <p className="text-center text-xl text-red-500">
        Erro ao carregar os produtos.
      </p>
    );

  return (
    <div className="bg-gray-50 w-screen h-screen">
      <div className="max-w-[87.5rem] h-full m-auto p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Max Store</h1>
          <CarrinhoBtn />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
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
