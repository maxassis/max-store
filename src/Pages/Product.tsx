import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CarrinhoBtn from "../components/CarrinhoBtn";
import { carrinhoStore } from "../store/carrinho.store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatoMoeda } from "../utils/money_format.ts";
import { fetchData } from "../api/requests.ts";
import type { Product } from "../Pages/Main.tsx";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem, itens } = carrinhoStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchData<Product>(`produtos/${id}`),
    enabled: !!id,
  });

  function addToCart(product: Product) {
    const isProductInCart = itens.some((item) => item._id === product._id);

    if (!isProductInCart) {
      addItem(product);
      toast.success("Produto adicionado ao carrinho!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.warning("Este produto já está no carrinho!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="max-w-[87.5rem] h-screen m-auto p-10 ">
        <div className="flex justify-between items-center mb-8 ">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft size={18} color="gray" />
            <h1 className="text-gray-600">Voltar para a loja</h1>
          </Link>

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
              &nbsp;Ocorreu um erro ao obter o produto, tente outra vez.
            </span>
          </div>
        )}

        {!isError && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={data?.image}
                alt={data?.name}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{data?.name}</h1>

              <h3 className="text-blue-600 font-bold mt-5 text-xl">
                {formatoMoeda.format(Number(data?.price))}
              </h3>

              <div className="mt-5 flex gap-2 items-center ">
                <Package
                  size={16}
                  color={
                    data && data?.stock > 0
                      ? "#4a5565"
                      : "oklch(0.704 0.191 22.216)"
                  }
                />
                {data && data.stock > 0 ? (
                  <span className="text-gray-600">
                    {data?.stock} unidades em estoque
                  </span>
                ) : (
                  <span className="text-red-400">Esgotado</span>
                )}
              </div>

              <p className="mt-5 text-gray-600">{data?.description}</p>

              {data && data.stock > 0 && (
                <button
                  className="mt-5 bg-blue-600 text-white py-3 px-8 rounded-lg gap-2 flex items-center text-sm cursor-pointer hover:bg-blue-500 transition-colors duration-200"
                  onClick={() => addToCart(data!)}
                >
                  <ShoppingCart size={16} color="white" />
                  Adicionar ao carrinho
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
