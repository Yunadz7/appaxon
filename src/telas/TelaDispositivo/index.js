import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

// IMPORTAÇÃO DO NAVIGATOR (BOA PRÁTICA)
import { useNavigation } from '@react-navigation/native';

// Captura a altura real da tela para forçar o limite físico no container
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TelaDispositivo() {
  // Inicializa o hook de navegação aqui dentro
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true} 
        bounces={true}
        overScrollMode="always" // Garante o feedback visual de rolagem no Android
      >
        <View style={styles.content}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#4B3FAF" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Conectar Dispositivo</Text>

            <Ionicons name="information-circle-outline" size={24} color="#8B6DFF" />
          </View>

          {/* TEXTO */}
          <Text style={styles.subtitle}>
            Conecte seu relógio para acompanhar seus dados de saúde mental em tempo real.
          </Text>

          {/* CARD PRINCIPAL */}
          <View style={styles.mainCard}>
            {/* RELOGIO */}
            <View style={styles.watchSection}>
              <View style={styles.watchCircle}>
                <MaterialCommunityIcons name="watch-variant" size={90} color="#B69CFF" />
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedText}>Conectado</Text>
                </View>
              </View>
            </View>

            {/* BENEFICIOS */}
            <View style={styles.benefitsSection}>
              <Text style={styles.benefitsTitle}>Benefícios de conectar o relógio</Text>
              <Benefit text="Monitore seu humor ao longo do dia" />
              <Benefit text="Acompanhe o estresse em tempo real" />
              <Benefit text="Receba lembretes de autocuidado" />
              <Benefit text="Veja seus dados direto no app" />

              {/* BOTÃO PRINCIPAL (CORRIGIDO PARA .navigate) */}
              <TouchableOpacity
                style={styles.connectButton}
                onPress={() => navigation.navigate('TelaConexao')}
              >
                <Ionicons name="bluetooth-outline" size={18} color="#fff" />
                <Text style={styles.connectButtonText}>Conectar novo dispositivo</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* TITULO */}
          <Text style={styles.sectionTitle}>Dispositivos disponíveis</Text>

          {/* DISPOSITIVO */}
          <View style={styles.deviceCard}>
            <View style={styles.deviceLeft}>
              <View style={styles.deviceIcon}>
                <MaterialCommunityIcons name="watch-variant" size={28} color="#8B6DFF" />
              </View>
              <View>
                <Text style={styles.deviceName}>MindWatch Pro 2</Text>
                <Text style={styles.deviceId}>ID: MWPR02-9F3A</Text>
              </View>
            </View>
            
            {/* BOTÃO DA LISTA (CORRIGIDO PARA .navigate) */}
            <TouchableOpacity
              style={styles.deviceButton}
              onPress={() => navigation.navigate('TelaConexao')}
            >
              <Text style={styles.deviceButtonText}>Conectar</Text>
              
            </TouchableOpacity>
          </View>

          {/* COMO CONECTAR */}
          <Text style={styles.sectionTitle}>Como conectar</Text>

          <View style={styles.stepsCard}>
            <Step
              number="1"
              title="Ative o Bluetooth"
              subtitle="Certifique-se de que o Bluetooth está ativado no seu celular."
              icon="bluetooth-outline"
            />
            <Step
              number="2"
              title="Coloque o relógio próximo"
              subtitle="Mantenha o relógio perto do celular para facilitar a conexão."
              icon="watch-outline"
            />
            <Step
              number="3"
              title="Conecte e sincronize"
              subtitle="Após conectar, seus dados serão sincronizados automaticamente."
              icon="checkmark-outline"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* COMPONENTES SECUNDÁRIOS */
function Benefit({ text }) {
  return (
    <View style={styles.benefitRow}>
      <Ionicons name="checkmark-circle-outline" size={18} color="#8B6DFF" />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

function Step({ number, title, subtitle, icon }) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={styles.stepText}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.stepIcon}>
        <Ionicons name={icon} size={22} color="#8B6DFF" />
      </View>
    </View>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height: SCREEN_HEIGHT,
    maxHeight: SCREEN_HEIGHT,
    backgroundColor: '#F7F7FB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  watchSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  watchCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0EBFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  connectedBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  connectedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  benefitsSection: {
    marginTop: 10,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    marginLeft: 10,
    color: '#555',
    fontSize: 14,
  },
  connectButton: {
    backgroundColor: '#8B6DFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  deviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    backgroundColor: '#F0EBFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deviceId: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  deviceButton: {
    backgroundColor: '#F0EBFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deviceButtonText: {
    color: '#8B6DFF',
    fontWeight: 'bold',
  },
  stepsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B6DFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },
  stepIcon: {
    marginLeft: 10,
    justifyContent: 'center',
  },
});