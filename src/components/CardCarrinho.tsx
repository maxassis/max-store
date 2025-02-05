import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { carrinhoStore } from "../store/carrinho.store";

export default function CarrinhoBtn() {
  const [count, setCount] = useState(0);
  const { increaseQuantity, decreaseQuantity } = carrinhoStore();

  function soma(id: number) {
    setCount(count + 1);
    increaseQuantity(id);
  }

  function sub(id: number) {
    if (count === 0) return;
    setCount(count - 1);
    decreaseQuantity(id);
  }

  return (
    <div className="flex justify-between items-center gap-5 border-b-[1px] border-gray-200 py-4">
      <img
        className="aspect-square rounded-lg overflow-hidden h-16 w-16"
        src="https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreibbibk4gsdpalapcmm4tctuj3ctonrvdd3m23qwvrtdsxtrh22na4"
        alt=""
      />
      <div className="flex flex-1 flex-col ">
        <span className="block">Tablet Air</span>
        <span className="block text-sm text-gray-600">R$600,00</span>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => sub(10)}
            className="h-8 w-8 text-2xl font-medium cursor-pointer border rounded-md grid place-items-center border-gray-300"
          >
            <span>
              <Minus size={16} />
            </span>
          </button>
          {count}
          <button
            onClick={() => soma(10)}
            className="h-8 w-8 text-2xl font-medium cursor-pointer border rounded-md grid place-items-center border-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button className="h-10 w-10 cursor-pointer rounded-md hover:bg-gray-100 grid place-items-center">
        <X size={16} />
      </button>
    </div>
  );
}
