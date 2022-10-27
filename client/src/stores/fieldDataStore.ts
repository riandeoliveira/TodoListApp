import { defineStore } from 'pinia';

interface SignIn {
  email: string;
  password: string;
}

interface SignUp extends SignIn {
  name: string;
}

interface FieldDataState {
  addTodo: string;
  searchTodo: string;
  signIn: SignIn;
  signUp: SignUp;
}

// Armazena os dados inseridos nos campos de texto para uso temporário.
export const fieldDataStore = defineStore({
  id: 'fieldData',
  state: (): FieldDataState => ({
    addTodo: '',
    searchTodo: '',
    signIn: {
      email: '',
      password: '',
    },
    signUp: {
      email: '',
      name: '',
      password: '',
    },
  }),
});
