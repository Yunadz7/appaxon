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

export default function TelaComoUsar({ navigation }) {
  const [secaoAtiva, setSecaoAtiva] = useState(null);

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
      <Text style={styles.titulo}>📖 Como Usar o AXON</Text>
      <Text style={styles.subtitulo}>
        Aprenda a posicionar o dedo no sensor, conectar o dispositivo e garantir leituras precisas de BPM e SpO2.
      </Text>

      {/* PASSO 1: POSICIONAMENTO NO SENSOR */}
      <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
        <Text style={styles.cardTitulo}>1. Posicionamento do Dedo no Sensor</Text>
        <Text style={styles.cardDescricao}>
          O sensor MAX30102 usa feixes de luz infravermelha para medir a pulsação no seu dedo.
        </Text>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(1)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 1 ? 'Recolher Dicas' : 'Ver Instruções'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 1 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.passo}>
              👉 **Toque Suave:** Apoie a ponta do indicador suavemente sobre o LED vermelho do sensor. Não aperte forte.
            </Text>
            <Text style={styles.passo}>
              🛑 **Mão Parada:** Mantenha a mão apoiada na mesa. Movimentos causam ruído no sinal e geram leituras incorretas.
            </Text>
            <Text style={styles.passo}>
              🌡️ **Mãos Aquecidas:** Mãos muito frias contraem os vasos e dificultam a leitura. Esfregue as mãos antes de medir.
            </Text>
          </View>
        )}
      </View>

      {/* PASSO 2: CONEXÃO COM O ESP32 */}
      <View style={[styles.card, { backgroundColor: '#E3F2FD' }]}>
        <Text style={styles.cardTitulo}>2. Conectando o Dispositivo AXON</Text>
        <Text style={styles.cardDescricao}>
          Como sincronizar a placa ESP32 com o seu aplicativo.
        </Text>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(2)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 2 ? 'Recolher Passo a Passo' : 'Ver Passo a Passo'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 2 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.passo}>1. Ligue o dispositivo AXON no botão de energia.</Text>
            <Text style={styles.passo}>2. Certifique-se de que o Bluetooth / Wi-Fi do celular está ligado.</Text>
            <Text style={styles.passo}>3. No aplicativo, acesse a aba **Conexão** para parear o dispositivo.</Text>
            <Text style={styles.passo}>4. Aguarde o LED de status piscar indicando sinal estável.</Text>
          </View>
        )}
      </View>

      {/* PASSO 3: ENTENDENDO OS DADOS */}
      <View style={[styles.card, { backgroundColor: '#F3E5F5' }]}>
        <Text style={styles.cardTitulo}>3. Como Entender seus Resultados</Text>
        <Text style={styles.cardDescricao}>
          Entenda a diferença entre o que o sensor mede e o que você sente.
        </Text>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(3)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 3 ? 'Ocultar Explicação' : 'Entender Métrica'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 3 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>
              ❤️ **BPM (Batimentos por Minuto):** Em repouso, o valor normal varia entre 60 e 100 BPM. Em picos de ansiedade, pode ultrapassar 100 BPM temporariamente.
            </Text>
            <Text style={styles.bullet}>
              🫁 **SpO2 (Oxigenação do Sangue):** Valores normais ficam entre 95% e 100%. A sensação de falta de ar na ansiedade ocorre pela respiração curta, não por falta de oxigênio real.
            </Text>
          </View>
        )}
      </View>

      {/* PASSO 4: RESOLUÇÃO DE PROBLEMAS */}
      <View style={[styles.card, { backgroundColor: '#FFF3E0' }]}>
        <Text style={styles.cardTitulo}>🛠️ Resolução de Problemas Comuns</Text>
        <Text style={styles.cardDescricao}>
          O sensor não lê ou os valores parecem oscilar demais?
        </Text>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => toggleSecao(4)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {secaoAtiva === 4 ? 'Ocultar Soluções' : 'Ver Soluções'}
          </Text>
        </TouchableOpacity>

        {secaoAtiva === 4 && (
          <View style={styles.conteudoExpandido}>
            <Text style={styles.bullet}>
              🔍 **Leitura Zerada ou Inconstante:** Limpe a superfície do sensor com um pano seco e ajuste o dedo sem pressionar demais.
            </Text>
            <Text style={styles.bullet}>
              ☀️ **Excesso de Luz Ambienta:** Evite usar o sensor sob luz solar direta forte apontada para a lente óptica.
            </Text>
            <Text style={styles.bullet}>
              🔋 **Bateria Fraca:** Se o LED do ESP32 estiver fraco, recarregue o dispositivo.
            </Text>
          </View>
        )}
      </View>

      {/* ESPAÇAMENTO FINAL */}
      <View style={styles.espacoFinal} />
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

  espacoFinal: {
    height: 60,
    width: '100%',
  },
});