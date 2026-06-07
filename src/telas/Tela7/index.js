import React, { useState } from 'react';
import {StyleSheet,Text,View,ImageBackground,Image,TouchableOpacity,TextInput,Alert,ScrollView} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function Tela7({ navigation }) {

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [declaracao, setDeclaracao] = useState(false);

  // cadastro
  const cadastrar = () => {

    // verificar campos vazios
    if (!nome || !cpf || !idade || !senha) {
      Alert.alert(
        'Aviso',
        'Preencha todos os campos!'
      );
      return;
    }

    // verificar declaração
    if (!declaracao) {
      Alert.alert(
        'Aviso',
        'Você precisa aceitar a declaração.'
      );
      return;
    }

    // navegar
    navigation.navigate('Tela1');
  };

  return (
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <ScrollView contentContainerStyle={styles.scroll}>

        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.titulo1}>
          Cadastro
        </Text>

        <Text style={styles.titulo2}>
          Já possui uma conta ?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Tela2')}
        >
          <Text style={styles.linkTexto}>
            Clique aqui
          </Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>

          <TextInput
            style={styles.input1}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input1}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={idade}
              style={styles.picker}
              onValueChange={(itemValue) => setIdade(itemValue)}
            >

              <Picker.Item
                label="Selecione sua idade"
                value=""
              />

              {Array.from({ length: 100 }, (_, i) => (
                <Picker.Item
                  key={i}
                  label={`${i + 1} anos`}
                  value={i + 1}
                />
              ))}

            </Picker>
          </View>

          <TextInput
            style={styles.input1}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {/* declaração */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setDeclaracao(!declaracao)}
          >

            <View style={styles.checkbox}>
              {declaracao && (
                <View style={styles.checkboxInside} />
              )}
            </View>

            <Text style={styles.checkboxText}>
              Declaro que as informações são verdadeiras
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={cadastrar}
          >
            <Text style={styles.textoBotao}>
              Cadastrar
            </Text>
          </TouchableOpacity>

        </View>
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

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 55,
    width: 290,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#7b81b1ff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  checkboxInside: {
    width: 12,
    height: 12,
    backgroundColor: '#7b81b1ff',
    borderRadius: 2,
  },

  checkboxText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#555',
    width: 240,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 55,
    width: 290,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  picker: {
    height: 50,
    color: '#969CC6',
  },

  input1: {
    borderWidth: 1,
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginLeft: 55,
    fontSize: 16,
    color: '#969CC6',
    width: 290,
  },

  logo: {
    width: 350,
    height: 300,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: -90,
  },

  titulo1: {
    fontSize: 25,
    fontWeight: '400',
    color: '#8db6a8ff',
    textAlign: 'center',
    marginTop: -100,
    marginLeft: -150,
  },

  titulo2: {
    fontSize: 12,
    fontWeight: '300',
    color: '#000000ff',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: -180,
  },

  botao: {
    backgroundColor: '#9BC6B8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 200,
    marginTop: 70,
    marginLeft: 105,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },

  linkTexto: {
    color: '#969CC6',
    textDecorationLine: 'underline',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -17,
    marginLeft: 6,
  },

});