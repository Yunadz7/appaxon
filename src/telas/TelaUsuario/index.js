import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function TelaUsuario({ navigation }) {
  return (
    <View style={styles.container}>

      {/* BOTÃO MENU (DRAWER) */}
      
      {/* BOTÃO MENU (DRAWER) */}
<TouchableOpacity
  style={styles.botaoMenu}
  onPress={() => {
    // Procura o navegador pai (o Drawer) para forçar a abertura
    const drawerPai = navigation.getParent();
    
    if (drawerPai && typeof drawerPai.openDrawer === 'function') {
      drawerPai.openDrawer();
    } else {
      // Se ele perder a referência por completo na volta, recarrega o Drawer
      navigation.navigate('Tela1', { screen: 'TelaUsuario' });
      
      // Um pequeno delay para dar tempo de renderizar e abrir o menu
      setTimeout(() => {
        navigation.openDrawer();
      }, 50);
    }
  }}
>
  <Text style={styles.textoMenu}>☰</Text>
</TouchableOpacity>
      {/* HEADER */}
      <View style={styles.header}>

        <Ionicons name="settings-outline" size={24} color="#333" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* AVATAR */}
        <View style={styles.avatarBox}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/200' }}
            style={styles.avatar}
          />
        </View>

        {/* CARD BEM-ESTAR */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.card}
          onPress={() => navigation.navigate('TelaBemEstar')}
        >
          <Text style={styles.cardTitle}>Meu Bem-estar semanal</Text>

          <View style={styles.moods}>
            <Text>😊</Text>
            <Text>😐</Text>
            <Text>😢</Text>
            <Text>😃</Text>
          </View>
        </TouchableOpacity>

        {/* RESUMO */}
       

        {/* MENU */}
        <View style={styles.menuCard}>

          <MenuItem
            icon="phone-portrait-outline"
            text="Dispositivo"
            onPress={() => navigation.navigate('TelaDispositivo')}
          />

          <MenuItem
            icon="help-circle-outline"
            text="Ajuda"
            onPress={() => navigation.navigate('TelaAjuda')}
          />

          <MenuItem
            icon="log-out-outline"
            text="Sair"
            danger
          />

        </View>

      </ScrollView>
    </View>
  );
}

/* MENU ITEM */
function MenuItem({ icon, text, danger, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons
        name={icon}
        size={22}
        color={danger ? 'red' : '#333'}
      />

      <Text
        style={[
          styles.menuText,
          danger && { color: 'red' },
        ]}
      >
        {text}
      </Text>

      <Ionicons name="chevron-forward" size={20} color="#aaa" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    paddingTop: 50,
  },

  /* BOTÃO MENU */
  botaoMenu: {
    position: 'absolute',
    top: 55,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 5,
  },

  textoMenu: {
    fontSize: 28,
    color: '#555',
    marginTop: -2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 350,
  },

  avatarBox: {
    alignItems: 'center',
    marginVertical: 15,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },

  moods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  menuCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 15,
    paddingVertical: 5,
    marginBottom: 30,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },

  menuText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
});