import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Tela2 from '../Tela2';
import Tela3 from '../Tela3';
import Tela4 from '../Tela4';
import Tela5 from '../Tela5';
import Tela6 from '../Tela6';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = '#d0d';
          size = 30;

          if (route.name === 'Tela2') iconName = focused ? 'home-outline' : 'bed-outline';
          else if (route.name === 'Tela3') iconName = focused ? 'people-outline' : 'happy-outline';
          else if (route.name === 'Tela4') iconName = focused ? 'people-outline' : 'happy-outline';
          else if (route.name === 'Tela5') iconName = focused ? 'people-outline' : 'happy-outline';
          else if (route.name === 'Tela6') iconName = focused ? 'people-outline' : 'happy-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        activeTintColor: '#3f64c7',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Tela2" component={Tela2} />
      <Tab.Screen name="Tela3" component={Tela3} />
      <Tab.Screen name="Tela4" component={Tela4} />
      <Tab.Screen name="Tela5" component={Tela5} />
      <Tab.Screen name="Tela6" component={Tela6} />
    </Tab.Navigator>
  );
}