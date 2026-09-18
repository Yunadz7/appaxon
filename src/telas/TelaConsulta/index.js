import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';

// ========================================
// URL DA API
// ========================================

const API_URL = 'http://localhost/axon_api';

export default function TelaConsulta({ navigation }) {

  const [especialidade, setEspecialidade] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [loadingMedicos, setLoadingMedicos] = useState(false);

  const [dataSelecionada, setDataSelecionada] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [carregando, setCarregando] = useState(false);

  // ========================================
  // ESCOLHER ESPECIALIDADE
  // ========================================

  const handleEspecialidadeChange = (itemValue) => {

    setEspecialidade(itemValue);
    setMedicoSelecionado('');
    setMedicos([]);

    if (itemValue !== '') {
      carregarMedicos(itemValue);
    }
  };

  // ========================================
  // BUSCAR MÉDICOS
  // ========================================

  const carregarMedicos = async (especialidadeEscolhida) => {

    setLoadingMedicos(true);

    try {

      const url =
        `${API_URL}/especialidade.php?especialidade=` +
        encodeURIComponent(especialidadeEscolhida);

      console.log('Buscando médicos em:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erro HTTP: ' + response.status);
      }

      const data = await response.json();

      console.log('Médicos recebidos:', data);

      if (Array.isArray(data)) {

        setMedicos(data);

        if (data.length === 0) {
          Alert.alert(
            'Aviso',
            'Nenhum médico encontrado para esta especialidade.'
          );
        }

      } else {

        setMedicos([]);

        Alert.alert(
          'Aviso',
          'Nenhum médico encontrado.'
        );
      }

    } catch (error) {

      console.error(
        'Erro ao carregar médicos:',
        error
      );

      setMedicos([]);

      Alert.alert(
        'Erro',
        'Não foi possível carregar a lista de médicos.'
      );

    } finally {

      setLoadingMedicos(false);
    }
  };

  // ========================================
  // AGENDAR CONSULTA
  // ========================================

  const marcarConsulta = async () => {

    if (
      !especialidade ||
      !medicoSelecionado ||
      !dataSelecionada ||
      !horaSelecionada
    ) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos antes de continuar.'
      );

      return;
    }

    setCarregando(true);

    try {

      // ========================================
      // PEGA O USUÁRIO LOGADO
      // ========================================

      const usuarioSalvo =
        await AsyncStorage.getItem('usuario');

      if (!usuarioSalvo) {

        Alert.alert(
          'Erro',
          'Usuário não encontrado. Faça login novamente.'
        );

        setCarregando(false);
        return;
      }

      const usuario = JSON.parse(usuarioSalvo);

      console.log('Usuário logado:', usuario);

      // ========================================
      // PEGA O ID DO USUÁRIO
      // ========================================

      const id_usuario = usuario.id_usuario;

      if (!id_usuario) {

        Alert.alert(
          'Erro',
          'ID do usuário não encontrado. Faça login novamente.'
        );

        setCarregando(false);
        return;
      }

      // ========================================
      // ENVIA PARA O PHP
      // ========================================

      const response = await fetch(
        `${API_URL}/consulta.php`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            id_usuario: id_usuario,

            id_medico: medicoSelecionado,

            data_consulta: dataSelecionada,

            horario: horaSelecionada,

          }),
        }
      );

      if (!response.ok) {

        throw new Error(
          'Erro HTTP: ' + response.status
        );
      }

      const resData = await response.json();

      console.log(
        'Resposta do agendamento:',
        resData
      );

      // ========================================
      // SUCESSO
      // ========================================

 // ========================================
// SUCESSO
// ========================================

if (resData.status === 'success') {

  Alert.alert(
    'Sucesso!',
    resData.message || 'Consulta agendada com sucesso!'
  );

  navigation.navigate('Tela1');

} else {

  Alert.alert(
    'Erro',
    resData.message || 'Erro ao agendar consulta.'
  );
}

    } catch (error) {

      console.error(
        'Erro ao agendar consulta:',
        error
      );

      Alert.alert(
        'Erro de Conexão',
        'Falha ao se comunicar com o servidor.'
      );

    } finally {

      setCarregando(false);
    }
  };

  // ========================================
  // TELA
  // ========================================

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Agendar Consulta
      </Text>

      {/* ==================================
          ESPECIALIDADE
      ================================== */}

      <View style={styles.pickerBox}>

        <Picker
          selectedValue={especialidade}
          onValueChange={handleEspecialidadeChange}
          style={styles.picker}
          dropdownIconColor="#7b81b1"
        >

          <Picker.Item
            label="Escolha especialidade"
            value=""
          />

          <Picker.Item
            label="Psicologia"
            value="Psicologia"
          />

          <Picker.Item
            label="Psiquiatria"
            value="Psiquiatria"
          />

          <Picker.Item
            label="Terapeuta"
            value="Terapeuta"
          />

        </Picker>

      </View>

      {/* ==================================
          MÉDICO
      ================================== */}

      {especialidade !== '' && (

        <View style={styles.pickerBox}>

          {loadingMedicos ? (

            <ActivityIndicator
              style={{
                paddingVertical: 15,
              }}
              color="#7b81b1"
            />

          ) : (

            <Picker
              selectedValue={medicoSelecionado}
              onValueChange={setMedicoSelecionado}
              style={styles.picker}
              dropdownIconColor="#7b81b1"
            >

              <Picker.Item
                label="Escolha o médico"
                value=""
              />

              {medicos.map((medico) => (

                <Picker.Item
                  key={String(medico.id_medico)}
                  label={medico.nome}
                  value={String(medico.id_medico)}
                />

              ))}

            </Picker>

          )}

        </View>

      )}

      {/* ==================================
          DATA
      ================================== */}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowCalendar(true)}
      >

        <Text style={styles.texto}>

          📅 {dataSelecionada || 'Selecionar data'}

        </Text>

      </TouchableOpacity>

      {/* ==================================
          CALENDÁRIO
      ================================== */}

      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"

        onRequestClose={() =>
          setShowCalendar(false)
        }
      >

        <View style={styles.modalBg}>

          <View style={styles.calendarCard}>

            <Calendar

              onDayPress={(day) => {

                setDataSelecionada(
                  day.dateString
                );

                setShowCalendar(false);
              }}

              markedDates={
                dataSelecionada
                  ? {
                      [dataSelecionada]: {
                        selected: true,
                        selectedColor: '#7b81b1',
                      },
                    }
                  : {}
              }

              theme={{

                todayTextColor:
                  '#7b81b1',

                selectedDayBackgroundColor:
                  '#7b81b1',

                arrowColor:
                  '#7b81b1',

              }}

            />

          </View>

          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={() =>
              setShowCalendar(false)
            }
          >

            <Text style={styles.textoFechar}>
              Fechar
            </Text>

          </TouchableOpacity>

        </View>

      </Modal>

      {/* ==================================
          HORÁRIO
      ================================== */}

      <View style={styles.pickerBox}>

        <Picker
          selectedValue={horaSelecionada}
          onValueChange={setHoraSelecionada}
          style={styles.picker}
          dropdownIconColor="#7b81b1"
        >

          <Picker.Item
            label="Escolha horário"
            value=""
          />

          <Picker.Item
            label="08:00"
            value="08:00"
          />

          <Picker.Item
            label="09:00"
            value="09:00"
          />

          <Picker.Item
            label="10:00"
            value="10:00"
          />

          <Picker.Item
            label="11:00"
            value="11:00"
          />

          <Picker.Item
            label="14:00"
            value="14:00"
          />

          <Picker.Item
            label="15:00"
            value="15:00"
          />

          <Picker.Item
            label="16:00"
            value="16:00"
          />

          <Picker.Item
            label="17:00"
            value="17:00"
          />

        </Picker>

      </View>

      {/* ==================================
          CONFIRMAR
      ================================== */}

      <TouchableOpacity

        style={[
          styles.botao,
          carregando &&
            styles.botaoDesabilitado,
        ]}

        onPress={marcarConsulta}

        disabled={carregando}

      >

        {carregando ? (

          <ActivityIndicator color="#fff" />

        ) : (

          <Text style={styles.textoBotao}>
            Confirmar Consulta
          </Text>

        )}

      </TouchableOpacity>

    </View>
  );
}

// ========================================
// ESTILOS
// ========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },

  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
    color: '#4f5b8a',
  },

  input: {
    borderWidth: 1,
    borderColor: '#7b81b1',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 15,
    fontSize: 16,
    color: '#969CC6',
    width: 320,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },

  texto: {
    fontSize: 16,
    color: '#969CC6',
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: '#7b81b1',
    borderRadius: 10,
    marginTop: 15,
    width: 320,
    alignSelf: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  picker: {
    height: 50,
    color: '#4f5b8a',
    backgroundColor: '#fff',
  },

  modalBg: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },

  botaoFechar: {
    marginTop: 20,
    backgroundColor: '#7b81b1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoFechar: {
    color: '#fff',
    fontWeight: 'bold',
  },

  botao: {
    marginTop: 25,
    backgroundColor: '#9BC6B8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    alignSelf: 'center',
  },

  botaoDesabilitado: {
    opacity: 0.7,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

});
