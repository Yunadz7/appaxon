import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  Keyboard,
} from 'react-native';

export default function TelaMotivacao({ navigation }) {
  // Base de dados de frases categorizadas por estado emocional
  const bancoFrases = {
    ansioso: [
      "A ansiedade é apenas um alarme falso do seu corpo. Você está em segurança agora.",
      "Você não precisa controlar tudo neste exato segundo. Deixe o momento fluir.",
      "O seu corpo sabe como voltar à calma. Confia no ritmo da sua respiração.",
    ],
    cansado: [
      "Não precisa carregar o mundo nas costas. Resolva apenas a tarefa que está à sua frente.",
      "Fazer uma pausa não é perder tempo, é recarregar a sua energia.",
      "Dizer 'não' a excessos é dizer 'sim' à sua saúde mental e física.",
    ],
    inseguro: [
      "Você já superou 100% dos seus dias difíceis. Tem mais força do que imagina.",
      "Erros e pausas não anulam o seu valor. Continue no seu próprio ritmo.",
      "Trate-se hoje com o mesmo carinho e paciência que daria a um amigo querido.",
    ],
    foco: [
      "Sinta os seus pés firmes no chão. Traga a sua mente de volta para o presente.",
      "Um passo pequeno de cada vez constrói o seu caminho com clareza.",
      "Sintonize a sua atenção no aqui e agora. O passado já foi, o futuro virá a seu tempo.",
    ],
  };

  const [categoriaAtiva, setCategoriaAtiva] = useState('ansioso');
  const [indiceFrase, setIndiceFrase] = useState(0);
  const [passosRespiracao, setPassosRespiracao] = useState(0);

  // Estado para afirmação personalizada
  const [afirmacaoPessoal, setAfirmacaoPessoal] = useState('');
  const [afirmacaoSalva, setAfirmacaoSalva] = useState(null);

  // Trocar de frase dentro da mesma categoria
  const proximaFrase = () => {
    const lista = bancoFrases[categoriaAtiva];
    const proximo = (indiceFrase + 1) % lista.length;
    setIndiceFrase(proximo);
    setPassosRespiracao(0);
  };

  // Mudar categoria
  const trocarCategoria = (cat) => {
    setCategoriaAtiva(cat);
    setIndiceFrase(0);
    setPassosRespiracao(0);
  };

  // Partilhar frase
  const partilhar = async () => {
    try {
      await Share.share({
        message: `"${bancoFrases[categoriaAtiva][indiceFrase]}" — AXON`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const salvarAfirmacao = () => {
    if (afirmacaoPessoal.trim() !== '') {
      setAfirmacaoSalva(afirmacaoPessoal);
      setAfirmacaoPessoal('');
      Keyboard.dismiss();
    }
  };

  const fraseAtual = bancoFrases[categoriaAtiva][indiceFrase];

  return (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.scrollConteudo}
      showsVerticalScrollIndicator={true}
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
      <Text style={styles.titulo}>✨ Lembretes & Afirmações</Text>
      <Text style={styles.subtitulo}>
        Escolha como está se sentindo para receber uma orientação rápida e criar a sua própria afirmação do dia.
      </Text>

      {/* SELETOR DE ESTADO EMOCIONAL */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.containerMoods}
      >
        {[
          { key: 'ansioso', label: '😰 Ansioso' },
          { key: 'cansado', label: '🫨 Cansado' },
          { key: 'inseguro', label: '💙 Inseguro' },
          { key: 'foco', label: '🧘 Preciso de Foco' },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.chipMood,
              categoriaAtiva === item.key && styles.chipMoodAtivo,
            ]}
            onPress={() => trocarCategoria(item.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.textoChipMood,
                categoriaAtiva === item.key && styles.textoChipMoodAtivo,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CARD PRINCIPAL DA FRASE */}
      <View style={styles.cardFrase}>
        <Text style={styles.simboloAspas}>“</Text>
        <Text style={styles.textoFrasePrincipal}>{fraseAtual}</Text>

        {/* EXERCÍCIO RÁPIDO DE RESPIRAÇÃO INCORPORADO */}
        <TouchableOpacity
          style={styles.caixaRespiracao}
          onPress={() => setPassosRespiracao((prev) => (prev < 3 ? prev + 1 : 0))}
          activeOpacity={0.8}
        >
          <Text style={styles.textoRespiracao}>
            {passosRespiracao === 0 && '🫁 Toque aqui para 3 respirações guiadas'}
            {passosRespiracao === 1 && '1. Inspire devagar pelo nariz... (Segure 3s)'}
            {passosRespiracao === 2 && '2. Solte todo o ar pela boca suavemente...'}
            {passosRespiracao === 3 && '✨ Muito bem! Sinta o seu corpo retornar ao ritmo.'}
          </Text>
        </TouchableOpacity>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.gridAcoes}>
          <TouchableOpacity
            style={styles.botaoAcaoSecundario}
            onPress={partilhar}
            activeOpacity={0.7}
          >
            <Text style={styles.textoAcaoSecundario}>📤 Partilhar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoAcaoPrincipal}
            onPress={proximaFrase}
            activeOpacity={0.8}
          >
            <Text style={styles.textoAcaoPrincipal}>Nova Frase 🎲</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SEÇÃO INTERATIVA: MINHA AFIRMAÇÃO PESSOAL */}
      <View style={styles.cardAfirmacao}>
        <Text style={styles.tituloAfirmacao}>✍️ Escreva o seu Lembrete Pessoal</Text>
        <Text style={styles.descAfirmacao}>
          O que você precisa dizer a si mesmo hoje?
        </Text>

        <TextInput
          style={styles.inputAfirmacao}
          placeholder="Ex: Hoje vou fazer as coisas no meu tempo..."
          placeholderTextColor="#90A4AE"
          value={afirmacaoPessoal}
          onChangeText={setAfirmacaoPessoal}
        />

        <TouchableOpacity
          style={styles.botaoSalvarAfirmacao}
          onPress={salvarAfirmacao}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoSalvar}>Guardar Afirmação</Text>
        </TouchableOpacity>

        {afirmacaoSalva && (
          <View style={styles.caixaAfirmacaoSalva}>
            <Text style={styles.tituloSalvo}>🌟 Sua Afirmação de Hoje:</Text>
            <Text style={styles.textoSalvo}>"{afirmacaoSalva}"</Text>
          </View>
        )}
      </View>

      {/* DICA FISIOLÓGICA */}
      <View style={styles.cardInfo}>
        <Text style={styles.tituloInfo}>🧠 Por que isto ajuda?</Text>
        <Text style={styles.textoInfo}>
          Ler frases de acolhimento e escrever o seu próprio pensamento interrompe o ciclo de pensamentos automáticos no cérebro, reduzindo a liberação de cortisol e estabilizando a frequência cardíaca.
        </Text>
      </View>

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

  /* CHIPS DE MOOD */
  containerMoods: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  chipMood: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  chipMoodAtivo: {
    backgroundColor: '#37474F',
    borderColor: '#37474F',
  },

  textoChipMood: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },

  textoChipMoodAtivo: {
    color: '#FFFFFF',
  },

  /* CARD DA FRASE */
  cardFrase: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#ECEFF1',
  },

  simboloAspas: {
    fontSize: 42,
    color: '#90A4AE',
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 4,
  },

  textoFrasePrincipal: {
    fontSize: 17,
    fontWeight: '600',
    color: '#263238',
    lineHeight: 25,
    marginBottom: 18,
  },

  caixaRespiracao: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },

  textoRespiracao: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },

  gridAcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  botaoAcaoSecundario: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 0.45,
    alignItems: 'center',
  },

  textoAcaoSecundario: {
    fontSize: 13,
    fontWeight: '600',
    color: '#455A64',
  },

  botaoAcaoPrincipal: {
    backgroundColor: '#00897B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 0.5,
    alignItems: 'center',
  },

  textoAcaoPrincipal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  /* CARD AFIRMAÇÃO PESSOAL */
  cardAfirmacao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  tituloAfirmacao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },

  descAfirmacao: {
    fontSize: 12,
    color: '#78909C',
    marginBottom: 12,
  },

  inputAfirmacao: {
    backgroundColor: '#F5F7F8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#333',
    borderWidth: 1,
    borderColor: '#CFD8DC',
    marginBottom: 10,
  },

  botaoSalvarAfirmacao: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  caixaAfirmacaoSalva: {
    marginTop: 14,
    backgroundColor: '#E8EAF6',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3F51B5',
  },

  tituloSalvo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 2,
  },

  textoSalvo: {
    fontSize: 13,
    color: '#283593',
    fontStyle: 'italic',
  },

  /* CARD INFO */
  cardInfo: {
    backgroundColor: '#EFEBE9',
    borderRadius: 16,
    padding: 16,
  },

  tituloInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 6,
  },

  textoInfo: {
    fontSize: 13,
    color: '#5D4037',
    lineHeight: 18,
  },

  espacoFinal: {
    height: 60,
    width: '100%',
  },
});