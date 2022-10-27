import { defineStore } from 'pinia';

export interface ElementRefState {
  addTodoField: HTMLInputElement | null;
  searchTodoField: HTMLInputElement | null;
}

// Armazena as referências de elementos HTML para serem acessados de forma imperativa.
export const elementRefStore = defineStore({
  id: 'elementRef',
  state: (): ElementRefState => ({
    addTodoField: null,
    searchTodoField: null,
  }),
});
