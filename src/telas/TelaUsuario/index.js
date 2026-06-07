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

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="notifications-outline" size={24} color="#333" />
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
  <Text style={styles.cardTitle}>Meu Bem-estar hoje</Text>

  <View style={styles.moods}>
    <Text>😊</Text>
    <Text>😐</Text>
    <Text>😢</Text>
    <Text>😃</Text>
  </View>
</TouchableOpacity>

        {/* RESUMO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo da semana</Text>

          <View style={styles.row}>
            <Text>📊 4 registros</Text>
            <Text>💙 3 exercícios</Text>
            <Text>⏱️ 12 min</Text>
          </View>
        </View>

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
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
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

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#aaa"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
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