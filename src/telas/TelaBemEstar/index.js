import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function TelaBemEstar({ navigation, route }) {
  const idUsuario = route?.params?.id_usuario || 1;

  const [registos, setRegistos] = useState([]);
  const [mediaAnsiedade, setMediaAnsiedade] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarRegistros();
  }, []);

  async function buscarRegistros() {
    try {
      setCarregando(true);

      const response = await fetch(
        `http://localhost/axon_api/buscarRegistro.php?id_usuario=${idUsuario}`
      );

      const json = await response.json();

      if (json.sucesso) {
        setRegistos(json.registros);

        if (json.registros.length > 0) {
          let soma = 0;
          json.registros.forEach((item) => {
            soma += Number(item.ansiedade);
          });

          setMediaAnsiedade((soma / json.registros.length).toFixed(1));
        } else {
          setMediaAnsiedade(0);
        }
      }
    } catch (erro) {
      console.log('Erro ao buscar registros:', erro);
    } finally {
      setCarregando(false);
    }
  }

  function emojiHumor(humor) {
    switch (humor) {
      case 'Feliz':
        return '😄';
      case 'Neutro':
      case 'Calmo':
        return '😐';
      case 'Triste':
        return '😔';
      case 'Ansioso':
      case 'Irritado':
        return '😰';
      default:
        return '😐';
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <StatusBar barStyle="dark-content" backgroundColor="#F4F6FF" />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#5B4FCF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Histórico</Text>

          <TouchableOpacity onPress={buscarRegistros}>
            <Ionicons name="refresh-outline" size={24} color="#5B4FCF" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Os teus últimos registros</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{registos.length}</Text>
              <Text style={styles.statLabel}>Registros</Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>{mediaAnsiedade}</Text>
              <Text style={styles.statLabel}>Média ansiedade</Text>
            </View>

            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: '#5B4FCF' }]}>
                {registos.length > 0 ? registos[0].ansiedade : 0}/10
              </Text>
              <Text style={styles.statLabel}>Último registro</Text>
            </View>
          </View>
        </View>

        <Text style={styles.registroTitulo}>Histórico</Text>

        <View style={styles.card}>
          {carregando ? (
            <ActivityIndicator size="large" color="#5B4FCF" style={{ padding: 20 }} />
          ) : registos.length === 0 ? (
            <Text style={styles.semRegistros}>Nenhum registro encontrado.</Text>
          ) : (
            registos.map((item, index) => (
              <View
                key={item.id_registro}
                style={[
                  styles.registroItem,
                  index === registos.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <Text style={styles.emoji}>{emojiHumor(item.emocoes)}</Text>

                <View style={styles.registroInfo}>
                  <Text style={styles.data}>
                    {item.data_formatada || item.data_registro}
                  </Text>

                  <Text style={styles.assunto} numberOfLines={1}>
                    {item.emocoes} {item.observacoes ? `• ${item.observacoes}` : ''}
                  </Text>
                </View>

                <Text style={styles.nota}>{item.ansiedade}/10</Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TelaDetalheRegistro', {
                      registro: item,
                    })
                  }
                >
                  <Ionicons name="chevron-forward" size={18} color="#999" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F4F6FF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E2E2E',
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7C6AE6',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E2E2E',
  },
  statLabel: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  registroTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#2E2E2E',
  },
  registroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  registroInfo: {
    flex: 1,
  },
  data: {
    fontWeight: 'bold',
    color: '#333',
  },
  assunto: {
    color: '#777',
    marginTop: 3,
    fontSize: 13,
  },
  nota: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#5B4FCF',
  },
  semRegistros: {
    textAlign: 'center',
    color: '#777',
    paddingVertical: 20,
  },
});