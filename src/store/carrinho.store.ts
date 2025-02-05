import { create } from "zustand";

type Item = {
  id: number;
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
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  valorTotal: () => number;
  totalItems: () => number;
};

export const carrinhoStore = create<State>((set, get) => ({
  carrinho: false,
  itens: [],

  // Alterna a visibilidade do carrinho
  toggle: () => set((state) => ({ carrinho: !state.carrinho })),

  // Adiciona um item ao carrinho ou aumenta a quantidade se já existir
  addItem: (item) =>
    set((state) => {
      const itemExistente = state.itens.find((i) => i.id === item.id);

      if (itemExistente) {
        // Se o item já existe, aumenta a quantidade
        return {
          itens: state.itens.map((i) =>
            i.id === item.id ? { ...i, qtdProduct: i.qtdProduct + 1 } : i
          ),
        };
      } else {
        // Se o item não existe, adiciona ao carrinho
        return { itens: [...state.itens, { ...item, qtdProduct: 1 }] };
      }
    }),

  // Aumenta a quantidade de um item
  increaseQuantity: (id) =>
    set((state) => ({
      itens: state.itens.map((item) =>
        item.id === id ? { ...item, qtdProduct: item.qtdProduct + 1 } : item
      ),
    })),

  // Diminui a quantidade de um item
  decreaseQuantity: (id) =>
    set((state) => ({
      itens: state.itens
        .map((item) =>
          item.id === id ? { ...item, qtdProduct: item.qtdProduct - 1 } : item
        )
        .filter((item) => item.qtdProduct > 0), // Remove o item se a quantidade for 0
    })),

  // Remove um item do carrinho
  removeItem: (id) =>
    set((state) => ({
      itens: state.itens.filter((item) => item.id !== id),
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
}));
