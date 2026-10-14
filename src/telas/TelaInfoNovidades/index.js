import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

export default function TelaInfoNovidades({ navigation }) {
  const [modalDetalheVisivel, setModalDetalheVisivel] = useState(false);
  const [novidadeSelecionada, setNovidadeSelecionada] = useState(null);

  const novidades = [
    {
      id: 1,
      versao: 'v2.4',
      data: 'Atualização Recente',
      tag: 'NOVO',
      corTag: '#E8F5E9',
      textoTag: '#2E7D32',
      titulo: 'Leitura Mais Estável no Sensor',
      resumo: 'Melhoramos a leitura dos batimentos para evitar saltos ou valores errados ao mover o dedo.',
      detalhes: 'Agora o app analisa os batimentos de forma mais inteligente. Ele ignora pequenos tremores ou movimentações do dedo, mostrando um valor de BPM muito mais calmo e preciso no visor.',
    },
    {
      id: 2,
      versao: 'v2.3',
      data: 'Lembretes',
      tag: 'NOVO RECURSO',
      corTag: '#E3F2FD',
      textoTag: '#1565C0',
      titulo: 'Avisos de Pausa e Respiração',
      resumo: 'Lembretes suaves durante o dia para você parar um minuto e respirar fundo.',
      detalhes: 'Você pode receber avisos curtos nos horários mais corridos do seu dia. O aplicativo lembra você de soltar os ombros, beber um copo de água ou fazer uma pausa rápida para evitar que a ansiedade se acumule.',
    },
    {
      id: 3,
      versao: 'v2.2',
      data: 'Bem-Estar',
      tag: 'CONTEÚDO',
      corTag: '#FFF3E0',
      textoTag: '#E65100',
      titulo: 'Módulo de Apoio Emocional & Crise',
      resumo: 'Inclusão do botão SOS de alívio imediato, técnicas de respiração 4-7-8 e mapeamento do nervo vago.',
      detalhes: 'Adicionamos um conjunto de ferramentas científicas para regulação do sistema nervoso parassimpático, ajudando a desacelerar o ritmo cardíaco em episódios de ansiedade elevada.',
    },
  ];

  const abrirDetalhes = (item) => {
    setNovidadeSelecionada(item);
    setModalDetalheVisivel(true);
  };

  return (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.scrollConteudo}
      showsVerticalScrollIndicator={true}
      bounces={true}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
    >
      {/* BOTÃO VOLTAR */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.navigate('TelaNovidades')}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotaoVoltar}>← Voltar para Informativos</Text>
      </TouchableOpacity>

      {/* CABEÇALHO */}
      <Text style={styles.titulo}>🆕 Novidades do AXON</Text>
      <Text style={styles.subtitulo}>
        Acompanhe as últimas melhorias no firmware do hardware, correções de desempenho e novas funcionalidades do aplicativo.
      </Text>

      {/* LISTA DE NOVIDADES */}
      {novidades.map((item) => (
        <View key={item.id} style={styles.cardNovidade}>
          <View style={styles.headerNovidade}>
            <View style={[styles.badgeTag, { backgroundColor: item.corTag }]}>
              <Text style={[styles.textoBadgeTag, { color: item.textoTag }]}>
                {item.tag}
              </Text>
            </View>
            <Text style={styles.versaoTexto}>{item.versao} • {item.data}</Text>
          </View>

          <Text style={styles.tituloNovidade}>{item.titulo}</Text>
          <Text style={styles.resumoNovidade}>{item.resumo}</Text>

          <TouchableOpacity
            style={styles.botaoSaberMais}
            onPress={() => abrirDetalhes(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.textoSaberMais}>Ver Detalhes da Atualização →</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* CAIXA DE NOTA DE VERSÃO */}
      <View style={styles.cardProximasAtt}>
        <Text style={styles.tituloProximas}>🚀 Em Breve no AXON</Text>
        <Text style={styles.bullet}>• Notificações inteligentes ao detectar BPM elevado constante.</Text>
      </View>

      {/* ESPAÇAMENTO FINAL */}
      <View style={styles.espacoFinal} />

      {/* MODAL DETALHES */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDetalheVisivel}
        onRequestClose={() => setModalDetalheVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {novidadeSelecionada && (
              <>
                <Text style={styles.modalVersao}>{novidadeSelecionada.versao}</Text>
                <Text style={styles.modalTitulo}>{novidadeSelecionada.titulo}</Text>

                <View style={styles.caixaTextoDetalhe}>
                  <Text style={styles.modalDetalheTexto}>
                    {novidadeSelecionada.detalhes}
                  </Text>
                </View>

                <Pressable
                  style={styles.botaoFecharModal}
                  onPress={() => setModalDetalheVisivel(false)}
                >
                  <Text style={styles.textoFecharModal}>Fechar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    width: '100%',
  },

  scrollConteudo: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  },

  botaoVoltar: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ECEFF1',
    borderRadius: 8,
    marginBottom: 16,
  },

  textoBotaoVoltar: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
    lineHeight: 20,
  },

  /* CARD NOVIDADE */
  cardNovidade: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },

  headerNovidade: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  badgeTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  textoBadgeTag: {
    fontSize: 11,
    fontWeight: 'bold',
  },

  versaoTexto: {
    fontSize: 12,
    color: '#90A4AE',
    fontWeight: '600',
  },

  tituloNovidade: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },

  resumoNovidade: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
    lineHeight: 18,
  },

  botaoSaberMais: {
    alignSelf: 'flex-start',
  },

  textoSaberMais: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5E35B1',
  },

  /* PRÓXIMAS ATUALIZAÇÕES */
  cardProximasAtt: {
    backgroundColor: '#F3E5F5',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  tituloProximas: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 8,
  },

  bullet: {
    fontSize: 13,
    color: '#4A148C',
    marginBottom: 6,
    lineHeight: 18,
  },

  espacoFinal: {
    height: 60,
    width: '100%',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 450,
    alignItems: 'center',
    elevation: 5,
  },

  modalVersao: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7E57C2',
    backgroundColor: '#EDE7F6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 14,
    textAlign: 'center',
  },

  caixaTextoDetalhe: {
    backgroundColor: '#FAFAFA',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },

  modalDetalheTexto: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
  },

  botaoFecharModal: {
    backgroundColor: '#5E35B1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  textoFecharModal: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});