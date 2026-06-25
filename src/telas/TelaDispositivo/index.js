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

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TelaDispositivo() {

  const navigation = useNavigation();
  const [dispositivo, setDispositivo] = React.useState(null);

  React.useEffect(() => {

    const carregar = async () => {
      try {
        const data = await AsyncStorage.getItem("dispositivo");

        if (data) {
          setDispositivo(JSON.parse(data));
        } else {
          setDispositivo(null);
        }

      } catch (err) {
        console.log(err);
        setDispositivo(null);
      }
    };

    const unsubscribe = navigation.addListener("focus", carregar);
    carregar();

    return unsubscribe;

  }, [navigation]);

  const desconectar = async () => {
    await AsyncStorage.removeItem("dispositivo");
    setDispositivo(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >

        <View style={styles.content}>

          {/* HEADER */}
          <View style={styles.header}>

            <TouchableOpacity onPress={() => navigation.navigate('TelaUsuario')}>
              <Ionicons name="arrow-back" size={24} color="#4B3FAF" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Conectar Dispositivo
            </Text>

            <Ionicons name="information-circle-outline" size={24} color="#8B6DFF" />
          </View>

          {/* TEXTO */}
          <Text style={styles.subtitle}>
            Conecte seu relógio para acompanhar seus dados em tempo real.
          </Text>

          {/* CARD */}
          <View style={styles.mainCard}>

            <View style={styles.watchSection}>
              <View style={styles.watchCircle}>

                <MaterialCommunityIcons
                  name="watch-variant"
                  size={90}
                  color="#B69CFF"
                />

                {/* 🔥 STATUS (QUADRADO COLORIDO) */}
                <View style={styles.statusBox(!!dispositivo)}>
                  <Text style={styles.statusText}>
                    {dispositivo
                      ? `Conectado: ${dispositivo.nome}`
                      : 'Desconectado'}
                  </Text>
                </View>

              </View>
            </View>

            {/* BENEFÍCIOS */}
            <View style={styles.benefitsSection}>

              <Text style={styles.benefitsTitle}>
                Benefícios de conectar o relógio
              </Text>

              <Text style={styles.benefit}>✔ Monitoramento de humor</Text>
              <Text style={styles.benefit}>✔ Estresse em tempo real</Text>
              <Text style={styles.benefit}>✔ Lembretes de autocuidado</Text>

              <TouchableOpacity
                style={styles.connectButton}
                onPress={() => navigation.navigate('TelaConexao')}
              >
                <Ionicons name="bluetooth-outline" size={18} color="#fff" />
                <Text style={styles.connectButtonText}>
                  Conectar novo dispositivo
                </Text>
              </TouchableOpacity>

              {dispositivo && (
                <TouchableOpacity onPress={desconectar}>
                  <Text style={{ color: 'red', textAlign: 'center', marginTop: 15 }}>
                    Desconectar dispositivo
                  </Text>
                </TouchableOpacity>
              )}

            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
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
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },

  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
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

  // 🔥 QUADRADO DE STATUS (VERDE/VERMELHO)
  statusBox: (conectado) => ({
    position: 'absolute',
    bottom: -12,
    backgroundColor: conectado ? '#4CAF50' : '#FF4D4D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 120,
    alignItems: 'center',
  }),

  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  benefitsSection: {
    marginTop: 10,
  },

  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  benefit: {
    color: '#555',
    marginBottom: 8,
  },

  connectButton: {
    backgroundColor: '#8B6DFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});