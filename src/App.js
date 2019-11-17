/*
Esse arquivo foi criado para que as informações do Redux possam ser acessadas
e repassadas para o index.js, para saber se usuário está logado e direcionar
para a rota apropriada (rotas de login ou Dashboard)
*/
import React from 'react';

import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return <Routes />;
}
