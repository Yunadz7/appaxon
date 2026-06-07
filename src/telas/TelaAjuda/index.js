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
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// Captura a altura real da tela para forçar o limite físico no container
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TelaAjuda() {
  const [nomeContato, setNomeContato] = useState('');
  const [numeroContato, setNumeroContato] = useState('');

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
        bounces={true}
        overScrollMode="always"
      >
        {/* TITULO */}
        <Text style={styles.titulo}>
          Ajuda & Emergência
        </Text>

        {/* CARD CVV */}
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
            O CVV oferece apoio emocional gratuito 24 horas por dia.
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

        {/* CONTATO */}
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

        {/* CONTATO SALVO */}
        {numeroContato !== '' && (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>
              Contato Salvo
            </Text>

            <Text style={styles.contatoNome}>
              {nomeContato || 'Contato sem nome'}
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

/* ESTILOS DEFINITIVOS PARA FUNCIONAMENTO DA ROLAGEM */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Limita a altura física da tela para forçar o scroll a funcionar
    height: SCREEN_HEIGHT,
    maxHeight: SCREEN_HEIGHT,
    backgroundColor: '#F7F7FB',
    // Corrige espaçamento para Android não cobrir a barra de status
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50, // Garante folga no final da rolagem
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    lineHeight: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F3F2F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  botaoSalvar: {
    backgroundColor: '#4B3FAF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  contatoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  contatoNumero: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 2,
  },
  botaoEmergencia: {
    backgroundColor: '#E53935',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});