import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

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

    if (user.provider) {
      Alert.alert(
        'Erro no Login',
        'O usuário não pode ser prestador de serviços',
      );
      return;
    }

    // Incluir o Token no header de aitorização do axios:
    // api.defaults.headers['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );

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

    Alert.alert('Sucesso', 'Seu cadastro foi realizado');

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro ao realizar o cadastro, verifique seus dados',
    );
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
  Alert.alert('Sucesso', 'Você foi deslogado da sua conta');

  // history.push('/');
}

// sempre que ouvir '@auth/SIGN_IN_REQUEST' chama a funcao signIn:
export default all([
  takeLatest('persist/REHYDRATE', setToken), // persitir o token no axios
  takeLatest('@auth/SIGN_IN_REQUEST', signIn), // Login
  takeLatest('@auth/SIGN_UP_REQUEST', signUp), // Criar conta
  takeLatest('@auth/SIGN_OUT', signOut), // logout
]);
