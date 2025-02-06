import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { carrinhoStore } from "../store/carrinho.store";

interface CardCarrinhoProps {
  id: string;
  name: string;
  price: number;
  qtdProduct: number;
  image: string;
}

export default function CarrinhoBtn({
  id,
  name,
  price,
  qtdProduct,
  image,
}: CardCarrinhoProps) {
  const { increaseQuantity, decreaseQuantity, removeItem } = carrinhoStore();
  const [count, setCount] = useState(qtdProduct);

  function soma(id: string) {
    setCount(count + 1);
    increaseQuantity(id);
  }

  function sub(id: string) {
    if (count === 0) return;
    setCount(count - 1);
    decreaseQuantity(id);
  }

  return (
    <div className="flex justify-between items-center gap-5 border-b-[1px] border-gray-200 py-4">
      <img
        className="aspect-square rounded-lg overflow-hidden h-16 w-16"
        src={image}
        alt=""
      />
      <div className="flex flex-1 flex-col ">
        <span className="block">{name}</span>
        <span className="block text-sm text-gray-600">R${price}</span>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => sub(id)}
            className="h-8 w-8 text-2xl font-medium cursor-pointer border rounded-md grid place-items-center border-gray-300"
          >
            <span>
              <Minus size={16} />
            </span>
          </button>
          {qtdProduct}
          <button
            onClick={() => soma(id)}
            className="h-8 w-8 text-2xl font-medium cursor-pointer border rounded-md grid place-items-center border-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button
        className="h-10 w-10 cursor-pointer rounded-md hover:bg-gray-100 grid place-items-center"
        onClick={() => removeItem(id)}
      >
        <X size={16} />
      </button>
    </div>
  );
}
