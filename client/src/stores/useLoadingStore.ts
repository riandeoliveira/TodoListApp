import { defineStore } from 'pinia';

export interface ILoading {
  isLoading: boolean;
}

// Store responsável por armazenar os estados do ícone de "carregando", como true ou false.
export const useLoadingStore = defineStore({
  id: 'loading',
  state: (): ILoading => ({
    isLoading: false,
  }),
  actions: {
    /**
     * Para a animação de carregamento.
     */
    stop(): void {
      this.$state.isLoading = false;
    },
    /**
     * Inicia a animação de carregamento.
     */
    wait(): void {
      this.$state.isLoading = true;
    },
  },
});
