import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CarrinhoBtn from "../components/CarrinhoBtn";
import { carrinhoStore } from "../store/carrinho.store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  qtdProduct: number;
}

async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(
    `https://run.mocky.io/v3/063305e4-5648-4083-b0c7-96acab55c1ae`
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar o produto");
  }
  return response.json();
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem, itens } = carrinhoStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center text-xl">Carregando...</p>;
  if (isError)
    return (
      <p className="text-center text-xl text-red-500">
        Erro ao carregar o produto.
      </p>
    );

  function addToCart(product: Product) {
    const isProductInCart = itens.some((item) => item.id === product.id);

    if (!isProductInCart) {
      addItem(product);
      // alert("Produto adicionado ao carrinho!");
      toast.success("Produto adicionado ao carrinho!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      // alert("Este produto já está no carrinho!");
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

        <div className="grid-cols-2 grid gap-8">
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
              R${data?.price}
            </h3>

            <p className="mt-5 text-gray-600">
              Notebook premium com processador de última geração e design
              elegante. {JSON.stringify(itens)}
            </p>

            <button
              className="mt-5 bg-blue-600 text-white py-3 px-8 rounded-lg gap-2 flex items-center text-sm cursor-pointer"
              onClick={() =>
                addToCart({
                  id: id!,
                  qtdProduct: 1,
                  name: "Tablet Air",
                  price: 600,
                  image:
                    "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreibbibk4gsdpalapcmm4tctuj3ctonrvdd3m23qwvrtdsxtrh22na4",
                })
              }
            >
              <ShoppingCart size={16} color="white" />
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
