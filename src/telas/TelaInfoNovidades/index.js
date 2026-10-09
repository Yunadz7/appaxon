import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function TelaNovidades({ navigation }) {

  // Lista de tópicos sem a opção "Novidades do App"
  const topicos = [
    {
      id: 'dicas',
      titulo: 'Dicas de Bem-Estar',
      icone: '💡',
      cor: '#DCEFD8', // Verde suave
      tela: 'TelaDicas',
    },
    {
      id: 'apoio',
      titulo: 'Canais de Apoio',
      icone: '🆘',
      cor: '#D2EFF2', // Azul pastel
      tela: 'TelaApoio',
    },
    {
      id: 'metas',
      titulo: 'Metas e Hábitos',
      icone: '🔥',
      cor: '#E5E8F5', // Lilás claro
      tela: 'TelaMetas',
    },
    {
      id: 'motivacao',
      titulo: 'Frase do Dia',
      icone: '✨',
      cor: '#FCE4EC', // Rosa claro
      tela: 'TelaMotivacao',
    },
    {
      id: 'ajuda',
      titulo: 'Como Usar',
      icone: '❓',
      cor: '#FFF2D6', // Amarelo pastel
      tela: 'TelaComoUsar',
    },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>Informativos & Dicas</Text>
        <Text style={styles.subtitulo}>Selecione uma categoria:</Text>

        {/* GRID DE BOTÕES */}
        <View style={styles.gridContainer}>
          {topicos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.cardGrid, { backgroundColor: item.cor }]}
              onPress={() => navigation.navigate(item.tela)}
              activeOpacity={0.8}
            >
              <Text style={styles.iconeGrid}>{item.icone}</Text>
              <Text style={styles.textoCardGrid}>{item.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTÃO VOLTAR */}
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Tela1')}
        >
          <Text style={styles.textoBotao}>Voltar para Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  scroll: {
    paddingBottom: 120,
  },

  titulo: {
    fontSize: 28,
    color: '#555',
    marginTop: 70,
    marginLeft: 25,
    fontWeight: '700',
  },

  subtitulo: {
    fontSize: 15,
    color: '#777',
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 20,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  cardGrid: {
    width: 145,
    height: 120,
    borderRadius: 22,
    padding: 15,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconeGrid: {
    fontSize: 28,
    marginBottom: 8,
  },

  textoCardGrid: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },

  botao: {
    backgroundColor: '#9BC6B8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 220,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 20,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});