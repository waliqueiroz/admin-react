import axios from 'axios';
import { store } from '../store';
import { setToken, signOut } from '../store/modules/auth/actions';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

let isAlreadyFetchingAccessToken = false;
let subscribers: { (token: string): void }[] = [];

function onAccessTokenFetched(token: string) {
  subscribers = subscribers.filter((callback) => callback(token));
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

// INTERCEPTA A RESPOSTA PARA VERIFICAR FALHAS E REFAZER REQUISICOES QUANDO NECESSARIO
api.interceptors.response.use(
  (response) => {
    // Em caso de sucesso, retorna a resposta normalmente
    return response;
  },
  async (error) => {
    // em caso de erro, tenta atualizar o token
    const {
      config,
      response: { status, data },
    } = error; // Pega informacoes do erro

    const originalRequest = config;

    if (status === 401) {
      // Se o erro for 401 (Autenticacao)
      // Guarda as requiscoes que falharam num array para serem executadas novamente apos a atualizacao do token
      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api.request(originalRequest));
        });
      });

      if (!isAlreadyFetchingAccessToken) {
        // tenta pegar um novo token com o refresh_token
        isAlreadyFetchingAccessToken = true;
        const response = await api.post(`/login/refresh`);
        const token = response.data.access_token;

        store.dispatch(setToken(token));

        isAlreadyFetchingAccessToken = false;

        onAccessTokenFetched(token); // refaz as requisicoes que falharam
      } else if (data.grant_type === 'refresh_token') {
        isAlreadyFetchingAccessToken = false;
        store.dispatch(signOut());
        return Promise.reject(error);
      }

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  },
);

export default api;
