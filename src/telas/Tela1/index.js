import React, { useEffect, useState, useCallback } from 'react';
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

import { useFocusEffect } from '@react-navigation/native';

// ========================================
// URL DA API
// ========================================

const API_URL = 'http://localhost/axon_api';

export default function Tela1({ navigation }) {

  const [atividades, setAtividades] = useState([]);
  const [nome, setNome] = useState("Usuário");

  // Consultas do usuário logado
  const [consultas, setConsultas] = useState([]);

  // ========================================
  // CARREGAR DADOS INICIAIS
  // ========================================

  useEffect(() => {
    carregarUsuario();
    carregarAtividades();
  }, []);

  // ========================================
  // CARREGAR CONSULTAS
  // ========================================

  const carregarConsultas = async () => {

    try {

      const dadosUsuario =
        await AsyncStorage.getItem("usuario");

      if (!dadosUsuario) {

        console.log(
          "Usuário não encontrado."
        );

        setConsultas([]);

        return;
      }

      const usuario =
        JSON.parse(dadosUsuario);

      console.log(
        "Usuário na Tela1:",
        usuario
      );

      const id_usuario =
        usuario.id_usuario;

      if (!id_usuario) {

        console.log(
          "ID do usuário não encontrado."
        );

        setConsultas([]);

        return;
      }

      const url =
        `${API_URL}/consulta.php?id_usuario=${id_usuario}`;

      console.log(
        "Buscando consultas:",
        url
      );

      const response =
        await fetch(url);

      if (!response.ok) {

        throw new Error(
          "Erro HTTP: " +
          response.status
        );
      }

      const dadosConsultas =
        await response.json();

      console.log(
        "RESPOSTA CONSULTAS:",
        dadosConsultas
      );

      if (Array.isArray(dadosConsultas)) {

        setConsultas(
          dadosConsultas
        );

      } else {

        setConsultas([]);

      }

    } catch (erro) {

      console.log(
        "Erro ao carregar consultas:",
        erro
      );

      setConsultas([]);

    }
  };

  // ========================================
  // ATUALIZAR AO VOLTAR PARA TELA1
  // ========================================

  useFocusEffect(
    useCallback(() => {

      carregarConsultas();

    }, [])
  );

  // ========================================
  // CARREGAR ATIVIDADES
  // ========================================

  const carregarAtividades = async () => {

    try {

      const dados =
        await AsyncStorage.getItem(
          "atividades"
        );

      if (dados) {

        setAtividades(
          JSON.parse(dados)
        );

      }

    } catch (erro) {

      console.log(
        "Erro ao carregar atividades:",
        erro
      );

    }
  };

  // ========================================
  // CARREGAR USUÁRIO
  // ========================================

  const carregarUsuario = async () => {

    try {

      const dados =
        await AsyncStorage.getItem(
          "usuario"
        );

      if (dados) {

        const usuario =
          JSON.parse(dados);

        setNome(
          usuario.nome || "Usuário"
        );

      }

    } catch (erro) {

      console.log(
        "Erro ao carregar usuário:",
        erro
      );

    }
  };

  // ========================================
  // ATIVIDADES PENDENTES
  // ========================================

  const pendentes =
    atividades.filter(
      item =>
        item.concluida == false ||
        item.concluida == 0 ||
        item.concluida === undefined
    );

  // ========================================
  // TELA
  // ========================================

  return (

    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* ==================================
            MENU
        ================================== */}

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() =>
            navigation.openDrawer()
          }
        >

          <Text style={styles.textoMenu}>
            ☰
          </Text>

        </TouchableOpacity>


        {/* ==================================
            LOGO
        ================================== */}

        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />


        {/* ==================================
            SAUDAÇÃO
        ================================== */}

        <Text style={styles.textoBomDia}>
          Olá, {nome}
        </Text>


        {/* ==================================
            CARDS FIXOS
        ================================== */}

        <View style={styles.linhaCards}>

          <TouchableOpacity
            style={styles.cardVerde}
            onPress={() =>
              navigation.navigate(
                'TelaConsulta'
              )
            }
          >

            <Text style={styles.textoCard}>
              Consulta
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.cardAzul}
            onPress={() =>
              navigation.navigate(
                'TelaAtividades'
              )
            }
          >

            <Text style={styles.textoCard}>
              Atividades
            </Text>

          </TouchableOpacity>

        </View>


        <View style={styles.linhaCards}>

          <TouchableOpacity
            style={styles.cardCinza}
            onPress={() =>
              navigation.navigate(
                'TelaRegistro'
              )
            }
          >

            <Text style={styles.textoCard}>
              Registro
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.cardRoxo}
            onPress={() =>
              navigation.navigate(
                'TelaNovidades'
              )
            }
          >

            <Text style={styles.textoCard}>
              Novidades e dicas
            </Text>

          </TouchableOpacity>

        </View>


        {/* ==================================
            SUGESTÕES
        ================================== */}

        <Text style={styles.tituloSugestao}>
          Sugestões →
        </Text>


        {/* ==================================
            CONSULTAS
        ================================== */}

        {/* ==================================
    CONSULTAS
================================== */}

{consultas.length > 0 && (

  consultas.map((consulta) => (

    <View
      key={String(consulta.id_consulta)}
      style={styles.cardConsulta}
    >

      <View style={styles.linhaConsulta}>

        <Text style={styles.iconeConsulta}>
          🩺
        </Text>

        <View style={styles.infoConsulta}>

          <Text style={styles.tituloConsulta}>
            Consulta agendada
          </Text>

          <Text style={styles.textoConsulta}>
            👨‍⚕️ {consulta.medico || "Médico não informado"}
          </Text>

          <Text style={styles.textoConsulta}>
            📅 {consulta.data_consulta}
          </Text>

          <Text style={styles.textoConsulta}>
            🕐 {consulta.horario}
          </Text>

        </View>

      </View>

      <View style={styles.avisoConsulta}>

        <Text style={styles.textoAvisoConsulta}>
          Consulta marcada
        </Text>

      </View>

    </View>

  ))

)}

        {/* ==================================
            ATIVIDADES PENDENTES
        ================================== */}

        {pendentes.length === 0 ? (

          consultas.length === 0 && (

            <Text
              style={
                styles.nenhumaAtividade
              }
            >
              Nenhuma atividade pendente 🎉
            </Text>

          )

        ) : (

          pendentes.map(item => (

            <TouchableOpacity
              key={item.id}
              style={styles.cardSugestao}
            >

              <Text
                style={styles.textoSugestao}
              >
                {item.nome}
              </Text>

              <View
                style={styles.hojeBox}
              >

                <Text
                  style={styles.textoHoje}
                >
                  Hoje
                </Text>

              </View>

            </TouchableOpacity>

          ))

        )}

        {/* Espaço no final */}

        <View
          style={{
            height: 40
          }}
        />

      </ScrollView>

    </ImageBackground>
  );
}


// ========================================
// ESTILOS
// ========================================

const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },


  // ========================================
  // MENU
  // ========================================

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


  // ========================================
  // LOGO
  // ========================================

  logo: {
    width: 370,
    height: 200,

    resizeMode: 'contain',

    marginTop: -30,
    marginLeft: 20,
  },


  // ========================================
  // SAUDAÇÃO
  // ========================================

  textoBomDia: {
    fontSize: 24,

    color: '#000',

    marginTop: -10,
    marginLeft: 20,

    fontWeight: '400',
  },


  // ========================================
  // CARDS FIXOS
  // ========================================

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


  // ========================================
  // SUGESTÕES
  // ========================================

  tituloSugestao: {
    fontSize: 16,

    color: '#444',

    marginTop: 30,
    marginLeft: 25,

    fontWeight: '500',
  },


  // ========================================
  // CARD DA CONSULTA
  // ========================================

  cardConsulta: {
    width: 330,

    backgroundColor: '#FFFFFF',

    borderRadius: 15,

    alignSelf: 'center',

    marginTop: 15,

    padding: 15,

    borderWidth: 1,

    borderColor: '#9BC6B8',

    elevation: 3,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,

    shadowRadius: 4,
  },


  linhaConsulta: {
    flexDirection: 'row',

    alignItems: 'flex-start',
  },


  iconeConsulta: {
    fontSize: 30,

    marginRight: 12,
  },


  infoConsulta: {
    flex: 1,
  },


  tituloConsulta: {
    fontSize: 17,

    fontWeight: 'bold',

    color: '#4f5b8a',

    marginBottom: 8,
  },


  textoConsulta: {
    fontSize: 14,

    color: '#555',

    marginBottom: 5,
  },


  avisoConsulta: {
    marginTop: 10,

    backgroundColor: '#D9F0C7',

    borderRadius: 10,

    paddingVertical: 7,

    alignItems: 'center',
  },


  textoAvisoConsulta: {
    fontSize: 12,

    color: '#4f5b8a',

    fontWeight: 'bold',
  },


  // ========================================
  // ATIVIDADES
  // ========================================

  nenhumaAtividade: {
    textAlign: 'center',

    marginTop: 20,

    color: '#666',
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