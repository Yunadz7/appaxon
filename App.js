import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

/* TELAS */
import Principal from './src/telas/Principal';
import Tabs from './src/telas/Tabs';

import Tela1 from './src/telas/Tela1';
import Tela2 from './src/telas/Tela2';
import Tela3 from './src/telas/Tela3';
import Tela4 from './src/telas/Tela4';
import Tela5 from './src/telas/Tela5';
import Tela6 from './src/telas/Tela6';
import Tela7 from './src/telas/Tela7';

import TelaUsuario from './src/telas/TelaUsuario';
import TelaAtividades from './src/telas/TelaAtividades';
import TelaConsulta from './src/telas/TelaConsulta';
import TelaNovidades from './src/telas/TelaNovidades';
import TelaRegistro from './src/telas/TelaRegistro';
import TelaDispositivo from './src/telas/TelaDispositivo';
import TelaAjuda from './src/telas/TelaAjuda';
import TelaConexao from './src/telas/TelaConexao';
import TelaBemEstar from './src/telas/TelaBemEstar';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/* DRAWER */
function DrawerRoutes() {
  return (

    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: '#fff',
          width: 260,
        },
      }}
    >

      {/* HOME */}
      <Drawer.Screen
        name="Home"
        component={Tela1}
      />

      {/* PERFIL */}
      <Drawer.Screen
        name="Perfil"
        component={TelaUsuario}
      />

    </Drawer.Navigator>
  );
}

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Principal"
        screenOptions={{
          headerShown: false,
        }}
      >

        {/* PRINCIPAL */}
        <Stack.Screen
          name="Principal"
          component={Principal}
        />

        {/* DRAWER */}
        <Stack.Screen
          name="Tela1"
          component={DrawerRoutes}
        />

        {/* TABS */}
        <Stack.Screen
          name="Tabs"
          component={Tabs}
        />

        {/* OUTRAS */}
        <Stack.Screen
          name="Tela2"
          component={Tela2}
        />

        <Stack.Screen
          name="Tela3"
          component={Tela3}
        />

        <Stack.Screen
          name="Tela4"
          component={Tela4}
        />

        <Stack.Screen
          name="Tela5"
          component={Tela5}
        />

        <Stack.Screen
          name="Tela6"
          component={Tela6}
        />

        <Stack.Screen
          name="Tela7"
          component={Tela7}
        />

        {/* NOVAS TELAS */}
        <Stack.Screen
          name="TelaUsuario"
          component={TelaUsuario}
        />

        <Stack.Screen
          name="TelaAtividades"
          component={TelaAtividades}
        />

        <Stack.Screen
          name="TelaConsulta"
          component={TelaConsulta}
        />

        <Stack.Screen
          name="TelaNovidades"
          component={TelaNovidades}
        />

        <Stack.Screen
          name="TelaRegistro"
          component={TelaRegistro}
        />

        <Stack.Screen
          name="TelaDispositivo"
          component={TelaDispositivo}
        />

        <Stack.Screen
          name="TelaAjuda"
          component={TelaAjuda}
        />

        <Stack.Screen
          name="TelaConexao"
          component={TelaConexao}
        />

        <Stack.Screen
          name="TelaBemEstar"
          component={TelaBemEstar}
        />
        

        

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});