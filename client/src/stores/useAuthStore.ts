import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useLoadingStore } from './useLoadingStore';

interface ISignUpRef {
  email: string;
  name: string;
  password: string;
}

interface ISignInRef {
  email: string;
  password: string;
}

export interface IAuth {
  signUpRef: ISignUpRef;
  signInRef: ISignInRef;
}

const loading = useLoadingStore();

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuth => ({
    signUpRef: {
      email: '',
      name: '',
      password: '',
    },
    signInRef: {
      email: '',
      password: '',
    },
  }),
  actions: {
    async createUser(): Promise<void> {
      try {
        loading.wait();

        await api.post('/users', this.$state.signUpRef);

        alert('Usuário criado com sucesso!');

        location.hash = '/todos';
      } catch (err: unknown) {
        alert('Erro ao cadastrar um novo usuário. Por favor tente novamente!');

        console.log(err);
      }

      loading.stop();
    },
    deleteUser() {
      console.log('lorem');
    },
    getUser() {
      console.log('lorem');
    },
  },
});
