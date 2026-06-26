import 'react-native-gesture-handler'; // 🔥 IMPORTANTE: Deve ser sempre a primeira linha do ficheiro!

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

/* ROTAS DO DRAWER (Menu Lateral) */
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        // Mantido exatamente como você deixou
        swipeEnabled: false,
        gestureEnabled: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 260,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Tela1} />
      {/* Mudado aqui apenas para coincidir com o componente */}
      <Drawer.Screen name="TelaUsuario" component={TelaUsuario} />
    </Drawer.Navigator>
  );
}

/* COMPONENTE PRINCIPAL (App) */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Principal"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Principal" component={Principal} />
          <Stack.Screen name="Tela1" component={DrawerRoutes} />
          <Stack.Screen name="Tabs" component={Tabs} />

          <Stack.Screen name="Tela2" component={Tela2} />
          <Stack.Screen name="Tela3" component={Tela3} />
          <Stack.Screen name="Tela4" component={Tela4} />
          <Stack.Screen name="Tela5" component={Tela5} />
          <Stack.Screen name="Tela6" component={Tela6} />
          <Stack.Screen name="Tela7" component={Tela7} />

          {/* Suas telas originais intactas abaixo */}
          <Stack.Screen name="TelaUsuario" component={TelaUsuario} />
          <Stack.Screen name="TelaAtividades" component={TelaAtividades} />
          <Stack.Screen name="TelaConsulta" component={TelaConsulta} />
          <Stack.Screen name="TelaNovidades" component={TelaNovidades} />
          <Stack.Screen name="TelaRegistro" component={TelaRegistro} />
          <Stack.Screen name="TelaDispositivo" component={TelaDispositivo} />
          <Stack.Screen name="TelaAjuda" component={TelaAjuda} />
          <Stack.Screen name="TelaConexao" component={TelaConexao} />
          <Stack.Screen name="TelaBemEstar" component={TelaBemEstar} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}