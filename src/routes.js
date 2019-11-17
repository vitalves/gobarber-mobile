import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';

// Login e cadastro:
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

// logado:
import Dashboard from './pages/Dashboard';

/*
export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  }),
);
*/
// Um navigator dentro de outro:
// exporta uma função que retorna o componente: (exibir as rotas por condição)
export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        // rotas de autenticação de cadastro:
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        // Rotas para usuário logado:
        App: createBottomTabNavigator({
          Dashboard,
        }),
      },
      // configuracao de rota padrão:
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
