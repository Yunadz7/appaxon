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

export default function TelaMetas({ navigation }) {
  const [microAtivos, setMicroAtivos] = useState([]);
  const [desafioConcluido, setDesafioConcluido] = useState(false);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');

  const toggleMicro = (id) => {
    setMicroAtivos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const dadosPeriodo = {
    manha: {
      titulo: '🌅 Manhã: Ativação Suave',
      descricao: 'Para evitar o pico matinal de cortisol e ansiedade logo ao acordar.',
      dicas: [
        '☀️ Receba luz solar direta nos olhos por 5 minutos antes de olhar as redes sociais.',
        '🥛 Beba um copo de água antes do primeiro café para estabilizar o ritmo cardíaco.',
      ],
    },
    tarde: {
      titulo: '☀️ Tarde: Manutenção do Foco',
      descricao: 'Para conter a fadiga mental e evitar picos de BPM no meio do expediente.',
      dicas: [
        '🪑 Ajuste a postura na cadeira: ombros contraídos dificultam a respiração abdominal.',
        '👀 Regra 20-20-20: A cada 20 minutos, olhe para algo a 6 metros por 20 segundos.',
      ],
    },
    noite: {
      titulo: '🌙 Noite: Desaceleração',
      descricao: 'Prepara o sistema nervoso parassimpático para o descanso profundo.',
      dicas: [
        '💡 Reduza a intensidade da iluminação da casa 1 hora antes de deitar.',
        '🛋️ Faça alongamentos suaves nas pernas para liberar a tensão acumulada.',
      ],
    },
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
      <Text style={styles.titulo}>🔥 Metas & Micro-Hábitos</Text>
      <Text style={styles.subtitulo}>
        Ações atômicas de 60 segundos e regulação do ritmo biológico para reequilibrar o corpo sem pressão.
      </Text>

      {/* CARD 1: O DESAFIO ÚNICO DO DIA */}
      <View style={[styles.card, { backgroundColor: '#FFF8E1', borderColor: '#FFE082', borderWidth: 1 }]}>
        <Text style={styles.badgeDesafio}>🎯 DESAFIO DO DIA</Text>
        <Text style={styles.tituloDesafio}>Linguagem Corporal de Calma</Text>
        <Text style={styles.cardDescricao}>
          Mantenha as mãos destravadas e os dentes sem encostar durante os próximos 10 minutos. O cérebro interpreta o relaxamento muscular como sinal de segurança.
        </Text>

        <TouchableOpacity
          style={[
            styles.botaoDesafio,
            desafioConcluido && styles.botaoDesafioConcluido,
          ]}
          onPress={() => setDesafioConcluido(!desafioConcluido)}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoDesafio}>
            {desafioConcluido ? '✓ Desafio Cumprido Hoje!' : 'Concluir Desafio do Dia'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* SEÇÃO 2: MICRO-HÁBITOS DE 60 SEGUNDOS */}
      <View style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
        <Text style={styles.cardTitulo}>⏱️ Micro-ações de 60 Segundos</Text>
        <Text style={styles.cardDescricao}>
          Sem tempo ou energia para rotinas longas? Escolha uma micro-ação rápida:
        </Text>

        {[
          { id: 1, icone: '🦶', titulo: 'Pés no Chão', desc: 'Sinta o contato firme dos pés com o piso por 1 min.' },
          { id: 2, icone: '😮‍💨', titulo: 'Soltar Maxilar', desc: 'Desencoste os dentes e relaxe a língua no chão da boca.' },
          { id: 3, icone: '🙆‍♂️', titulo: 'Abrir o Peito', desc: 'Puxe os ombros para trás e abra a caixa torácica.' },
        ].map((item) => {
          const ativo = microAtivos.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.itemMicro, ativo && styles.itemMicroAtivo]}
              onPress={() => toggleMicro(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.iconeMicro}>{item.icone}</Text>
              <View style={styles.textosMicro}>
                <Text style={[styles.tituloMicro, ativo && styles.textoMicroAtivo]}>{item.titulo}</Text>
                <Text style={styles.descMicro}>{item.desc}</Text>
              </View>
              <Text style={styles.statusMicro}>{ativo ? '✓ Feito' : '+ Fazer'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* SEÇÃO 3: RITMO CIRCADIANO (SELEÇÃO DE PERÍODO) */}
      <View style={[styles.card, { backgroundColor: '#E0F2F1' }]}>
        <Text style={styles.cardTitulo}>🌿 Guia por Período do Dia</Text>
        <Text style={styles.cardDescricao}>
          Selecione o momento atual para ajustar a sua rotina:
        </Text>

        {/* BOTOES DE PERIODO */}
        <View style={styles.gridBotoesPeriodo}>
          {[
            { key: 'manha', label: 'Manhã' },
            { key: 'tarde', label: 'Tarde' },
            { key: 'noite', label: 'Noite' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.abaPeriodo,
                periodoSelecionado === tab.key && styles.abaPeriodoAtiva,
              ]}
              onPress={() => setPeriodoSelecionado(tab.key)}
            >
              <Text
                style={[
                  styles.textoAba,
                  periodoSelecionado === tab.key && styles.textoAbaAtiva,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTEÚDO DO PERÍODO SELECIONADO */}
        <View style={styles.caixaConteudoPeriodo}>
          <Text style={styles.tituloPeriodo}>{dadosPeriodo[periodoSelecionado].titulo}</Text>
          <Text style={styles.descPeriodo}>{dadosPeriodo[periodoSelecionado].descricao}</Text>

          {dadosPeriodo[periodoSelecionado].dicas.map((dica, index) => (
            <Text key={index} style={styles.itemDicaPeriodo}>
              {dica}
            </Text>
          ))}
        </View>
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
    marginBottom: 14,
    lineHeight: 18,
  },

  /* CARD DESAFIO DO DIA */
  badgeDesafio: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#F57F17',
    backgroundColor: '#FFF59D',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },

  tituloDesafio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },

  botaoDesafio: {
    backgroundColor: '#FFB300',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },

  botaoDesafioConcluido: {
    backgroundColor: '#4CAF50',
  },

  textoBotaoDesafio: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* MICRO-HÁBITOS */
  itemMicro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  itemMicroAtivo: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },

  iconeMicro: {
    fontSize: 22,
    marginRight: 12,
  },

  textosMicro: {
    flex: 1,
  },

  tituloMicro: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  descMicro: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  textoMicroAtivo: {
    color: '#2E7D32',
  },

  statusMicro: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00796B',
    marginLeft: 8,
  },

  /* RITMO CIRCADIANO */
  gridBotoesPeriodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  abaPeriodo: {
    flex: 0.31,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },

  abaPeriodoAtiva: {
    backgroundColor: '#00796B',
    borderColor: '#00796B',
  },

  textoAba: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00796B',
  },

  textoAbaAtiva: {
    color: '#FFFFFF',
  },

  caixaConteudoPeriodo: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
  },

  tituloPeriodo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 4,
  },

  descPeriodo: {
    fontSize: 12,
    color: '#555',
    marginBottom: 12,
    lineHeight: 17,
  },

  itemDicaPeriodo: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    lineHeight: 19,
  },

  espacoFinal: {
    height: 60,
    width: '100%',
  },
});