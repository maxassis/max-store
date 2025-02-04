import { ShoppingCart } from "lucide-react";
import { carrinhoStore } from "../store/carrinho.store";

export default function CarrinhoBtn() {
  const { toggle } = carrinhoStore();

  return (
    <button
      onClick={() => toggle()}
      className="w-10 h-10 rounded-md cursor-pointer border border-gray-300 grid place-items-center"
    >
      <ShoppingCart size={16} />
    </button>
  );
}
