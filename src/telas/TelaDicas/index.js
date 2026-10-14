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

export default function TelaDicas({ navigation }) {
  const [secaoAtiva, setSecaoAtiva] = useState(null);
  const [modalSosVisivel, setModalSosVisivel] = useState(false);

  const toggleSecao = (id) => {
    setSecaoAtiva((atual) => (atual === id ? null : id));
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
      <Text style={styles.titulo}>💡 Dicas & Apoio Emocional</Text>
      <Text style={styles.subtitulo}>
        Recursos práticos, técnicas de regulação do sistema nervoso e informações para lidar com a ansiedade no AXON.
      </Text>

      {/* BOTÃO SOS */}
      <TouchableOpacity
        style={styles.botaoSos}
        onPress={() => setModalSosVisivel(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoSos}>
          ⚡ Preciso de Alívio Agora (Modo Crise)
        </Text>
      </TouchableOpacity>

      {/* SEÇÃO 1: RESPIRAÇÃO */}
      <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
        <Text style={styles.cardTitulo}>🫁 Técnicas de Respiração Guiada</Text>
        <Text style={styles.cardDescricao}>
          Exercícios comprovados para ativar o sistema parassimpático e desacelerar os batimentos cardíacos.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(1)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 1 ? 'Recolher Exercícios' : 'Ver Exercícios'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 1 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.subtopico}>🔹 Respiração 4-7-8 (Alívio Rápido):</Text>
            <Text style={styles.passo}>1. Inspire pelo nariz durante **4 segundos**.</Text>
            <Text style={styles.passo}>2. Retenha o ar nos pulmões por **7 segundos**.</Text>
            <Text style={styles.passo}>3. Solte todo o ar pela boca suavemente por **8 segundos**.</Text>

            <View style={styles.divisor} />

            <Text style={styles.subtopico}>🔹 Respiração Quadrada (Foco e Estabilidade):</Text>
            <Text style={styles.passo}>
              Inspire (4s) ➔ Segure (4s) ➔ Expire (4s) ➔ Segure sem ar (4s).
            </Text>

            <Text style={styles.aviso}>
              Se sentir tontura ou leveza na cabeça, retorne imediatamente à sua respiração natural.
            </Text>
          </View>
        )}
      </View>

      {/* SEÇÃO 2: ANCORAGEM (GROUNDING) */}
      <View style={[styles.card, { backgroundColor: '#E3F2FD' }]}>
        <Text style={styles.cardTitulo}>🧘 Ancoragem Sensorial (Técnica 5-4-3-2-1)</Text>
        <Text style={styles.cardDescricao}>
          Direciona a atenção do cérebro para o ambiente físico, cortando o ciclo de pensamentos acelerados.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(2)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 2 ? 'Recolher Ancoragem' : 'Iniciar Ancoragem'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 2 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.passo}>👀 **5 coisas** que você consegue ver ao seu redor agora.</Text>
            <Text style={styles.passo}>✋ **4 coisas** que você pode tocar (ex: sua roupa, a mesa, suas mãos).</Text>
            <Text style={styles.passo}>🎧 **3 sons** que consegue escutar no ambiente.</Text>
            <Text style={styles.passo}>👃 **2 cheiros** que consegue identificar no ar.</Text>
            <Text style={styles.passo}>👅 **1 sabor** que consegue notar na boca.</Text>
          </View>
        )}
      </View>

      {/* SEÇÃO 3: FISIOLOGIA DA ANSIEDADE */}
      <View style={[styles.card, { backgroundColor: '#F3E5F5' }]}>
        <Text style={styles.cardTitulo}>🧠 O que acontece com o corpo na Ansiedade?</Text>
        <Text style={styles.cardDescricao}>
          Entenda como os sinais lidos pelo dispositivo se relacionam com as suas emoções.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(3)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 3 ? 'Ocultar Explicação' : 'Ler Explicação'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 3 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>
              • **Por que o BPM sobe?** Em momentos de estresse, o sistema nervoso simpático libera adrenalina, preparando o corpo para reagir.
            </Text>
            <Text style={styles.bullet}>
              • **Por que a SpO2 fica normal (95%-100%)?** A respiração rápida (hiperventilação) faz você colocar bastante oxigênio para dentro. O fôlego curto é uma reação nervosa, não uma falta física de ar.
            </Text>
            <Text style={styles.bullet}>
              • **Mãos frias:** A ansiedade contrai vasos sanguíneos das extremidades, o que pode dificultar a leitura do sensor nos primeiros segundos.
            </Text>
          </View>
        )}
      </View>

      {/* SEÇÃO 4: NOVO - SONO E ANSIEDADE */}
      <View style={[styles.card, { backgroundColor: '#E0F7FA' }]}>
        <Text style={styles.cardTitulo}>💤 Qualidade do Sono e Frequência Cardíaca</Text>
        <Text style={styles.cardDescricao}>
          Como a privação do sono afeta diretamente os seus picos de BPM durante o dia.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(4)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 4 ? 'Ocultar Dicas' : 'Ver Dicas de Sono'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 4 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>
              • **BPM de Repouso Elevado:** Uma noite mal dormida mantém o cortisol alto no dia seguinte, fazendo o coração bater mais rápido mesmo em repouso.
            </Text>
            <Text style={styles.bullet}>
              • **Telas antes de dormir:** A luz azul do celular inibe a melatonina e deixa o cérebro em estado de alerta.
            </Text>
            <Text style={styles.bullet}>
              • **Rotina de Desconexão:** Tente desacelerar 30 minutos antes de deitar com iluminação fraca ou música suave.
            </Text>
          </View>
        )}
      </View>

      {/* SEÇÃO 5: NOVO - ESTIMULANTES E ALIMENTAÇÃO */}
      <View style={[styles.card, { backgroundColor: '#FFF8E1' }]}>
        <Text style={styles.cardTitulo}>☕ Café, Energéticos e Falsos Alarmes</Text>
        <Text style={styles.cardDescricao}>
          Saiba como substâncias do dia a dia podem simular sintomas físicos de ansiedade.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(5)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 5 ? 'Ocultar Alertas' : 'Ver Alertas'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 5 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>
              ⚡ **Efeito da Cafeína:** O excesso de café ou pré-treinos pode elevar o BPM para mais de 90 em repouso, desencadeando a sensação de agitação sem motivo emocional.
            </Text>
            <Text style={styles.bullet}>
              💧 **Desidratação:** Quando você bebe pouca água, o volume de sangue diminui e o coração precisa bater mais rápido para compensar.
            </Text>
            <Text style={styles.bullet}>
              🍬 **Picos de Açúcar:** Alimentos ricos em açúcar refinado causam oscilações rápidas na glicemia, gerando tremores leves similares à ansiedade.
            </Text>
          </View>
        )}
      </View>

      {/* SEÇÃO 6: NOVO - EXERCÍCIO VS ANSIEDADE */}
      <View style={[styles.card, { backgroundColor: '#F1F8E9' }]}>
        <Text style={styles.cardTitulo}>🏃 Exercício Físico vs. Crise de Ansiedade</Text>
        <Text style={styles.cardDescricao}>
          Aprenda a diferenciar o BPM alto saudável do BPM induzido pelo estresse.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(6)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 6 ? 'Ocultar Comparativo' : 'Ver Comparativo'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 6 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>
              🚴 **BPM no Exercício:** Sobe devido ao esforço muscular. A respiração fica mais funda e o corpo produz sensação de cansaço positivo.
            </Text>
            <Text style={styles.bullet}>
              😰 **BPM na Ansiedade:** Sobe repentinamente sem esforço físico prévio. Acompanhado de pensamentos acelerados, mãos suadas ou sensação de aperto no peito.
            </Text>
            <Text style={styles.bullet}>
              💡 **Dica AXON:** Se o BPM subiu e você estava parado, aplique imediatamente a *Respiração 4-7-8*.
            </Text>
          </View>
        )}
      </View>

      {/* SEÇÃO 7: ESTÍMULOS FÍSICOS E REGULAÇÃO */}
      <View style={[styles.card, { backgroundColor: '#FFF3E0' }]}>
        <Text style={styles.cardTitulo}>🧊 Estímulos Físicos para o Nervo Vago</Text>
        <Text style={styles.cardDescricao}>
          Pequenas ações físicas para enviar um sinal direto de desaceleração para o coração.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(7)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 7 ? 'Recolher Dicas' : 'Ver Dicas'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 7 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>💧 **Água Fria no Rosto:** Molhe o rosto com água gelada ou coloque uma compressa fria no pescoço para ativar o reflexo de imersão.</Text>
            <Text style={styles.bullet}>🎧 **Som de Frequência Baixa:** Ruído marrom ou sons de chuva ajudam a estabilizar a resposta auditiva do cérebro.</Text>
            <Text style={styles.bullet}>🖐️ **Compressão do Tórax:** Coloque uma mão firme no centro do peito para trazer sensação de segurança física.</Text>
          </View>
        )}
      </View>

      {/* SEÇÃO 8: O QUE EVITAR NA CRISE */}
      <View style={[styles.card, { backgroundColor: '#FFEBEE' }]}>
        <Text style={styles.cardTitulo}>⚠️ O que NÃO fazer durante uma crise</Text>
        <Text style={styles.cardDescricao}>
          Atitudes comuns que podem prolongar a sensação de desconforto sem percebermos.
        </Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(8)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 8 ? 'Recolher Avisos' : 'Ver Avisos'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 8 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>❌ **Não force o ar para dentro com violência:** Tentar encher o peito com muita força aumenta a hiperventilação e a tontura.</Text>
            <Text style={styles.bullet}>❌ **Evite olhar constantemente para os números:** Ficar checando o BPM a cada segundo aumenta o estado de alerta.</Text>
            <Text style={styles.bullet}>❌ **Não lide com o momento sozinho:** Se o desconforto continuar, use a tela de *Canais de Apoio* do app.</Text>
          </View>
        )}
      </View>

      {/* ESPAÇAMENTO FINAL */}
      <View style={styles.espacoFinal} />

      {/* MODAL SOS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSosVisivel}
        onRequestClose={() => setModalSosVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>🌱 Vamos com Calma!</Text>

            <Text style={styles.modalTexto}>
              Você está em um ambiente seguro. Esta sensação é desconfortável, mas ela é temporária e vai passar.
            </Text>

            <View style={styles.caixaInstrucaoSos}>
              <Text style={styles.textoContador}>INSPIRE... (4s)</Text>
              <Text style={styles.textoContadorSub}>
                Solte o ar devagar pela boca, sem pressa.
              </Text>
            </View>

            <Pressable
              style={styles.botaoFecharModal}
              onPress={() => setModalSosVisivel(false)}
            >
              <Text style={styles.textoFecharModal}>Estou Mais Calmo / Fechar</Text>
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

  botaoSos: {
    backgroundColor: '#E74C3C',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  textoBotaoSos: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

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

  botaoAcao: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  textoBotao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  conteudoExpandido: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },

  subtopico: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },

  passo: {
    fontSize: 13,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },

  bullet: {
    fontSize: 13,
    color: '#444',
    marginBottom: 10,
    lineHeight: 20,
  },

  aviso: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  divisor: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 10,
  },

  espacoFinal: {
    height: 60,
    width: '100%',
  },

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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 8,
    textAlign: 'center',
  },

  modalTexto: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 21,
  },

  caixaInstrucaoSos: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  textoContador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },

  textoContadorSub: {
    fontSize: 13,
    color: '#4CAF50',
    marginTop: 6,
    lineHeight: 19,
    textAlign: 'center',
  },

  botaoFecharModal: {
    backgroundColor: '#27AE60',
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