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
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    carregarUsuario();
    carregarAtividades();
  }, []);

  // PEGA O USUÁRIO QUE ESTÁ LOGADO
  const carregarUsuario = async () => {
    try {
      const dadosUsuario = await AsyncStorage.getItem("usuario");

      if (dadosUsuario) {
        const usuarioLogado = JSON.parse(dadosUsuario);

        console.log("USUÁRIO LOGADO:", usuarioLogado);

        setUsuario(usuarioLogado);
      } else {
        console.log("Nenhum usuário encontrado no AsyncStorage");
      }

    } catch (erro) {
      console.log("Erro ao carregar usuário:", erro);
    }
  };

  const carregarAtividades = async () => {
    try {
      const dados = await AsyncStorage.getItem("atividades");

      if (dados) {

        const parsed = JSON.parse(dados);

        const normalizado = parsed.map(item => ({
          ...item,
          concluida: !!item.concluida
        }));

        setAtividades(normalizado);

      } else {

        const iniciais = [
          {
            id: 1,
            nome: 'Fazer exercício físico',
            concluida: false
          },
          {
            id: 2,
            nome: 'Beber água',
            concluida: false
          },
          {
            id: 3,
            nome: 'Dormir cedo',
            concluida: false
          },
          {
            id: 4,
            nome: 'Tomar medicação',
            concluida: false
          },
          {
            id: 5,
            nome: 'Meditar 10 minutos',
            concluida: false
          },
          {
            id: 6,
            nome: 'Comer frutas',
            concluida: false
          },
        ];

        setAtividades(iniciais);

        await AsyncStorage.setItem(
          "atividades",
          JSON.stringify(iniciais)
        );
      }

    } catch (erro) {
      console.log("Erro ao carregar atividades:", erro);
    }
  };

  const toggleAtividade = async (id) => {

    const novas = atividades.map(item =>
      item.id === id
        ? {
            ...item,
            concluida: !item.concluida
          }
        : item
    );

    setAtividades(novas);

    await AsyncStorage.setItem(
      "atividades",
      JSON.stringify(novas)
    );
  };

  const cadastrarAtividades = async () => {

    try {

      // verifica se existe usuário logado
      if (!usuario) {
        Alert.alert(
          "Erro",
          "Nenhum usuário logado encontrado."
        );
        return;
      }

      console.log(
        "ID DO USUÁRIO:",
        usuario.id_usuario
      );

      // salva cada atividade
      for (const item of atividades) {

        const form = new FormData();

        form.append(
          "id_usuario",
          String(usuario.id_usuario)
        );

        form.append(
          "id_atividade",
          String(item.id)
        );

        form.append(
          "concluida",
          item.concluida ? "1" : "0"
        );

        console.log(
          "ENVIANDO:",
          usuario.id_usuario,
          item.id,
          item.concluida ? 1 : 0
        );

        const resposta = await fetch(
          "http://localhost/axon_api/toggle_atividade.php",
          {
            method: "POST",
            body: form,
          }
        );

        const texto = await resposta.text();

        console.log(
          "RESPOSTA PHP:",
          texto
        );

        let dados;

        try {
          dados = JSON.parse(texto);
        } catch (erro) {
          console.log(
            "PHP NÃO RETORNOU JSON:",
            texto
          );

          throw new Error(
            "Resposta inválida do PHP"
          );
        }

        if (dados.status !== "ok") {

          throw new Error(
            dados.msg || "Erro ao salvar atividade"
          );
        }
      }

      Alert.alert(
        "Sucesso",
        "Atividades salvas no banco!"
      );

    } catch (error) {

      console.log(
        "ERRO AO SALVAR:",
        error
      );

      Alert.alert(
        "Erro",
        "Falha ao salvar as atividades."
      );
    }
  };

  const concluidas =
    atividades.filter(
      item => item.concluida
    ).length;

  const progresso =
    atividades.length
      ? (concluidas / atividades.length) * 100
      : 0;

  return (

    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.titulo}>
          Atividades
        </Text>

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
                {
                  width: `${progresso}%`
                }
              ]}
            />

          </View>

          <Text style={styles.porcentagem}>
            {Math.round(progresso)}% completo ✨
          </Text>

        </View>

        <Text style={styles.subtitulo}>
          Atividades do dia
        </Text>

        {atividades.map(item => (

          <TouchableOpacity
            key={item.id}
            style={[
              styles.cardAtividade,
              item.concluida &&
                styles.cardConcluido
            ]}
            onPress={() =>
              toggleAtividade(item.id)
            }
          >

            <Text style={styles.nomeAtividade}>
              {item.nome}
            </Text>

            <Text style={styles.status}>
              {item.concluida
                ? 'Concluído ✅'
                : 'Pendente ⏳'}
            </Text>

          </TouchableOpacity>

        ))}

        <TouchableOpacity
          style={[
            styles.botao,
            {
              backgroundColor: '#6d9c7b'
            }
          ]}
          onPress={cadastrarAtividades}
        >

          <Text style={styles.textoBotao}>
            Cadastrar no banco
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            navigation.navigate('Tela1')
          }
        >

          <Text style={styles.textoBotao}>
            Voltar
          </Text>

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