
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Linking,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TelaAjuda() {
  const [nomeContato, setNomeContato] = useState('');
  const [numeroContato, setNumeroContato] = useState('');

  const URL_SALVAR =
    'http://localhost/axon_api/salvar_contato.php';

  const URL_BUSCAR =
  'http://localhost/axon_api/buscar_contato.php?id_usuario=1';

    
  useEffect(() => {
    carregarContato();
  }, []);

  async function salvarContato() {
    if (!nomeContato || !numeroContato) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const resposta = await fetch(URL_SALVAR, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: 1,
          nome_contato: nomeContato,
          numero: numeroContato,
        }),
      });

      const dados = await resposta.json();

      if (dados.sucesso) {
        alert('Contato salvo com sucesso!');
      } else {
        alert(dados.mensagem);
      }
    } catch (erro) {
      console.log(erro);
      alert('Erro ao conectar ao servidor');
    }
  }

  async function carregarContato() {
    try {
      const resposta = await fetch(URL_BUSCAR);
      const dados = await resposta.json();

      if (dados.sucesso) {
        setNomeContato(dados.nome);
        setNumeroContato(dados.telefone);
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  function ligarCVV() {
    Linking.openURL('tel:188');
  }

  function ligarContato() {
    if (numeroContato !== '') {
      Linking.openURL(`tel:${numeroContato}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.titulo}>
          Ajuda & Emergência
        </Text>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons
              name="call-outline"
              size={35}
              color="#8B6DFF"
            />
          </View>

          <Text style={styles.cardTitulo}>
            Centro de Valorização da Vida
          </Text>

          <Text style={styles.cardTexto}>
            O CVV oferece apoio emocional gratuito
            24 horas por dia.
          </Text>

          <Text style={styles.numeroCVV}>
            Ligue 188
          </Text>

          <TouchableOpacity
            style={styles.botaoCVV}
            onPress={ligarCVV}
          >
            <Ionicons
              name="call"
              size={18}
              color="#fff"
            />
            <Text style={styles.textoBotao}>
              Ligar para o CVV
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>
            Contato de Emergência
          </Text>

          <Text style={styles.label}>
            Nome do contato
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome"
            placeholderTextColor="#999"
            value={nomeContato}
            onChangeText={setNomeContato}
          />

          <Text style={styles.label}>
            Número de telefone
          </Text>

          <TextInput
            style={styles.input}
            placeholder="(00) 00000-0000"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={numeroContato}
            onChangeText={setNumeroContato}
          />

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={salvarContato}
          >
            <Ionicons
              name="save-outline"
              size={18}
              color="#fff"
            />
            <Text style={styles.textoBotao}>
              Salvar contato
            </Text>
          </TouchableOpacity>
        </View>

        {numeroContato !== '' && (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>
              Contato Salvo
            </Text>

            <Text style={styles.contatoNome}>
              {nomeContato}
            </Text>

            <Text style={styles.contatoNumero}>
              {numeroContato}
            </Text>

            <TouchableOpacity
              style={styles.botaoEmergencia}
              onPress={ligarContato}
            >
              <Ionicons
                name="call"
                size={20}
                color="#fff"
              />
              <Text style={styles.textoBotao}>
                Ligar Agora
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    maxHeight: SCREEN_HEIGHT,
    backgroundColor: '#F7F7FB',
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  iconBox: {
    alignSelf: 'center',
    backgroundColor: '#F0EBFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },

  cardTexto: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },

  numeroCVV: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B6DFF',
    textAlign: 'center',
    marginBottom: 20,
  },

  botaoCVV: {
    backgroundColor: '#8B6DFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },

  label: {
    marginTop: 15,
    marginBottom: 6,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#F3F2F7',
    borderRadius: 10,
    padding: 12,
  },

  botaoSalvar: {
    backgroundColor: '#4B3FAF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  contatoNome: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  contatoNumero: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
  },

  botaoEmergencia: {
    backgroundColor: '#E53935',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});