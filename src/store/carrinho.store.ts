import { create } from "zustand";

type State = {
  carrinho: boolean;
  toggle: () => void;
};

export const carrinhoStore = create<State>((set) => ({
  carrinho: false,
  toggle: () => set((state) => ({ carrinho: !state.carrinho })),
}));
