import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';

// Login e cadastro:
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

// logado:
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

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
        App: createBottomTabNavigator(
          {
            Dashboard,
            Profile,
          },
          // configuracoes da createBottomTabNavigator:
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#8d41a8',
              },
            },
          },
        ),
      },
      // configuracao de rota padrão:
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
