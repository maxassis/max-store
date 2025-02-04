import { carrinhoStore } from "../store/carrinho.store";
import { X } from "lucide-react";
import CardCarrinho from "./CardCarrinho";

const Sidebar = () => {
  const { carrinho, toggle } = carrinhoStore();

  return (
    <>
      {carrinho && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-30 transition-opacity duration-300"
          onClick={toggle}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[380px] bg-white shadow-lg transform ${
          carrinho ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-400 p-6`}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-lg font-semibold">Carrinho de Compras</span>
          <X
            color="gray"
            size={18}
            onClick={toggle}
            className="cursor-pointer mb-4"
          />
        </div>

        <div>
          <CardCarrinho />
          <CardCarrinho />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
