import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CarrinhoBtn from "../components/CarrinhoBtn";

export default function Product() {
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
              src="https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreibbibk4gsdpalapcmm4tctuj3ctonrvdd3m23qwvrtdsxtrh22na4"
              alt=""
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Tablet Air</h1>

            <h3 className="text-blue-600 font-bold mt-5 text-xl">R$500,00</h3>

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
