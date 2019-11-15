import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify'; // notificações

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

// logar no sistema:
export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      // console.tron.warn('Nao prestador');
      toast.error('Esse usuário não é um prestador de serviços', {
        position: 'top-center',
        autoClose: 5000,
      });
      return;
    }

    // Incluir o Token no header de aitorização do axios:
    // api.defaults.headers['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados!', {
      position: 'top-center',
      autoClose: 3000,
      width: '500px',
    });

    yield put(signFailure());
  }
}

// cadastro no sistema
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    toast.success('Cadastro realizado com sucesso', {
      position: 'top-center',
      autoClose: 3000,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha ao realizar o cadastro, verifique seus dados', {
      position: 'top-center',
      autoClose: 3000,
    });
  }
}

// enviar o token de autenticação junto com a chamada (axios)
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  toast.success('Você foi deslogado com  sucesso!');

  history.push('/');
}

// sempre que ouvir '@auth/SIGN_IN_REQUEST' chama a funcao signIn:
export default all([
  takeLatest('persist/REHYDRATE', setToken), // persitir o token no axios
  takeLatest('@auth/SIGN_IN_REQUEST', signIn), // Login
  takeLatest('@auth/SIGN_UP_REQUEST', signUp), // Criar conta
  takeLatest('@auth/SIGN_OUT', signOut), // logout
]);
