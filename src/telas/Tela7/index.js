import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Modal
} from 'react-native';

import { Calendar } from 'react-native-calendars';

export default function Tela7({ navigation }) {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [declaracao, setDeclaracao] = useState(false);

  const [dataSelecionada, setDataSelecionada] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // 🔥 CADASTRO LIGADO AO BANCO
  const cadastrar = async () => {

    if (!nome || !cpf || !senha || !dataSelecionada) {
      Alert.alert('Aviso', 'Preencha todos os campos!');
      return;
    }

    if (!declaracao) {
      Alert.alert('Aviso', 'Você precisa aceitar a declaração.');
      return;
    }

    try {

      const form = new FormData();

      form.append("nome", nome);
      form.append("cpf", cpf);
      form.append("data_nascimento", dataSelecionada);
      form.append("senha", senha);

      const response = await fetch("http://localhost/axon_api/cadastrar.php", {
        method: "POST",
        body: form,
      });

      const json = await response.json();

      if (json.status === "sucesso") {

        Alert.alert("Sucesso", json.mensagem);

        navigation.navigate('Tela1');

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

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.titulo1}>Cadastro</Text>

        <Text style={styles.titulo2}>Já possui uma conta ?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Tela2')}>
          <Text style={styles.linkTexto}>Clique aqui</Text>
        </TouchableOpacity>

        {/* INPUTS */}
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

        {/* DATA */}
        <TouchableOpacity
          style={styles.dataBox}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={{ color: '#969CC6' }}>
            📅 {dataSelecionada || 'Selecionar data'}
          </Text>
        </TouchableOpacity>

        <Modal visible={showCalendar} transparent animationType="fade">
          <View style={styles.modalBg}>
            <View style={styles.calendarCard}>

              <Calendar
                onDayPress={(day) => {
                  setDataSelecionada(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [dataSelecionada]: {
                    selected: true,
                    selectedColor: '#7b81b1ff',
                  },
                }}
              />

            </View>

            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={{ color: '#fff' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TextInput
          style={styles.input1}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {/* CHECKBOX */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setDeclaracao(!declaracao)}
        >
          <View style={styles.checkbox}>
            {declaracao && <View style={styles.checkboxInside} />}
          </View>

          <Text style={styles.checkboxText}>
            Declaro que as informações são verdadeiras
          </Text>
        </TouchableOpacity>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrar}
        >
          <Text style={styles.textoBotao}>Cadastrar</Text>
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

  dataBox: {
    borderWidth: 1,
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    marginLeft: 55,
    width: 290,
    backgroundColor: '#fff',
  },

  modalBg: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },

  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },

  fechar: {
    marginTop: 20,
    backgroundColor: '#7b81b1ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
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
  },

  checkboxText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#555',
    width: 240,
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
});