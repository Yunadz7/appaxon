import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Linking,
  Platform,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function TelaAjuda({ navigation }) {
  const [nomeContato, setNomeContato] = useState('');
  const [numeroContato, setNumeroContato] = useState('');
  const [contatos, setContatos] = useState([]);

  function salvarContato() {
    if (!nomeContato || !numeroContato) {
      alert('Preencha todos os campos');
      return;
    }

    const novoContato = {
      id: Date.now(),
      nome: nomeContato,
      numero: numeroContato,
    };

    setContatos((prev) => [novoContato, ...prev]);

    setNomeContato('');
    setNumeroContato('');
  }

  function ligarCVV() {
    Linking.openURL('tel:188');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* VOLTAR */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation && navigation.navigate('TelaUsuario')}
        >
          <Ionicons name="arrow-back" size={24} color="#4B3FAF" />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Ajuda & Emergência</Text>

        {/* CVV */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>CVV</Text>
          <Text style={styles.cardTexto}>Apoio emocional 24h</Text>

          <Text style={styles.numeroCVV}>188</Text>

          <TouchableOpacity style={styles.botaoCVV} onPress={ligarCVV}>
            <Text style={styles.textoBotao}>Ligar</Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Contato de Emergência</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nomeContato}
            onChangeText={setNomeContato}
          />

          <TextInput
            style={styles.input}
            placeholder="Número"
            value={numeroContato}
            onChangeText={setNumeroContato}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarContato}>
            <Text style={styles.textoBotao}>Salvar contato</Text>
          </TouchableOpacity>
        </View>

        {/* LISTA */}
        {contatos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitulo}>Contato Salvo</Text>

            <Text style={styles.contatoNome}>{item.nome}</Text>
            <Text style={styles.contatoNumero}>{item.numero}</Text>

            <TouchableOpacity
              style={styles.botaoEmergencia}
              onPress={() => Linking.openURL(`tel:${item.numero}`)}
            >
              <Text style={styles.textoBotao}>Ligar Agora</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 200,
    flexGrow: 1, // 🔥 ISSO AQUI É O QUE FAZ ROLAR NO WEB
  },

  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  textoVoltar: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#4B3FAF',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginTop:-20,
  },

  cardTitulo: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  cardTexto: {
    textAlign: 'center',
    color: '#666',
  },

  numeroCVV: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  botaoSalvar: {
    backgroundColor: '#4B3FAF',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  botaoCVV: {
    backgroundColor: '#8B6DFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  botaoEmergencia: {
    backgroundColor: '#E53935',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  contatoNome: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  contatoNumero: {
    textAlign: 'center',
    color: '#666',
  },
});