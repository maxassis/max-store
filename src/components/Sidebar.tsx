import { carrinhoStore } from "../store/carrinho.store";
import { X } from "lucide-react";
import CardCarrinho from "./CardCarrinho";

const Sidebar = () => {
  const { carrinho, toggle, itens, addItem, valorTotal, totalItems } =
    carrinhoStore();

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
        {/* {JSON.stringify(itens)} */}
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
          <CardCarrinho />
          <CardCarrinho />
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">R$ {valorTotal()}</span>
          </div>

          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md text-sm"
            onClick={() =>
              addItem({
                id: 10,
                qtdProduct: 1,
                name: "Tablet Air",
                price: 600,
                image:
                  "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreibbibk4gsdpalapcmm4tctuj3ctonrvdd3m23qwvrtdsxtrh22na4",
              })
            }
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
