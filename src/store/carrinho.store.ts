import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const id = "1234567";

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
    (set, get) => {
      let batchTimeout: NodeJS.Timeout | null = null;

      const batchedUpdateCart = (callback: () => void) => {
        if (batchTimeout) clearTimeout(batchTimeout);

        batchTimeout = setTimeout(() => {
          callback();
        }, 500);
      };

      return {
        carrinho: false,
        itens: [],
        toggle: () => set((state) => ({ carrinho: !state.carrinho })),
        addItem: async (item) => {
          set((state) => {
            const itemExistente = state.itens.find((i) => i._id === item._id);
            if (itemExistente) {
              const updatedItens = state.itens.map((i) =>
                i._id === item._id ? { ...i, qtdProduct: i.qtdProduct + 1 } : i
              );
              api.updateCart(updatedItens);
              return { itens: updatedItens };
            } else {
              const updatedItens = [...state.itens, { ...item, qtdProduct: 1 }];
              api.updateCart(updatedItens);
              return { itens: updatedItens };
            }
          });
        },
        removeItem: async (id) => {
          set((state) => {
            const updatedItens = state.itens.filter((item) => item._id !== id);
            batchedUpdateCart(() => api.updateCart(updatedItens));
            return { itens: updatedItens };
          });
        },
        increaseQuantity: async (id) => {
          set((state) => {
            const updatedItens = state.itens.map((item) =>
              item._id === id
                ? { ...item, qtdProduct: item.qtdProduct + 1 }
                : item
            );
            batchedUpdateCart(() => api.updateCart(updatedItens));
            return { itens: updatedItens };
          });
        },
        decreaseQuantity: async (id) => {
          set((state) => {
            const updatedItens = state.itens
              .map((item) =>
                item._id === id
                  ? { ...item, qtdProduct: item.qtdProduct - 1 }
                  : item
              )
              .filter((item) => item.qtdProduct > 0);
            batchedUpdateCart(() => api.updateCart(updatedItens));
            return { itens: updatedItens };
          });
        },
        valorTotal: () => {
          const { itens } = get();
          return itens.reduce(
            (total, item) => total + item.price * item.qtdProduct,
            0
          );
        },
        totalItems: () => {
          const { itens } = get();
          return itens.reduce((total, item) => total + item.qtdProduct, 0);
        },
      };
    },
    {
      name: "carrinho-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        itens: state.itens,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Erro ao carregar o estado do carrinho:", error);
          } else {
            const itens = Array.isArray(state?.itens) ? state.itens : [];
            api.updateCart(itens).catch((error) => {
              console.error(
                "Erro ao sincronizar o carrinho com o backend:",
                error
              );
            });
          }
        };
      },
    }
  )
);
