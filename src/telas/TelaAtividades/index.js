
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const CHAVE_ATIVIDADES = 'atividades';
const CHAVE_MICRO = 'microHabitos';
const CHAVE_DESAFIO = 'desafioConcluido';

export default function TelaAtividades({ navigation }) {
  const [atividades, setAtividades] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [microAtivos, setMicroAtivos] = useState([]);
  const [desafioConcluido, setDesafioConcluido] = useState(false);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');

  useEffect(() => {
    carregarUsuario();
    carregarAtividades();
    carregarMicroHabitos();
    carregarDesafio();
  }, []);

  // CARREGAR USUARIO LOGADO
  const carregarUsuario = async () => {
    try {
      const dadosUsuario = await AsyncStorage.getItem('usuario');

      if (dadosUsuario) {
        setUsuario(JSON.parse(dadosUsuario));
      }
    } catch (erro) {
      console.log('Erro ao carregar usuário:', erro);
    }
  };

  // CARREGAR ATIVIDADES
  const carregarAtividades = async () => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_ATIVIDADES);

      if (dados) {
        const parsed = JSON.parse(dados);

        const normalizado = parsed.map((item) => ({
          ...item,
          concluida: !!item.concluida,
        }));

        setAtividades(normalizado);
      } else {
        const iniciais = [
          { id: 1, nome: 'Fazer exercício físico', concluida: false },
          { id: 2, nome: 'Beber água', concluida: false },
          { id: 3, nome: 'Dormir cedo', concluida: false },
          { id: 4, nome: 'Tomar medicação', concluida: false },
          { id: 5, nome: 'Meditar 10 minutos', concluida: false },
          { id: 6, nome: 'Comer frutas', concluida: false },
        ];

        setAtividades(iniciais);

        await AsyncStorage.setItem(
          CHAVE_ATIVIDADES,
          JSON.stringify(iniciais)
        );
      }
    } catch (erro) {
      console.log('Erro ao carregar atividades:', erro);
    }
  };

  // CARREGAR MICRO-HABITOS
  const carregarMicroHabitos = async () => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_MICRO);

      if (dados) {
        setMicroAtivos(JSON.parse(dados));
      }
    } catch (erro) {
      console.log('Erro ao carregar micro-hábitos:', erro);
    }
  };

  // CARREGAR DESAFIO
  const carregarDesafio = async () => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_DESAFIO);

      if (dados) {
        setDesafioConcluido(JSON.parse(dados));
      }
    } catch (erro) {
      console.log('Erro ao carregar desafio:', erro);
    }
  };

  // MARCAR OU DESMARCAR ATIVIDADE
  const toggleAtividade = async (id) => {
    const novas = atividades.map((item) =>
      item.id === id
        ? { ...item, concluida: !item.concluida }
        : item
    );

    setAtividades(novas);

    try {
      await AsyncStorage.setItem(
        CHAVE_ATIVIDADES,
        JSON.stringify(novas)
      );
    } catch (erro) {
      console.log('Erro ao salvar atividade:', erro);
    }
  };

  // MARCAR OU DESMARCAR MICRO-HABITO
  const toggleMicro = async (id) => {
    const novas = microAtivos.includes(id)
      ? microAtivos.filter((item) => item !== id)
      : [...microAtivos, id];

    setMicroAtivos(novas);

    try {
      await AsyncStorage.setItem(
        CHAVE_MICRO,
        JSON.stringify(novas)
      );
    } catch (erro) {
      console.log('Erro ao salvar micro-hábito:', erro);
    }
  };

  // CONCLUIR DESAFIO DO DIA
  const toggleDesafio = async () => {
    const novoEstado = !desafioConcluido;

    setDesafioConcluido(novoEstado);

    try {
      await AsyncStorage.setItem(
        CHAVE_DESAFIO,
        JSON.stringify(novoEstado)
      );
    } catch (erro) {
      console.log('Erro ao salvar desafio:', erro);
    }
  };

  // DICAS POR PERIODO
  const dadosPeriodo = {
    manha: {
      titulo: '🌅 Manhã: Ativação Suave',
      descricao:
        'Comece o dia com calma e crie uma rotina que respeite seu ritmo.',
      dicas: [
        '☀️ Receba luz natural pela manhã, se possível.',
        '🥛 Beba água antes do primeiro café.',
      ],
    },
    tarde: {
      titulo: '☀️ Tarde: Manutenção do Foco',
      descricao:
        'Faça pequenas pausas para aliviar o cansaço e recuperar a concentração.',
      dicas: [
        '🪑 Ajuste a postura e relaxe os ombros.',
        '👀 A cada 20 minutos, olhe para longe por 20 segundos.',
      ],
    },
    noite: {
      titulo: '🌙 Noite: Desaceleração',
      descricao:
        'Reduza o ritmo aos poucos e prepare-se para descansar.',
      dicas: [
        '💡 Diminua a intensidade da iluminação antes de dormir.',
        '🛋️ Faça alongamentos suaves para aliviar a tensão.',
      ],
    },
  };

  // ENVIAR ATIVIDADES AO PHP
  const cadastrarAtividades = async () => {
    try {
      if (!usuario || !usuario.id_usuario) {
        Alert.alert(
          'Erro',
          'Nenhum usuário logado encontrado.'
        );
        return;
      }

      for (const item of atividades) {
        const form = new FormData();

        form.append(
          'id_usuario',
          String(usuario.id_usuario)
        );

        form.append(
          'id_atividade',
          String(item.id)
        );

        form.append(
          'concluida',
          item.concluida ? '1' : '0'
        );

        const resposta = await fetch(
          'http://localhost/axon_api/toggle_atividade.php',
          {
            method: 'POST',
            body: form,
          }
        );

        const texto = await resposta.text();

        let dados;

        try {
          dados = JSON.parse(texto);
        } catch {
          console.log('Resposta inválida do PHP:', texto);
          throw new Error('Resposta inválida do servidor.');
        }

        if (!resposta.ok || dados.status !== 'ok') {
          throw new Error(
            dados.msg || 'Erro ao salvar atividade.'
          );
        }
      }

      Alert.alert(
        'Sucesso',
        'Atividades salvas no banco de dados!'
      );

      navigation.navigate('Tela1');
    } catch (erro) {
      console.log('Erro ao salvar atividades:', erro);

      Alert.alert(
        'Erro',
        'Falha ao salvar as atividades. Verifique a conexão com o servidor.'
      );
    }
  };

  const concluidas = atividades.filter(
    (item) => item.concluida
  ).length;

  const progresso = atividades.length
    ? (concluidas / atividades.length) * 100
    : 0;

  const microHabitos = [
    {
      id: 1,
      icone: '🦶',
      titulo: 'Pés no Chão',
      descricao: 'Sinta o contato dos pés com o piso por 1 minuto.',
    },
    {
      id: 2,
      icone: '😮‍💨',
      titulo: 'Soltar o Maxilar',
      descricao: 'Desencoste os dentes e relaxe a língua.',
    },
    {
      id: 3,
      icone: '🙆',
      titulo: 'Abrir o Peito',
      descricao: 'Relaxe os ombros e alongue suavemente o peito.',
    },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* CABECALHO */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Tela1')}
          activeOpacity={0.7}
        >
          <Text style={styles.textoVoltar}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          🔥 Metas & Micro-Hábitos
        </Text>

        <Text style={styles.subtituloInicial}>
          Pequenas ações diárias para cuidar de você sem pressão.
        </Text>

        {/* PROGRESSO */}
        <View style={styles.cardProgresso}>
          <Text style={styles.textoProgresso}>
            Seu progresso hoje
          </Text>

          <Text style={styles.numeroProgresso}>
            {concluidas}/{atividades.length}
          </Text>

          <View style={styles.barraFundo}>
            <View
              style={[
                styles.barra,
                { width: `${progresso}%` },
              ]}
            />
          </View>

          <Text style={styles.porcentagem}>
            {Math.round(progresso)}% completo ✨
          </Text>
        </View>

        {/* DESAFIO DO DIA */}
        <View style={styles.cardDesafio}>
          <Text style={styles.badgeDesafio}>
            🎯 DESAFIO DO DIA
          </Text>

          <Text style={styles.tituloCard}>
            Linguagem Corporal de Calma
          </Text>

          <Text style={styles.descricaoCard}>
            Por 10 minutos, mantenha as mãos relaxadas e os
            dentes desencostados. Observe se consegue aliviar
            a tensão do corpo.
          </Text>

          <TouchableOpacity
            style={[
              styles.botaoDesafio,
              desafioConcluido && styles.botaoConcluido,
            ]}
            onPress={toggleDesafio}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoDesafio}>
              {desafioConcluido
                ? '✓ Desafio Cumprido!'
                : 'Concluir Desafio do Dia'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* MICRO-HABITOS */}
        <View style={styles.card}>
          <Text style={styles.tituloCard}>
            ⏱️ Micro-ações de 60 Segundos
          </Text>

          <Text style={styles.descricaoCard}>
            Escolha uma pequena ação para fazer agora.
          </Text>

          {microHabitos.map((item) => {
            const ativo = microAtivos.includes(item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemMicro,
                  ativo && styles.itemMicroAtivo,
                ]}
                onPress={() => toggleMicro(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.iconeMicro}>
                  {item.icone}
                </Text>

                <View style={styles.textosMicro}>
                  <Text
                    style={[
                      styles.tituloMicro,
                      ativo && styles.textoMicroAtivo,
                    ]}
                  >
                    {item.titulo}
                  </Text>

                  <Text style={styles.descricaoMicro}>
                    {item.descricao}
                  </Text>
                </View>

                <Text style={styles.statusMicro}>
                  {ativo ? '✓ Feito' : '+ Fazer'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* GUIA POR PERIODO */}
        <View style={styles.cardPeriodo}>
          <Text style={styles.tituloCard}>
            🌿 Guia por Período do Dia
          </Text>

          <Text style={styles.descricaoCard}>
            Selecione o período para ver suas sugestões.
          </Text>

          <View style={styles.gridPeriodo}>
            {[
              { key: 'manha', label: 'Manhã' },
              { key: 'tarde', label: 'Tarde' },
              { key: 'noite', label: 'Noite' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.abaPeriodo,
                  periodoSelecionado === tab.key &&
                    styles.abaPeriodoAtiva,
                ]}
                onPress={() =>
                  setPeriodoSelecionado(tab.key)
                }
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.textoAba,
                    periodoSelecionado === tab.key &&
                      styles.textoAbaAtiva,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.conteudoPeriodo}>
            <Text style={styles.tituloPeriodo}>
              {dadosPeriodo[periodoSelecionado].titulo}
            </Text>

            <Text style={styles.descricaoPeriodo}>
              {dadosPeriodo[periodoSelecionado].descricao}
            </Text>

            {dadosPeriodo[periodoSelecionado].dicas.map(
              (dica, index) => (
                <Text
                  key={index}
                  style={styles.dicaPeriodo}
                >
                  {dica}
                </Text>
              )
            )}
          </View>
        </View>

        {/* LISTA DE ATIVIDADES */}
        <Text style={styles.subtitulo}>
          ✅ Atividades do Dia
        </Text>

        <Text style={styles.textoAuxiliar}>
          Toque em uma atividade para marcar ou desmarcar.
        </Text>

        {atividades.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.cardAtividade,
              item.concluida && styles.cardAtividadeConcluida,
            ]}
            onPress={() => toggleAtividade(item.id)}
            activeOpacity={0.75}
          >
            <View style={styles.linhaAtividade}>
              <View style={styles.textosAtividade}>
                <Text style={styles.nomeAtividade}>
                  {item.nome}
                </Text>

                <Text style={styles.statusAtividade}>
                  {item.concluida
                    ? 'Concluído ✅'
                    : 'Pendente ⏳'}
                </Text>
              </View>

              <View
                style={[
                  styles.marcador,
                  item.concluida && styles.marcadorConcluido,
                ]}
              >
                <Text style={styles.textoMarcador}>
                  {item.concluida ? '✓' : '+'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* SALVAR */}
        <TouchableOpacity
          style={styles.botaoEnviar}
          onPress={cadastrarAtividades}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            Salvar Atividades
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltarFinal}
          onPress={() => navigation.navigate('Tela1')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoVoltarFinal}>
            Voltar para o Início
          </Text>
        </TouchableOpacity>

        <View style={styles.espacoFinal} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 80,
  },

  botaoVoltar: {
    alignSelf: 'flex-start',
    paddingVertical: 9,
    paddingHorizontal: 13,
    backgroundColor: '#ECEFF1',
    borderRadius: 10,
    marginBottom: 18,
  },

  textoVoltar: {
    color: '#37474F',
    fontSize: 14,
    fontWeight: '600',
  },

  titulo: {
    fontSize: 26,
    color: '#2C3E50',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtituloInicial: {
    fontSize: 14,
    color: '#626F70',
    lineHeight: 21,
    marginBottom: 18,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#E8ECE9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },

  cardProgresso: {
    backgroundColor: '#DCEFD8',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    elevation: 2,
  },

  textoProgresso: {
    fontSize: 16,
    color: '#4D4D4D',
    fontWeight: '500',
  },

  numeroProgresso: {
    fontSize: 30,
    marginTop: 8,
    fontWeight: '700',
    color: '#538A68',
  },

  barraFundo: {
    height: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 13,
    overflow: 'hidden',
  },

  barra: {
    height: 13,
    backgroundColor: '#6D9C7B',
    borderRadius: 20,
  },

  porcentagem: {
    marginTop: 10,
    color: '#4D6354',
    fontSize: 14,
  },

  cardDesafio: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFE082',
    borderWidth: 1,
    borderRadius: 18,
    padding: 17,
    marginBottom: 17,
    elevation: 2,
  },

  badgeDesafio: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#F57F17',
    backgroundColor: '#FFF0A8',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 7,
    alignSelf: 'flex-start',
    marginBottom: 10,
    overflow: 'hidden',
  },

  tituloCard: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 7,
  },

  descricaoCard: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 13,
    lineHeight: 19,
  },

  botaoDesafio: {
    backgroundColor: '#FFB300',
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 11,
    alignItems: 'center',
    marginTop: 3,
  },

  botaoConcluido: {
    backgroundColor: '#4CAF50',
  },

  textoBotaoDesafio: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  itemMicro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: '#E0E6E2',
  },

  itemMicroAtivo: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },

  iconeMicro: {
    fontSize: 23,
    marginRight: 11,
  },

  textosMicro: {
    flex: 1,
  },

  tituloMicro: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },

  textoMicroAtivo: {
    color: '#2E7D32',
  },

  descricaoMicro: {
    fontSize: 12,
    color: '#666666',
    marginTop: 3,
    lineHeight: 17,
  },

  statusMicro: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#00796B',
    marginLeft: 6,
  },

  cardPeriodo: {
    backgroundColor: '#E0F2F1',
    borderRadius: 18,
    padding: 17,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },

  gridPeriodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 14,
  },

  abaPeriodo: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
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

  conteudoPeriodo: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
  },

  tituloPeriodo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 5,
  },

  descricaoPeriodo: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 12,
    lineHeight: 18,
  },

  dicaPeriodo: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 9,
    lineHeight: 19,
  },

  subtitulo: {
    fontSize: 21,
    color: '#2C3E50',
    marginTop: 6,
    marginBottom: 8,
    fontWeight: 'bold',
  },

  textoAuxiliar: {
    fontSize: 13,
    color: '#626F70',
    lineHeight: 19,
    marginBottom: 14,
  },

  cardAtividade: {
    backgroundColor: '#E5E8F5',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 16,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#D7DCEF',
  },

  cardAtividadeConcluida: {
    backgroundColor: '#DCEFD8',
    borderColor: '#A5D6A7',
  },

  linhaAtividade: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textosAtividade: {
    flex: 1,
    paddingRight: 10,
  },

  nomeAtividade: {
    fontSize: 16,
    color: '#444444',
    fontWeight: '600',
  },

  statusAtividade: {
    marginTop: 7,
    fontSize: 13,
    color: '#666666',
  },

  marcador: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B0BEC5',
  },

  marcadorConcluido: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  textoMarcador: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  botaoEnviar: {
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 10,
    backgroundColor: '#6D9C7B',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoVoltarFinal: {
    padding: 14,
    borderRadius: 13,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: '#ECEFF1',
  },

  textoBotaoVoltarFinal: {
    color: '#37474F',
    fontSize: 15,
    fontWeight: '600',
  },

  espacoFinal: {
    height: 20,
  },
});