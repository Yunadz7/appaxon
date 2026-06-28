import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function TelaConexao({ navigation }) {

  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');

  const conectarDispositivo = async () => {
    try {

      if (!nome || !codigo) {
        Alert.alert("Erro", "Preencha todos os campos");
        return;
      }

      const form = new FormData();
      form.append("nome", nome);
      form.append("codigo", codigo);

      const res = await fetch("http://localhost/axon_api/cadastrar_dispositivo.php", {
        method: "POST",
        body: form,
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (data.status === "ok") {

        const dispositivoSalvo = {
          nome,
          codigo,
          conectado: true
        };

        // 🔥 SALVA NO STORAGE
        await AsyncStorage.setItem(
          "dispositivo",
          JSON.stringify(dispositivoSalvo)
        );

        Alert.alert("Sucesso", "Dispositivo conectado!");

        // 🔥 volta pra tela principal
        navigation.navigate("TelaDispositivo");

      } else {
        Alert.alert("Erro", data.msg);
      }

    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha de conexão");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#6C63FF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Cadastro do Dispositivo
          </Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name="watch-variant"
            size={90}
            color="#8B6DFF"
          />
        </View>

        <Text style={styles.subtitle}>
          Cadastre seu relógio inteligente para sincronizar seus dados.
        </Text>

        <View style={styles.card}>

          <Text style={styles.label}>Nome do dispositivo</Text>

          <TextInput
            style={styles.input}
            placeholder="Nomear dispositivo"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Código do dispositivo</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: MWP-2030"
            value={codigo}
            onChangeText={setCodigo}
          />

          <TouchableOpacity style={styles.button} onPress={conectarDispositivo}>
            
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
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
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
  },
});