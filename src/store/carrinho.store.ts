import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Item = {
  _id: string;
  name: string;
  price: number;
  image: string;
  qtdProduct: number;
};

type State = {
  carrinho: boolean;
  itens: Item[];
  toggle: () => void;
  addItem: (item: Item) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  valorTotal: () => number;
  totalItems: () => number;
};

export const carrinhoStore = create<State>()(
  persist(
    (set, get) => ({
      carrinho: false,
      itens: [],

      // Alterna a visibilidade do carrinho
      toggle: () => set((state) => ({ carrinho: !state.carrinho })),

      // Adiciona um item ao carrinho ou aumenta a quantidade se já existir
      addItem: (item) =>
        set((state) => {
          const itemExistente = state.itens.find((i) => i._id === item._id);

          if (itemExistente) {
            // Se o item já existe, aumenta a quantidade
            return {
              itens: state.itens.map((i) =>
                i._id === item._id ? { ...i, qtdProduct: i.qtdProduct + 1 } : i
              ),
            };
          } else {
            // Se o item não existe, adiciona ao carrinho
            return { itens: [...state.itens, { ...item, qtdProduct: 1 }] };
          }
        }),

      // Remove um item do carrinho
      removeItem: (id) =>
        set((state) => ({
          itens: state.itens.filter((item) => item._id !== id),
        })),

      // Aumenta a quantidade de um item
      increaseQuantity: (id) =>
        set((state) => ({
          itens: state.itens.map((item) =>
            item._id === id
              ? { ...item, qtdProduct: item.qtdProduct + 1 }
              : item
          ),
        })),

      // Diminui a quantidade de um item
      decreaseQuantity: (id) =>
        set((state) => ({
          itens: state.itens
            .map((item) =>
              item._id === id
                ? { ...item, qtdProduct: item.qtdProduct - 1 }
                : item
            )
            .filter((item) => item.qtdProduct > 0), // Remove o item se a quantidade for 0
        })),

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
    }
  )
);
