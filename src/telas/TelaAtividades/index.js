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

export default function TelaAtividades({ navigation }) {

  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    carregarAtividades();
  }, []);

  const carregarAtividades = async () => {
    try {
      const dados = await AsyncStorage.getItem("atividades");

      if (dados) {
        const parsed = JSON.parse(dados);

        // garante que tudo vira boolean
        const normalizado = parsed.map(item => ({
          ...item,
          concluida: !!item.concluida
        }));

        setAtividades(normalizado);
      } else {
        // padrão inicial
        const iniciais = [
          { id: 1, nome: 'Fazer exercício físico', concluida: false },
          { id: 2, nome: 'Beber água', concluida: false },
          { id: 3, nome: 'Dormir cedo', concluida: false },
          { id: 4, nome: 'Tomar medicação', concluida: false },
          { id: 5, nome: 'Meditar 10 minutos', concluida: false },
          { id: 6, nome: 'Comer frutas', concluida: false },
        ];

        setAtividades(iniciais);
        AsyncStorage.setItem("atividades", JSON.stringify(iniciais));
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  const toggleAtividade = (id) => {
    const novas = atividades.map(item =>
      item.id === id
        ? { ...item, concluida: !item.concluida }
        : item
    );

    setAtividades(novas);
    AsyncStorage.setItem("atividades", JSON.stringify(novas));
  };

  const cadastrarAtividades = async () => {
    try {
      for (const item of atividades) {
        const form = new FormData();
        form.append("id_usuario", 1);
        form.append("id_atividade", item.id);
        form.append("concluida", item.concluida ? 1 : 0);

        await fetch("http://localhost/axon_api/toggle_atividade.php", {
          method: "POST",
          body: form,
        });
      }

      Alert.alert("Sucesso", "Atividades salvas!");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao salvar");
    }
  };

  const concluidas = atividades.filter(item => item.concluida).length;
  const progresso = atividades.length ? (concluidas / atividades.length) * 100 : 0;

  return (
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.titulo}>Atividades</Text>

        <View style={styles.cardProgresso}>
          <Text style={styles.textoProgresso}>Seu progresso hoje</Text>
          <Text style={styles.numeroProgresso}>
            {concluidas}/{atividades.length}
          </Text>

          <View style={styles.barraFundo}>
            <View style={[styles.barra, { width: `${progresso}%` }]} />
          </View>

          <Text style={styles.porcentagem}>
            {Math.round(progresso)}% completo ✨
          </Text>
        </View>

        <Text style={styles.subtitulo}>Atividades do dia</Text>

        {atividades.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.cardAtividade,
              item.concluida && styles.cardConcluido
            ]}
            onPress={() => toggleAtividade(item.id)}
          >
            <Text style={styles.nomeAtividade}>{item.nome}</Text>
            <Text style={styles.status}>
              {item.concluida ? 'Concluído ✅' : 'Pendente ⏳'}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#6d9c7b' }]}
          onPress={cadastrarAtividades}
        >
          <Text style={styles.textoBotao}>Cadastrar no banco</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Tela1')}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%'
  },

  scroll: {
    paddingBottom: 120,
  },

  titulo: {
    fontSize: 32,
    color: '#555',
    marginTop: 80,
    marginLeft: 30,
    fontWeight: '600',
  },

  subtitulo: {
    fontSize: 22,
    color: '#666',
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 15,
    fontWeight: '500',
  },

  cardProgresso: {
    backgroundColor: '#DCEFD8',
    width: 320,
    alignSelf: 'center',
    borderRadius: 25,
    padding: 20,
    marginTop: 30,
  },

  textoProgresso: {
    fontSize: 18,
    color: '#4d4d4d',
  },

  numeroProgresso: {
    fontSize: 28,
    marginTop: 10,
    fontWeight: '700',
    color: '#6d9c7b',
  },

  barraFundo: {
    height: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 15,
    overflow: 'hidden',
  },

  barra: {
    height: 15,
    backgroundColor: '#9BC6B8',
    borderRadius: 20,
  },

  porcentagem: {
    marginTop: 12,
    color: '#555',
    fontSize: 15,
  },

  cardStreak: {
    backgroundColor: '#FFE8C2',
    width: 320,
    alignSelf: 'center',
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
  },

  streakTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7a5a20',
  },

  streakTexto: {
    marginTop: 10,
    color: '#555',
    fontSize: 15,
  },

  cardAtividade: {
    backgroundColor: '#E5E8F5',
    width: 320,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },

  cardConcluido: {
    backgroundColor: '#DCEFD8',
  },

  nomeAtividade: {
    fontSize: 18,
    color: '#444',
    fontWeight: '500',
  },

  status: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },

  cardSugestao: {
    backgroundColor: '#EFE7FA',
    width: 320,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
  },

  sugestaoTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6a5c85',
  },

  sugestaoTexto: {
    marginTop: 10,
    fontSize: 15,
    color: '#555',
  },

  botao: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 220,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#9BC6B8',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});