import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';

export default function TelaConsulta() {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [horaSelecionada, setHoraSelecionada] = useState('');

  const marcarConsulta = () => {
    if (!nome || !especialidade || !dataSelecionada || !horaSelecionada) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Consulta marcada',
      `Nome: ${nome}
Especialidade: ${especialidade}
Data: ${dataSelecionada}
Hora: ${horaSelecionada}`
    );
  };
  

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Agendar Consulta</Text>

      {/* NOME */}
      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#8a8fa6"
      />

      {/* ESPECIALIDADE */}
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={especialidade}
          onValueChange={setEspecialidade}
          style={styles.picker}
          dropdownIconColor="#7b81b1ff"
        >
          <Picker.Item label="Escolha especialidade" value="" />
          <Picker.Item label="Psicólogo" value="Psicólogo" />
          <Picker.Item label="Psiquiatra" value="Psiquiatra" />
          <Picker.Item label="Terapeuta" value="Terapeuta" />
        </Picker>
      </View>

      {/* DATA */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.texto}>
          📅 {dataSelecionada || 'Selecionar data'}
        </Text>
      </TouchableOpacity>

      {/* CALENDÁRIO */}
      <Modal visible={showCalendar} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.calendarCard}>
            <Calendar
              onDayPress={(day) => {
                setDataSelecionada(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={{
                [dataSelecionada]: {
                  selected: true,
                  selectedColor: '#7b81b1ff',
                },
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={() => setShowCalendar(false)}
          >
            <Text style={{ color: '#fff' }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* HORÁRIO */}
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={horaSelecionada}
          onValueChange={setHoraSelecionada}
          style={styles.picker}
          dropdownIconColor="#7b81b1ff"
        >
          <Picker.Item label="Escolha horário" value="" />
          <Picker.Item label="08:00" value="08:00" />
          <Picker.Item label="09:00" value="09:00" />
          <Picker.Item label="10:00" value="10:00" />
          <Picker.Item label="11:00" value="11:00" />
          <Picker.Item label="14:00" value="14:00" />
          <Picker.Item label="15:00" value="15:00" />
          <Picker.Item label="16:00" value="16:00" />
          <Picker.Item label="17:00" value="17:00" />
        </Picker>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity
  style={styles.botao}
  onPress={() => navigation.navigate('Principal')}
>
  <Text style={{ color: '#fff' }}>Confirmar Consulta</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
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
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 30,
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
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    marginTop: 20,
    width: 320,
    alignSelf: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  picker: {
    height: 50,
    color: '#4f5b8a',
    backgroundColor: '#fff', //”
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
    backgroundColor: '#7b81b1ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  botao: {
    marginTop: 30,
    backgroundColor: '#9BC6B8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
  },
});