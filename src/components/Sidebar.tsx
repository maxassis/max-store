import { carrinhoStore } from "../store/carrinho.store";
import { X } from "lucide-react";
import CardCarrinho from "./CardCarrinho";
import { formatoMoeda } from "../utils/money_format.ts";

const Sidebar = () => {
  const { carrinho, toggle, itens, valorTotal } = carrinhoStore();

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
        } transition-transform duration-400 p-6 z-50`}
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Carrinho de Compras</span>
          <X
            color="gray"
            size={18}
            onClick={toggle}
            className="cursor-pointer mb-4"
          />
        </div>

        <div>
          {itens.map((item) => (
            <CardCarrinho
              id={item._id}
              key={item._id}
              name={item.name}
              qtdProduct={item.qtdProduct}
              price={item.price}
              image={item.image}
              stock={item.stock}
            />
          ))}
        </div>

        <div className="mt-4">
          {itens.length === 0 ? (
            <p className="text-center text-gray-500">Carrinho vazio.</p>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-medium">
                {formatoMoeda.format(valorTotal())}
              </span>
            </div>
          )}

          {itens.length > 0 && (
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md text-sm cursor-pointer hover:bg-blue-500 transition-colors duration-200 ">
              Finalizar Compra
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
