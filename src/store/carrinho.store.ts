import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const id = "tttttttt";

type Item = {
  _id: string;
  name: string;
  price: number;
  image: string;
  qtdProduct: number;
  description: string;
  stock: number;
};

type State = {
  carrinho: boolean;
  itens: Item[];
  toggle: () => void;
  addItem: (item: Item) => Promise<void>;
  increaseQuantity: (id: string) => Promise<void>;
  decreaseQuantity: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  valorTotal: () => number;
  totalItems: () => number;
};

const api = {
  updateCart: async (items: Item[]): Promise<void> => {
    await fetch("http://localhost:3000/cart/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
        items,
      }),
    });
  },
};

export const carrinhoStore = create<State>()(
  persist(
    (set, get) => ({
      carrinho: false,
      itens: [],

      toggle: () => set((state) => ({ carrinho: !state.carrinho })),
      // Adiciona um item ao carrinho ou aumenta a quantidade se já existir
      addItem: async (item) => {
        set((state) => {
          const itemExistente = state.itens.find((i) => i._id === item._id);
          if (itemExistente) {
            // Se o item já existe, aumenta a quantidade
            const updatedItens = state.itens.map((i) =>
              i._id === item._id ? { ...i, qtdProduct: i.qtdProduct + 1 } : i
            );
            // Atualiza o carrinho no backend
            api.updateCart(updatedItens); // Envia os itens atualizados
            return { itens: updatedItens };
          } else {
            // Se o item não existe, adiciona ao carrinho
            const updatedItens = [...state.itens, { ...item, qtdProduct: 1 }];
            // Atualiza o carrinho no backend
            api.updateCart(updatedItens);
            return { itens: updatedItens };
          }
        });
      },
      // Remove um item do carrinho
      removeItem: async (id) => {
        set((state) => {
          const updatedItens = state.itens.filter((item) => item._id !== id);

          api.updateCart(updatedItens);
          return { itens: updatedItens };
        });
      },
      // Aumenta a quantidade de um item
      increaseQuantity: async (id) => {
        set((state) => {
          const updatedItens = state.itens.map((item) =>
            item._id === id
              ? { ...item, qtdProduct: item.qtdProduct + 1 }
              : item
          );

          api.updateCart(updatedItens);
          return { itens: updatedItens };
        });
      },
      // Diminui a quantidade de um item
      decreaseQuantity: async (id) => {
        set((state) => {
          const updatedItens = state.itens
            .map((item) =>
              item._id === id
                ? { ...item, qtdProduct: item.qtdProduct - 1 }
                : item
            )
            .filter((item) => item.qtdProduct > 0);

          api.updateCart(updatedItens);
          return { itens: updatedItens };
        });
      },
      // Calcula o valor total do carrinho
      valorTotal: () => {
        const { itens } = get();
        return itens.reduce(
          (total, item) => total + item.price * item.qtdProduct,
          0
        );
      },
      // Calcula o número total de itens no carrinho
      totalItems: () => {
        const { itens } = get();
        return itens.reduce((total, item) => total + item.qtdProduct, 0);
      },
    }),
    {
      name: "carrinho-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        itens: state.itens,
      }),
    }
  )
);
