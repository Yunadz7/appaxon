import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function TelaBemEstar({ navigation }) {
  const registos = [
    { id: '1', emoji: "😟", data: "Hoje, 12/05", humor: "Ansioso", assunto: "Trabalho, estudos", nota: "7/10" },
    { id: '2', emoji: "😊", data: "Ontem, 11/05", humor: "Tranquilo", assunto: "Família", nota: "5/10" },
    { id: '3', emoji: "😡", data: "10/05", humor: "Estressado", assunto: "Provas", nota: "8/10" },
    { id: '4', emoji: "😴", data: "09/05", humor: "Relaxado", assunto: "Fim de semana", nota: "3/10" },
    { id: '5', emoji: "😰", data: "08/05", humor: "Muito ansioso", assunto: "Entrevista", nota: "9/10" },
  ];

  return (

    
    <View style={styles.container}>
       <ScrollView
         
              showsVerticalScrollIndicator={true}
            >
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6FF" />

      {/* HEADER: Fixo no topo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#5B4FCF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Histórico</Text>

        <Ionicons name="options-outline" size={24} color="#5B4FCF" />
      </View>

     

        {/* RESUMO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Os teus últimos 7 dias</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Registos</Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Média de ansiedade</Text>
            </View>

            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: '#FF4D6D' }]}>
                ↑ 10%
              </Text>
              <Text style={styles.statLabel}>Semana passada</Text>
            </View>
          </View>
        </View>

        {/* GRÁFICO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Evolução da ansiedade</Text>

          <View style={styles.graphArea}>
            <Text style={styles.graphText}>📈 Gráfico da ansiedade</Text>
            <Text style={styles.graphSub}>
              (adiciona uma biblioteca de gráficos depois)
            </Text>
          </View>
        </View>

        {/* REGISTOS */}
        <Text style={styles.registroTitulo}>Os teus registos</Text>

        <View style={styles.card}>
          {registos.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.registroItem,
                index === registos.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>

              <View style={styles.registroInfo}>
                <Text style={styles.data}>{item.data}</Text>
                <Text style={styles.assunto}>
                  {item.humor} • {item.assunto}
                </Text>
              </View>

              <Text style={styles.nota}>{item.nota}</Text>

              <Ionicons name="chevron-forward" size={18} color="#999" />
            </View>
          ))}
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

 scroll: {
    paddingBottom: 120,
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

  graphArea: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },

  graphText: {
    fontSize: 18,
  },

  graphSub: {
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
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
});
