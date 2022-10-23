import { defineStore } from 'pinia';

export interface IFieldData {
  addTodoField: string;
  searchTodoField: string;
}

// Stores responsável por armazenar os dados temporários inseridos em campos de entrada para uso posterior.
export const useFieldData = defineStore({
  id: 'fieldData',
  state: (): IFieldData => ({
    addTodoField: '',
    searchTodoField: '',
  }),
});
