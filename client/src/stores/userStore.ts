import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { fieldDataStore } from './fieldDataStore';
import { loadingStore } from './loadingStore';

interface User {
  id: string;
  name: string;
  email: string;
}

interface TokenResponse extends User {
  accessToken: string;
}

interface UserState extends TokenResponse {
  authenticated: boolean;
}

const loading = loadingStore();
const fieldData = fieldDataStore();

export const userStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    id: '',
    name: '',
    email: '',
    accessToken: localStorage.getItem('access_token') || '',
    authenticated: false,
  }),
  actions: {
    deleteAccount() {
      return false;
    },

    signIn() {
      return false;
    },

    signOut() {
      this.accessToken = '';

      // Remove o token de acesso do Local Storage e encerra a sessão atual do usuário.
      localStorage.removeItem('access_token');

      location.hash = '/signup';
    },

    async signUp(): Promise<void> {
      loading.wait();

      try {
        // Envia os dados do usuário para a API e recebe um token de acesso.
        const res: AxiosResponse<TokenResponse> = await api.post(
          '/auth/signup',
          fieldData.signUp
        );

        const { id, name, email, accessToken } = res.data;

        // Salva o token de acesso no local storage.
        localStorage.setItem('access_token', accessToken);

        // Preenche os estados globais do usuário logado.
        this.id = id;
        this.name = name;
        this.email = email;
        this.accessToken = accessToken;
        this.authenticated = true;

        location.hash = '/todos';
      } catch (error: unknown) {
        alert('Erro ao se cadastrar. Por favor tente novamente!');

        console.log(error);
      }

      loading.stop();
    },

    async verify(): Promise<void> {
      try {
        // Chama a API e envia o token de acesso para confirmar se o usuário existe.
        const res: AxiosResponse<User> = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        const { id, name, email } = res.data;

        this.id = id;
        this.name = name;
        this.email = email;
        this.authenticated = true;
      } catch (error: unknown) {
        console.log(error);
      }
    },
  },
});
