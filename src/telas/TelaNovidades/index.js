import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

export default function TelaNovidades({ navigation }) {

  const [modalVisivel, setModalVisivel] = useState(false);
  const [conteudoModal, setConteudoModal] = useState({ titulo: '', itens: [] });

  // Lista de tópicos no formato de botões/cartões
  const topicos = [
    {
      id: 'dicas',
      titulo: 'Dicas de Bem-Estar',
      icone: '💡',
      cor: '#DCEFD8', // Verde suave
      itens: [
        { subtitulo: 'Respiração Guiada 🫁', texto: 'Tente respirar profundamente por 2 minutos (inspire por 4s, segure por 4s, expire por 6s) para acalmar a ansiedade.' },
        { subtitulo: 'Higiene do Sono 🌙', texto: 'Evite telas 30 minutos antes de dormir. Dormir 8 horas reduz significativamente o estresse.' },
        { subtitulo: 'Hidratação 🥤', texto: 'Beber água regularmente melhora o foco e reduz o cansaço mental.' },
      ],
    },
    {
      id: 'apoio',
      titulo: 'Canais de Apoio',
      icone: '🆘',
      cor: '#D2EFF2', // Azul pastel
      itens: [
        { subtitulo: 'CVV - Ligue 188 📞', texto: 'Apoio emocional gratuito e confidencial 24h por dia.' },
        { subtitulo: 'SAMU - Ligue 192 🚑', texto: 'Para emergências de saúde física ou crises graves.' },
        { subtitulo: 'Rede Local (UBS/CAPS) 🏥', texto: 'Procure a unidade de saúde mais próxima para apoio psicológico.' },
      ],
    },
    {
      id: 'metas',
      titulo: 'Metas e Hábitos',
      icone: '🔥',
      cor: '#E5E8F5', // Lilás claro
      itens: [
        { subtitulo: 'Meta da Semana 🎯', texto: 'Complete 5 atividades seguidas para fortalecer sua rotina.' },
        { subtitulo: 'Pequenas Vitórias 🏆', texto: 'Celebre até as menores tarefas concluídas no dia a dia.' },
      ],
    },
    {
      id: 'novidades',
      titulo: 'Novidades do App',
      icone: '🆕',
      cor: '#E3DDF7', // Roxo pastel
      itens: [
        { subtitulo: 'Registro Diário 📝', texto: 'Agora você pode registrar seu humor diário, ansiedade e tarefas ativas.' },
      ],
    },
    {
      id: 'motivacao',
      titulo: 'Frase do Dia',
      icone: '✨',
      cor: '#FCE4EC', // Rosa claro
      itens: [
        { subtitulo: 'Inspiração 💬', texto: '“Pequenos passos todos os dias levam a grandes mudanças.”' },
      ],
    },
    {
      id: 'ajuda',
      titulo: 'Como Usar',
      icone: '❓',
      cor: '#FFF2D6', // Amarelo pastel
      itens: [
        { subtitulo: 'Navegação 📱', texto: 'Utilize os botões da Home para alternar rapidamente entre o Registro, Atividades e Informativos.' },
      ],
    },
  ];

  const abrirCategoria = (item) => {
    setConteudoModal(item);
    setModalVisivel(true);
  };

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
        <Text style={styles.subtitulo}>Clique em uma das opções abaixo:</Text>

        {/* CONTAINER EM GRID/QUADROS */}
        <View style={styles.gridContainer}>
          {topicos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.cardGrid, { backgroundColor: item.cor }]}
              onPress={() => abrirCategoria(item)}
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

      {/* MODAL COM OS DETALHES DA INFORMAÇÃO */}
      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>
              {conteudoModal.icone} {conteudoModal.titulo}
            </Text>

            <ScrollView style={{ maxHeight: 300, width: '100%' }}>
              {conteudoModal.itens?.map((sub, index) => (
                <View key={index} style={styles.modalItem}>
                  <Text style={styles.modalSubtitulo}>{sub.subtitulo}</Text>
                  <Text style={styles.modalTexto}>{sub.texto}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.botaoFecharModal}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  /* ESTILOS DO MODAL */
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalConteudo: {
    backgroundColor: '#fff',
    width: 320,
    borderRadius: 25,
    padding: 22,
    alignItems: 'center',
    elevation: 5,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
    marginBottom: 15,
    textAlign: 'center',
  },

  modalItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 10,
  },

  modalSubtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6d9c7b',
  },

  modalTexto: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    lineHeight: 20,
  },

  botaoFecharModal: {
    backgroundColor: '#9BC6B8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 15,
  },

  textoBotaoFechar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});