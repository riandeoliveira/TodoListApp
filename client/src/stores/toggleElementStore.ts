import { defineStore } from 'pinia';

export interface ToggleElementState {
  addTodoField: boolean;
  filterModal: boolean;
  searchTodoField: boolean;
}

// Armazena os estados de aberto (true) e fechado (false) de: modais, campos de texto, entre outros.
export const toggleElementStore = defineStore({
  id: 'toggleElement',
  state: (): ToggleElementState => ({
    addTodoField: false,
    filterModal: false,
    searchTodoField: false,
  }),
  actions: {
    toggle(option: keyof ToggleElementState) {
      this[option] = !this[option];
    },
  },
});
