import { ShoppingCart } from "lucide-react";
import { carrinhoStore } from "../store/carrinho.store";

export default function CarrinhoBtn() {
  const { toggle, totalItems } = carrinhoStore();

  return (
    <button
      onClick={() => toggle()}
      className="w-10 h-10 rounded-md cursor-pointer border border-gray-300 grid place-items-center relative"
    >
      <ShoppingCart size={16} />

      {totalItems() > 0 && (
        <span className="rounded-full absolute top-[-10px] right-[-10px] w-5 h-5 grid place-items-center bg-blue-600 text-white text-xs">
          {totalItems()}
        </span>
      )}
    </button>
  );
}
