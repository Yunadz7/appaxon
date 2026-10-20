import 'react-native-gesture-handler'; 

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
import TelaDetalheRegistro from './src/telas/TelaDetalheRegistro';
import TelaContato from './src/telas/TelaContato';
import TelaApoio from './src/telas/TelaApoio';
import TelaComoUsar from './src/telas/TelaComoUsar';
import TelaMotivacao from './src/telas/TelaMotivacao';
import TelaInfoNovidades from './src/telas/TelaInfoNovidades';
import TelaDicas from './src/telas/TelaDicas';
import TelaSensor from './src/telas/TelaSensor';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/* ROTAS DO DRAWER (Menu Lateral) */
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        gestureEnabled: false,
        sceneContainerStyle: { flex: 1 }, // Garantia de flex para telas dentro do Drawer
        drawerStyle: {
          backgroundColor: '#fff',
          width: 260,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Tela1} />
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
            cardStyle: { flex: 1 }, // 👈 ESTA LINHA LIBERTA O SCROLL DE TODAS AS TELAS DO STACK!
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

          {/* telas originais */}
          <Stack.Screen name="TelaUsuario" component={TelaUsuario} />
          <Stack.Screen name="TelaAtividades" component={TelaAtividades} />
          <Stack.Screen name="TelaConsulta" component={TelaConsulta} />
          <Stack.Screen name="TelaNovidades" component={TelaNovidades} />
          <Stack.Screen name="TelaRegistro" component={TelaRegistro} />
          <Stack.Screen name="TelaDispositivo" component={TelaDispositivo} />
          <Stack.Screen name="TelaAjuda" component={TelaAjuda} />
          <Stack.Screen name="TelaConexao" component={TelaConexao} />
          <Stack.Screen name="TelaBemEstar" component={TelaBemEstar} />
          <Stack.Screen name="TelaDetalheRegistro" component={TelaDetalheRegistro}/>
          <Stack.Screen name="TelaContato" component={TelaContato}/>
          <Stack.Screen name="TelaApoio" component={TelaApoio}/>
          <Stack.Screen name="TelaComoUsar" component={TelaComoUsar}/>
          <Stack.Screen name="TelaDicas" component={TelaDicas}/>
          <Stack.Screen name="TelaSensor" component={TelaSensor}/>
          <Stack.Screen name="TelaMotivacao" component={TelaMotivacao}/>
          <Stack.Screen name="TelaInfoNovidades" component={TelaInfoNovidades}/>

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}