import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalheRegistro({ navigation, route }) {

  const { registro } = route.params;

  return (

    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* HEADER */}
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#5B4FCF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detalhes</Text>

          <View style={{ width: 40 }} />

        </View>

        {/* CARD PRINCIPAL */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>Humor</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{registro.emocoes}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>😴 Sono</Text>
            <Text style={styles.value}>{registro.sono}/10</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>😟 Ansiedade</Text>
            <Text style={[
              styles.value,
              registro.ansiedade >= 7 && { color: '#FF4D6D' }
            ]}>
              {registro.ansiedade}/10
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🔋 Energia</Text>
            <Text style={styles.value}>
              {
                registro.energia == 3 ? "Alta" :
                registro.energia == 2 ? "Média" :
                "Baixa"
              }
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>💧 Água</Text>
            <Text style={styles.value}>{registro.agua}/10</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>💊 Medicação</Text>
            <Text style={styles.value}>
              {registro.medicacao == 1 ? "Sim" : "Não"}
            </Text>
          </View>

          <View style={styles.obsBox}>
            <Text style={styles.label}>📝 Observações</Text>
            <Text style={styles.obsText}>
              {registro.observacoes || "Sem observações"}
            </Text>
          </View>

          <Text style={styles.date}>
            📅 {registro.data_registro}
          </Text>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF1FF',
  },

  scroll: {
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EAE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E2E2E'
  },

  card: {
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 20,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAE8FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },

  badgeText: {
    color: '#5B4FCF',
    fontWeight: 'bold'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  label: {
    fontSize: 15,
    color: '#444',
  },

  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E2E2E',
  },

  obsBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#F6F7FF',
    borderRadius: 12,
  },

  obsText: {
    marginTop: 6,
    color: '#555',
  },

  date: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
  }

});