import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CarrinhoBtn from "../components/CarrinhoBtn";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function Product() {
  const [data, setData] = useState<Product>();

  useEffect(() => {
    fetch("https://run.mocky.io/v3/063305e4-5648-4083-b0c7-96acab55c1ae")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="max-w-[87.5rem] h-screen m-auto p-8 ">
        <div className="flex justify-between items-center mb-8 ">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft size={18} color="gray" />
            <h1 className="text-gray-600">Voltar para a loja</h1>
          </Link>

          <CarrinhoBtn />
        </div>

        <div className="grid-cols-2 grid gap-8">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={data?.image}
              alt=""
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{data?.name}</h1>

            <h3 className="text-blue-600 font-bold mt-5 text-xl">
              R${data?.price}
            </h3>

            <p className="mt-5 text-gray-600">
              Notebook premium com processador de última geração e design
              elegante.
            </p>

            <button className="mt-5 bg-blue-600 text-white py-3 px-8 rounded-lg gap-2 flex items-center text-sm">
              <ShoppingCart size={16} color="white" />
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
