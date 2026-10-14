import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ⚠️ Coloque aqui o IP local da sua máquina
const IP_SERVIDOR = 'localhost';

export default function TelaSensor({ navigation }) {
  const [bpm, setBpm] = useState('--');
  const [spo2, setSpo2] = useState('--');
  const [ansiedade, setAnsiedade] = useState('Conectando...');
  const [carregando, setCarregando] = useState(true);

  // Função para buscar as leituras no backend
  const buscarDadosSensor = async () => {
    try {
      const response = await fetch(`http://localhost/axon_api/buscar_leituras.php`);
      const data = await response.json();

      if (data.status === 'sucesso') {
        setBpm(data.bpm);
        setSpo2(data.spo2);
        setAnsiedade(data.ansiedade);
      } else {
        setAnsiedade('Aguardando sensor...');
      }
    } catch (error) {
      console.log('Erro ao buscar dados do sensor:', error);
      setAnsiedade('Erro na conexão');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDadosSensor();

    const intervalo = setInterval(() => {
      buscarDadosSensor();
    }, 1500);

    return () => clearInterval(intervalo);
  }, []);

  const getCorAnsiedade = () => {
    if (ansiedade === 'Calmo') return '#2ecc71';          // Verde
    if (ansiedade === 'Ansiedade Média') return '#f1c40f'; // Amarelo
    if (ansiedade === 'Ansiedade Alta') return '#e74c3c';  // Vermelho
    return '#95a5a6';                                     // Cinza
  };

  return (
    <View style={styles.container}>

      {/* HEADER COM BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('TelaDispositivo')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Leitura em Tempo Real</Text>
      </View>

      <View style={styles.conteudo}>
        {carregando ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : (
          <>
            {/* BADGE DE ANSIEDADE */}
            <View style={[styles.cardAnsiedade, { backgroundColor: getCorAnsiedade() }]}>
              <Text style={styles.labelAnsiedade}>Estado Atual</Text>
              <Text style={styles.textoAnsiedade}>{ansiedade}</Text>
            </View>

            {/* CARD BPM */}
            <View style={styles.cardMetrica}>
              <Ionicons name="heart" size={40} color="#e74c3c" />
              <View style={styles.infoMetrica}>
                <Text style={styles.labelMetrica}>Frequência Cardíaca</Text>
                <Text style={styles.valorMetrica}>{bpm} <Text style={styles.unidade}>BPM</Text></Text>
              </View>
            </View>

            {/* CARD SPO2 */}
            <View style={styles.cardMetrica}>
              <Ionicons name="water" size={40} color="#3498db" />
              <View style={styles.infoMetrica}>
                <Text style={styles.labelMetrica}>Saturação de Oxigênio</Text>
                <Text style={styles.valorMetrica}>{spo2} <Text style={styles.unidade}>%</Text></Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#2c3e50',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardAnsiedade: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  labelAnsiedade: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textoAnsiedade: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardMetrica: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  infoMetrica: {
    marginLeft: 20,
  },
  labelMetrica: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  valorMetrica: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  unidade: {
    fontSize: 16,
    color: '#95a5a6',
    fontWeight: 'normal',
  },
});