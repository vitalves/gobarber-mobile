import React from 'react'; // jsx no Icon

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Login e cadastro:
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

// logado:
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

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
            /* Dashboard: */
            Dashboard,

            /* Agendar */
            New: {
              screen: createStackNavigator(
                {
                  SelectProvider,
                  SelectDateTime,
                  Confirm,
                },
                {
                  // padroes para as paginas
                  headerLayoutPreset: 'center',
                  headerBackTitleVisible: 'false',
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              // configuracoes do Agendar
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                ),
              },
            },

            /* Profile: */
            Profile,
          },
          // configuracoes da createBottomTabNavigator:
          {
            resetOnBlur: true,
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
