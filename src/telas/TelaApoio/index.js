import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Modal,
  Pressable,
} from 'react-native';

export default function TelaApoio({ navigation }) {
  const [modalContatoVisivel, setModalContatoVisivel] = useState(false);

  // Função para realizar chamadas telefónicas diretas
  const fazerLigacao = (numero) => {
    Linking.openURL(`tel:${numero}`);
  };

  // Função para abrir links de chat
  const abrirLink = (url) => {
    Linking.openURL(url);
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
      <Text style={styles.titulo}>🆘 Canais de Apoio</Text>
      <Text style={styles.subtitulo}>
        Você não está sozinho. Se precisar de ajuda ou conversa imediata, utilize os canais gratuitos abaixo.
      </Text>

      {/* CARD DE DESTAQUE: CVV 188 */}
      <View style={styles.cardCvv}>
        <View style={styles.headerCvv}>
          <Text style={styles.tituloCvv}>💛 CVV - Centro de Valorização da Vida</Text>
          <Text style={styles.subtituloCvv}>Atendimento gratuito, anônimo e 24 horas por dia.</Text>
        </View>

        <Text style={styles.descricaoCvv}>
          Apoio emocional e prevenção do suicídio para todas as pessoas que precisam conversar sob total sigilo.
        </Text>

        <View style={styles.botoesCvvGrid}>
          <TouchableOpacity
            style={styles.botaoLigarCvv}
            onPress={() => fazerLigacao('188')}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoLigar}>📞 Ligar 188</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoChatCvv}
            onPress={() => abrirLink('https://www.cvv.org.br/chat/')}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoChat}>💬 Abrir Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SEÇÃO 1: EMERGÊNCIAS MÉDICAS */}
      <View style={[styles.card, { backgroundColor: '#FFEBEE' }]}>
        <Text style={styles.cardTitulo}>🚨 Emergências de Saúde (24h)</Text>
        <Text style={styles.cardDescricao}>
          Para crises graves, falta de ar física persistente ou episódios de dor intensa no peito:
        </Text>

        <TouchableOpacity
          style={styles.itemEmergencia}
          onPress={() => fazerLigacao('192')}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.nomeEmergencia}>SAMU - Serviço de Atendimento Móvel</Text>
            <Text style={styles.numeroEmergencia}>Ligue 192</Text>
          </View>
          <Text style={styles.iconeAcao}>📞</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemEmergencia}
          onPress={() => fazerLigacao('193')}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.nomeEmergencia}>Corpo de Bombeiros</Text>
            <Text style={styles.numeroEmergencia}>Ligue 193</Text>
          </View>
          <Text style={styles.iconeAcao}>📞</Text>
        </TouchableOpacity>
      </View>

      {/* SEÇÃO 2: APOIO JOVEM E ONLINE */}
      <View style={[styles.card, { backgroundColor: '#E3F2FD' }]}>
        <Text style={styles.cardTitulo}>💬 Plataformas de Apoio Digital</Text>
        <Text style={styles.cardDescricao}>
          Canais de escuta ativa e acolhimento focados no bem-estar emocional:
        </Text>

        <TouchableOpacity
          style={styles.itemPlataforma}
          onPress={() => abrirLink('https://www.podefalar.org.br/')}
          activeOpacity={0.7}
        >
          <Text style={styles.nomePlataforma}>🌐 Pode Falar (UNICEF)</Text>
          <Text style={styles.descPlataforma}>Canal de ajuda anônimo para adolescentes e jovens via WhatsApp e Web.</Text>
        </TouchableOpacity>
      </View>

      {/* SEÇÃO 3: CAPS E ATENDIMENTO PÚBLICO */}
      <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
        <Text style={styles.cardTitulo}>🏛️ Acolhimento Presencial (SUS)</Text>
        <Text style={styles.cardDescricao}>
          O SUS oferece atendimento psicológico e psiquiátrico gratuito através dos **CAPS** (Centros de Atenção Psicossocial) e **UBS** (Unidades Básicas de Saúde).
        </Text>
        <Text style={styles.bullet}>
          • **Como funciona?** Você pode ir diretamente ao CAPS da sua cidade sem necessidade de encaminhamento prévio para passar por acolhimento.
        </Text>
      </View>

      {/* SEÇÃO 4: REDE DE APOIO PESSOAL */}
      <View style={[styles.card, { backgroundColor: '#FFF3E0' }]}>
        <Text style={styles.cardTitulo}>👥 Sua Rede de Confiança</Text>
        <Text style={styles.cardDescricao}>
          Mantenha por perto o número de um amigo, familiar ou terapeuta que saiba como te acolher em momentos difíceis.
        </Text>
        <TouchableOpacity
          style={styles.botaoRedePessoal}
          onPress={() => setModalContatoVisivel(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotaoRede}>💡 Dicas para conversar com alguém querido</Text>
        </TouchableOpacity>
      </View>

      {/* ESPAÇAMENTO FINAL */}
      <View style={styles.espacoFinal} />

      {/* MODAL ORIENTAÇÃO PESSOAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalContatoVisivel}
        onRequestClose={() => setModalContatoVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>🤝 Como pedir ajuda a um amigo?</Text>

            <Text style={styles.modalTexto}>
              Você não precisa explicar tudo o que está sentindo. Pode apenas enviar uma mensagem simples como:
            </Text>

            <View style={styles.caixaExemploMensagem}>
              <Text style={styles.textoExemplo}>
                "Estou passando por um momento de ansiedade agora. Você pode conversar comigo por alguns minutos?"
              </Text>
            </View>

            <Pressable
              style={styles.botaoFecharModal}
              onPress={() => setModalContatoVisivel(false)}
            >
              <Text style={styles.textoFecharModal}>Entendi</Text>
            </Pressable>
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

  /* STYLES DO CARD CVV */
  cardCvv: {
    backgroundColor: '#FFFDE7',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFF59D',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  headerCvv: {
    marginBottom: 8,
  },

  tituloCvv: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57F17',
  },

  subtituloCvv: {
    fontSize: 12,
    color: '#FBC02D',
    fontWeight: '600',
    marginTop: 2,
  },

  descricaoCvv: {
    fontSize: 13,
    color: '#555',
    marginBottom: 14,
    lineHeight: 18,
  },

  botoesCvvGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  botaoLigarCvv: {
    backgroundColor: '#FBC02D',
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoLigar: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  botaoChatCvv: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FBC02D',
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoChat: {
    color: '#F57F17',
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* CARD PADRÃO */
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },

  cardDescricao: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
    lineHeight: 18,
  },

  itemEmergencia: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  nomeEmergencia: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#C62828',
  },

  numeroEmergencia: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  iconeAcao: {
    fontSize: 18,
  },

  itemPlataforma: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
  },

  nomePlataforma: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
  },

  descPlataforma: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },

  bullet: {
    fontSize: 13,
    color: '#444',
    lineHeight: 19,
  },

  botaoRedePessoal: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  textoBotaoRede: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E65100',
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

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },

  modalTexto: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 19,
  },

  caixaExemploMensagem: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0288D1',
    width: '100%',
    marginBottom: 20,
  },

  textoExemplo: {
    fontSize: 13,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 18,
  },

  botaoFecharModal: {
    backgroundColor: '#0288D1',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  textoFecharModal: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});