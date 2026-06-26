import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';

export default function Tela1({ navigation }) {

  const [atividades, setAtividades] = useState([]);
  const [nome, setNome] = useState("Usuário");

  useEffect(() => {
    carregarUsuario();
    carregarAtividades();
  }, []);

  const carregarAtividades = async () => {
    try {
      const dados = await AsyncStorage.getItem("atividades");

      if (dados) {
        setAtividades(JSON.parse(dados));
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  const carregarUsuario = async () => {
    try {
      const dados = await AsyncStorage.getItem("usuario");

      if (dados) {
        const usuario = JSON.parse(dados);
        setNome(usuario.nome);
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  const pendentes = atividades.filter(
    item => item.concluida == false || item.concluida == 0 || item.concluida === undefined
  );

  return (
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <ScrollView showsVerticalScrollIndicator={false}>

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => navigation.openDrawer()}
        >
          <Text style={styles.textoMenu}>☰</Text>
        </TouchableOpacity>

        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.textoBomDia}>
          Olá, {nome}
        </Text>

        {/* CARDS FIXOS */}
        <View style={styles.linhaCards}>

          <TouchableOpacity
            style={styles.cardVerde}
            onPress={() => navigation.navigate('TelaConsulta')}
          >
            <Text style={styles.textoCard}>Consulta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardAzul}
            onPress={() => navigation.navigate('TelaAtividades')}
          >
            <Text style={styles.textoCard}>Atividades</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.linhaCards}>

          <TouchableOpacity
            style={styles.cardCinza}
            onPress={() => navigation.navigate('TelaRegistro')}
          >
            <Text style={styles.textoCard}>Registro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardRoxo}
            onPress={() => navigation.navigate('TelaNovidades')}
          >
            <Text style={styles.textoCard}>Novidades e dicas</Text>
          </TouchableOpacity>

        </View>

        {/* SUGESTÕES */}
        <Text style={styles.tituloSugestao}>
          Sugestões →
        </Text>

        {pendentes.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
            Nenhuma atividade pendente 🎉
          </Text>
        ) : (
          pendentes.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.cardSugestao}
            >
              <Text style={styles.textoSugestao}>
                {item.nome}
              </Text>

              <View style={styles.hojeBox}>
                <Text style={styles.textoHoje}>Hoje</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  botaoMenu: {
    marginTop: 20,
    marginLeft: 20,
    width: 45,
    height: 45,
    borderRadius: 12,
    
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
  },

  textoMenu: {
    fontSize: 28,
    color: '#555',
    marginTop: -2,
  },

  logo: {
    width: 370,
    height: 200,
    resizeMode: 'contain',
    marginTop: -30,
    marginLeft: 20,
  },

  textoBomDia: {
    fontSize: 24,
    color: '#000',
    marginTop: -10,
    marginLeft: 20,
    fontWeight: '400',
  },

  linhaCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  cardVerde: {
    width: 180,
    height: 130,
    backgroundColor: '#D9F0C7',
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    padding: 15,
  },

  cardAzul: {
    width: 180,
    height: 130,
    backgroundColor: '#CBEFF2',
    borderRadius: 15,
    justifyContent: 'center',
    padding: 15,
  },

  cardCinza: {
    width: 180,
    height: 130,
    backgroundColor: '#DDE4F6',
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    padding: 15,
  },

  cardRoxo: {
    width: 180,
    height: 130,
    backgroundColor: '#DCD8FA',
    borderRadius: 15,
    justifyContent: 'center',
    padding: 15,
  },

  textoCard: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginLeft: 40,
  },

  tituloSugestao: {
    fontSize: 16,
    color: '#444',
    marginTop: 30,
    marginLeft: 25,
    fontWeight: '500',
  },

  cardSugestao: {
    width: 300,
    height: 60,
    backgroundColor: '#D9F0C7',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  textoSugestao: {
    fontSize: 15,
    color: '#333',
  },

  hojeBox: {
    backgroundColor: '#C8E6B8',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  textoHoje: {
    fontSize: 12,
    color: '#444',
  },

});