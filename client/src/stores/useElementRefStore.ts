import { defineStore } from 'pinia';

export interface IElementRef {
  addTodoField: HTMLInputElement | null;
  searchTodoField: HTMLInputElement | null;
}

// Store responsável por armazenar referências de elementos HTML para serem acessados de forma imperativa.
export const useElementRefStore = defineStore({
  id: 'elementRef',
  state: (): IElementRef => ({
    addTodoField: null,
    searchTodoField: null,
  }),
});
