import { defineStore } from 'pinia';

export interface IToggleOption {
  addTodoField: boolean;
  filterModal: boolean;
  searchTodoField: boolean;
}

// Store responsável por armazenar os estados de aberto (true) e fechado (false) de: modais, campos de texto, etc.
export const useToggleStore = defineStore({
  id: 'toggle',
  state: (): IToggleOption => ({
    addTodoField: false,
    filterModal: false,
    searchTodoField: false,
  }),
  actions: {
    /**
     * Troca o valor booleano do campo passado como argumento.
     *
     * @param option
     */
    toggle(option: keyof IToggleOption) {
      this.$state[option] = !this.$state[option];
    },
  },
});
