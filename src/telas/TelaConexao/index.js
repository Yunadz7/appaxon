import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function TelaConexao({ navigation }) {

  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color="#6C63FF"
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Cadastro do Dispositivo
          </Text>

          <View style={{ width: 24 }} />

        </View>

        {/* ICON */}
        <View style={styles.iconBox}>

          <MaterialCommunityIcons
            name="watch-variant"
            size={90}
            color="#8B6DFF"
          />

        </View>

        {/* TEXTO */}
        <Text style={styles.subtitle}>
          Cadastre seu relógio inteligente
          para sincronizar seus dados.
        </Text>

        {/* INPUTS */}
        <View style={styles.card}>

          <Text style={styles.label}>
            Nome do dispositivo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nomear dispositivo"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>
            Código do dispositivo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: MWP-2030"
            value={codigo}
            onChangeText={setCodigo}
          />

          {/* BOTAO */}
          <TouchableOpacity style={styles.button}>

            <Ionicons
              name="bluetooth"
              size={20}
              color="#fff"
            />

            <Text style={styles.buttonText}>
              Conectar dispositivo
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E2E5D',
  },

  iconBox: {
    alignItems: 'center',
    marginBottom: 25,
  },

  subtitle: {
    textAlign: 'center',
    color: '#777',
    lineHeight: 22,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    elevation: 3,
    marginBottom: 50,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: '#F7F5FF',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E2D9FF',
  },

  button: {
    backgroundColor: '#8B6DFF',
    height: 55,
    borderRadius: 16,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 15,
  },

});