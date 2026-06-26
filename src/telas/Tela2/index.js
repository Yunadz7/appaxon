import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';

export default function Tela2({ navigation }) {

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  // 🔥 LOGIN COM BANCO
  const login = async () => {

    if (!cpf || !senha) {
      Alert.alert("Aviso", "Preencha CPF e senha!");
      return;
    }

    try {

      const form = new FormData();
      form.append("cpf", cpf);
      form.append("senha", senha);

      const response = await fetch("http://localhost/axon_api/login.php", {
        method: "POST",
        body: form,
      });

      const json = await response.json();

      if (json.status === "sucesso") {

        Alert.alert("Sucesso", json.mensagem);

        await AsyncStorage.setItem(
          "usuario",
          JSON.stringify(json.usuario)
        );

        navigation.navigate("Tela1");

  

      } else {

        Alert.alert("Erro", json.mensagem);
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha na conexão com o servidor");
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView>

        <Image source={require('../../../assets/logo.png')} style={styles.logo} />

        <Text style={styles.titulo1}>Faça seu login</Text>

        <Text style={styles.titulo2}>Não possui uma conta ?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Tela7')}>
          <Text style={styles.linkTexto}>Clique aqui</Text>
        </TouchableOpacity>

        {/* INPUT CPF */}
        <TextInput
          style={styles.input1}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />

        {/* INPUT SENHA */}
        <TextInput
          style={styles.input3}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.botao}
          onPress={login}
        >
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  logo: {
    width: 350,
    height: 300,
    alignSelf: 'center',
    marginTop: -90,
  },

  titulo1: {
    fontSize: 25,
    fontWeight: '400',
    color: '#8db6a8ff',
    textAlign: 'center',
    marginTop: -100,
  },

  titulo2: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },

  linkTexto: {
    color: '#969CC6',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 12,
  },

  input1: {
    borderWidth: 1,
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginLeft: 55,
    width: 290,
    color: '#969CC6',
  },

  input3: {
    borderWidth: 1,
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    marginLeft: 55,
    width: 290,
    color: '#969CC6',
  },

  botao: {
    backgroundColor: '#9BC6B8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 200,
    marginTop: 100,
    marginLeft: 105,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});