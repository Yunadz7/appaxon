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

export default function TelaRegistro({ navigation }) {

  const [humor, setHumor] = useState('');
  const [sono, setSono] = useState('');
  const [ansiedade, setAnsiedade] = useState('');
  const [energia, setEnergia] = useState('');
  const [agua, setAgua] = useState('');
  const [medicacao, setMedicacao] = useState('');
  const [observacao, setObservacao] = useState('');

  const salvarRegistro = () => {

    if (!humor || !sono || !ansiedade) {
      Alert.alert(
        'Aviso',
        'Preencha os campos principais!'
      );
      return;
    }

    Alert.alert(
      'Sucesso',
      'Registro salvo com sucesso!'
    );
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

        {/* humor */}
        <Text style={styles.label}>
          Como está se sentindo hoje?
        </Text>

        <View style={styles.humorContainer}>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              humor === 'Feliz' && styles.humorSelecionado
            ]}
            onPress={() => setHumor('Feliz')}
          >
            <Text style={styles.emoji}>😄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              humor === 'Neutro' && styles.humorSelecionado
            ]}
            onPress={() => setHumor('Neutro')}
          >
            <Text style={styles.emoji}>😐</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              humor === 'Triste' && styles.humorSelecionado
            ]}
            onPress={() => setHumor('Triste')}
          >
            <Text style={styles.emoji}>😔</Text>
          </TouchableOpacity>

        </View>

        {/* sono */}
        <Text style={styles.label}>
          Quantas horas dormiu?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 8 horas"
          placeholderTextColor="#999"
          value={sono}
          onChangeText={setSono}
        />

        {/* ansiedade */}
        <Text style={styles.label}>
          Nível de ansiedade (0 a 10)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 5"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={ansiedade}
          onChangeText={setAnsiedade}
        />

        {/* energia */}
        <Text style={styles.label}>
          Como está sua energia hoje?
        </Text>

        <View style={styles.humorContainer}>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              energia === 'Alta' && styles.humorSelecionado
            ]}
            onPress={() => setEnergia('Alta')}
          >
            <Text style={styles.emoji}>🔋</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              energia === 'Média' && styles.humorSelecionado
            ]}
            onPress={() => setEnergia('Média')}
          >
            <Text style={styles.emoji}>⚡</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              energia === 'Baixa' && styles.humorSelecionado
            ]}
            onPress={() => setEnergia('Baixa')}
          >
            <Text style={styles.emoji}>🪫</Text>
          </TouchableOpacity>

        </View>

        {/* água */}
        <Text style={styles.label}>
          Quantos copos de água tomou?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 6 copos"
          placeholderTextColor="#999"
          value={agua}
          onChangeText={setAgua}
        />

        {/* medicação */}
        <Text style={styles.label}>
          Tomou a medicação?
        </Text>

        <View style={styles.humorContainer}>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              medicacao === 'Sim' && styles.humorSelecionado
            ]}
            onPress={() => setMedicacao('Sim')}
          >
            <Text style={styles.emoji}>💊</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.humorBotao,
              medicacao === 'Não' && styles.humorSelecionado
            ]}
            onPress={() => setMedicacao('Não')}
          >
            <Text style={styles.emoji}>❌</Text>
          </TouchableOpacity>

        </View>

        {/* observações */}
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

        {/* salvar */}
        <TouchableOpacity
          style={styles.botao}
          onPress={salvarRegistro}
        >
          <Text style={styles.textoBotao}>
            Salvar Registro
          </Text>
        </TouchableOpacity>

        {/* voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Home')}
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
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C7CBEA',
    color: '#444',
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

  botaoVoltar: {
    backgroundColor: '#B8B8D1',
    width: 250,
    padding: 16,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

});