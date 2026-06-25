import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function TelaRegistro({ navigation }) {

  const [humor, setHumor] = useState('');
  const [sono, setSono] = useState('');
  const [ansiedade, setAnsiedade] = useState('');
  const [energia, setEnergia] = useState('');
  const [agua, setAgua] = useState('');
  const [medicacao, setMedicacao] = useState('');
  const [observacao, setObservacao] = useState('');

  const salvarRegistro = async () => {
    if (!humor || !sono || !ansiedade) {
      Alert.alert('Aviso', 'Preencha os campos principais!');
      return;
    }

    try {
      const response = await fetch('http://localhost/axon_api/cadastrar_registro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: 1,
          emocoes: humor,
          sono,
          ansiedade,
          energia: energia === 'Alta' ? 3 : energia === 'Média' ? 2 : 1,
          agua,
          medicacao: medicacao === 'Sim' ? 1 : 0,
          observacoes: observacao,
        }),
      });

      const text = await response.text();
      console.log('Resposta PHP:', text);

      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.log('Erro JSON:', text);
        Alert.alert('Erro', 'Resposta inválida do servidor');
        return;
      }

      if (json.sucesso) {
        Alert.alert('Sucesso', 'Registro salvo!');
      } else {
        Alert.alert('Erro', json.erro || 'Erro ao salvar');
      }

    } catch (erro) {
      console.log(erro);
      Alert.alert('Erro', 'Falha ao conectar com o servidor');
    }
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

        <Text style={styles.titulo}>
          Registro Diário
        </Text>

        {/* HUMOR */}
        <Text style={styles.label}>
          Como está se sentindo hoje?
        </Text>

        <View style={styles.humorContainer}>

          <TouchableOpacity
            style={[styles.humorBotao, humor === 'Feliz' && styles.humorSelecionado]}
            onPress={() => setHumor('Feliz')}
          >
            <Text style={styles.emoji}>😄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.humorBotao, humor === 'Neutro' && styles.humorSelecionado]}
            onPress={() => setHumor('Neutro')}
          >
            <Text style={styles.emoji}>😐</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.humorBotao, humor === 'Triste' && styles.humorSelecionado]}
            onPress={() => setHumor('Triste')}
          >
            <Text style={styles.emoji}>😔</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.humorBotao, humor === 'Irritado' && styles.humorSelecionado]}
            onPress={() => setHumor('Irritado')}
          >
            <Text style={styles.emoji}>😡</Text>
          </TouchableOpacity>

        </View>

        {/* SONO (ESCALA 1–10) */}
        <Text style={styles.label}>Sono (1 a 10)</Text>

        <View style={styles.input}>
          <Picker
            selectedValue={sono}
            onValueChange={(value) => setSono(value)}
          >
            <Picker.Item label="Selecione" value="" />
            {Array.from({ length: 10 }, (_, i) => (
              <Picker.Item
                key={i}
                label={`${i + 1}`}
                value={i + 1}
              />
            ))}
          </Picker>
        </View>

        {/* ANSIEDADE (ESCALA 1–10) */}
        <Text style={styles.label}>Ansiedade (1 a 10)</Text>

        <View style={styles.input}>
          <Picker
            selectedValue={ansiedade}
            onValueChange={(value) => setAnsiedade(value)}
          >
            <Picker.Item label="Selecione" value="" />
            {Array.from({ length: 10 }, (_, i) => (
              <Picker.Item
                key={i}
                label={`${i + 1}`}
                value={i + 1}
              />
            ))}
          </Picker>
        </View>

        {/* ENERGIA */}
        <Text style={styles.label}>
          Como está sua energia hoje?
        </Text>

        <View style={styles.humorContainer}>

          <TouchableOpacity
            style={[styles.humorBotao, energia === 'Alta' && styles.humorSelecionado]}
            onPress={() => setEnergia('Alta')}
          >
            <Text style={styles.emoji}>🔋</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.humorBotao, energia === 'Média' && styles.humorSelecionado]}
            onPress={() => setEnergia('Média')}
          >
            <Text style={styles.emoji}>⚡</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.humorBotao, energia === 'Baixa' && styles.humorSelecionado]}
            onPress={() => setEnergia('Baixa')}
          >
            <Text style={styles.emoji}>🪫</Text>
          </TouchableOpacity>

        </View>

        {/* ÁGUA (ESCALA 1–10) */}
        <Text style={styles.label}>Água (1 a 10)</Text>

        <View style={styles.input}>
          <Picker
            selectedValue={agua}
            onValueChange={(value) => setAgua(value)}
          >
            <Picker.Item label="Selecione" value="" />
            {Array.from({ length: 10 }, (_, i) => (
              <Picker.Item
                key={i}
                label={`${i + 1}`}
                value={i + 1}
              />
            ))}
          </Picker>
        </View>

        {/* MEDICAÇÃO */}
        <Text style={styles.label}>
          Tomou a medicação?
        </Text>

        <View style={styles.humorContainer}>

          <TouchableOpacity
            style={[styles.humorBotao, medicacao === 'Sim' && styles.humorSelecionado]}
            onPress={() => setMedicacao('Sim')}
          >
            <Text style={styles.emoji}>💊</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.humorBotao, medicacao === 'Não' && styles.humorSelecionado]}
            onPress={() => setMedicacao('Não')}
          >
            <Text style={styles.emoji}>❌</Text>
          </TouchableOpacity>

        </View>

        {/* OBSERVAÇÕES */}
        <Text style={styles.label}>
          Observações
        </Text>

        <TextInput
          style={styles.inputGrande}
          placeholder="Escreva aqui..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          value={observacao}
          onChangeText={setObservacao}
        />

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.botao}
          onPress={salvarRegistro}
        >
          <Text style={styles.textoBotao}>
            Salvar Registro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Tela1')}
        >
          <Text style={styles.textoVoltar}>
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
  },

  scroll: {
    paddingBottom: 120,
  },

  titulo: {
    fontSize: 30,
    color: '#666',
    marginTop: 80,
    marginLeft: 30,
    fontWeight: '600',
  },

  label: {
    marginLeft: 35,
    marginTop: 25,
    fontSize: 17,
    color: '#555',
  },

  humorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  humorBotao: {
    backgroundColor: '#E5E8F5',
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  humorSelecionado: {
    backgroundColor: '#B7E4C7',
  },

  emoji: {
    fontSize: 32,
  },

  input: {
    backgroundColor: '#fff',
    width: 320,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C7CBEA',
    overflow: 'hidden',
  },

  inputGrande: {
    backgroundColor: '#fff',
    width: 320,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C7CBEA',
    height: 120,
    textAlignVertical: 'top',
    color: '#444',
  },

  botao: {
    backgroundColor: '#9BC6B8',
    width: 250,
    padding: 16,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 40,
    alignItems: 'center',
  },

  humorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  botaoVoltar: {
    backgroundColor: '#ccc',
    width: 250,
    padding: 14,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 15,
    alignItems: 'center',
  },

  textoVoltar: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});