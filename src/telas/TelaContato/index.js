import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaContato({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const API_URL = 'http://localhost/axon_api/buscar_contato.php';

  const buscarContatos = async () => {
    try {
      // Cria o FormData caso queira enviar algum parâmetro futuro
      const form = new FormData();

      const response = await fetch(API_URL, {
        method: 'POST',
        body: form,
      });

      const json = await response.json();

      if (json.sucesso && Array.isArray(json.contatos)) {
        setContatos(json.contatos);
      } else if (Array.isArray(json)) {
        setContatos(json);
      } else {
        setContatos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar do localhost:', error);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  // Puxa do banco sempre que abre a tela
  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      buscarContatos();
    }, [])
  );

  const aoAtualizar = () => {
    setAtualizando(true);
    buscarContatos();
  };

  // CONTAINER DE CADA CONTATO
  const renderContato = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.avatarBox}>
        <Ionicons name="person-circle-outline" size={44} color="#007AFF" />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.nomeText}>{item.nome_contato}</Text>
        <Text style={styles.numeroText}>{item.numero}</Text>
      </View>
      <Ionicons name="call-outline" size={24} color="#34C759" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contatos Cadastrados</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* LISTA EM CONTAINERS */}
      {carregando ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={contatos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderContato}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} />
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="people-outline" size={50} color="#ccc" />
              <Text style={styles.emptyText}>Nenhum contato encontrado no banco.</Text>
            </View>
          }
        />
      )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  /* CONTAINER INDIVIDUAL DOS CONTATOS */
  cardContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarBox: {
    marginRight: 12,
  },
  infoBox: {
    flex: 1,
  },
  nomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  numeroText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    color: '#aaa',
    fontSize: 16,
  },
});