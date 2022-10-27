import { defineStore } from 'pinia';

interface LoadingState {
  isLoading: boolean;
}

// Armazena os estados do ícone de "carregando", como true ou false.
export const loadingStore = defineStore({
  id: 'loading',
  state: (): LoadingState => ({
    isLoading: false,
  }),
  actions: {
    stop(): void {
      this.isLoading = false;
    },

    wait(): void {
      this.isLoading = true;
    },
  },
});
