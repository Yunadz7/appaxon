import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function TelaNovidades({ navigation }) {

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
          Novidades & Atualizações
        </Text>

        {/* dica */}
        <View style={styles.cardNovidade}>

          <Text style={styles.tituloNovidade}>
            💡 Dica do Dia
          </Text>

          <Text style={styles.textoNovidade}>
            Tente respirar profundamente por
            2 minutos quando sentir ansiedade.
          </Text>

        </View>

        {/* meta */}
        <View style={styles.cardNovidade}>

          <Text style={styles.tituloNovidade}>
            🔥 Meta da Semana
          </Text>

          <Text style={styles.textoNovidade}>
            Complete 5 atividades seguidas
            para melhorar sua rotina.
          </Text>

        </View>

        {/* sono */}
        <View style={styles.cardNovidade}>

          <Text style={styles.tituloNovidade}>
            🌙 Dica de Sono
          </Text>

          <Text style={styles.textoNovidade}>
            Dormir pelo menos 8 horas ajuda
            a reduzir estresse e ansiedade.
          </Text>

        </View>

        {/* água */}
        <View style={styles.cardNovidade}>

          <Text style={styles.tituloNovidade}>
            🥤 Lembrete
          </Text>

          <Text style={styles.textoNovidade}>
            Não esqueça de beber água ao
            longo do dia.
          </Text>

        </View>

        {/* atualização */}
        <View style={styles.cardNovidade}>

          <Text style={styles.tituloNovidade}>
            🆕 Nova Atualização
          </Text>

          <Text style={styles.textoNovidade}>
            Agora o aplicativo possui
            registro diário e acompanhamento
            de atividades.
          </Text>

        </View>

        {/* frase */}
        <View style={styles.cardNovidade}>

          <Text style={styles.tituloNovidade}>
            ✨ Frase Motivacional
          </Text>

          <Text style={styles.textoNovidade}>
            “Pequenos passos todos os dias
            levam a grandes mudanças.”
          </Text>

        </View>

        {/* botão */}
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Tela1')}
        >
          <Text style={styles.textoBotao}>
            Voltar para Home
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
    color: '#555',
    marginTop: 80,
    marginLeft: 25,
    fontWeight: '600',
  },

  cardNovidade: {
    backgroundColor: '#fff',
    width: 320,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E5E8F5',
  },

  tituloNovidade: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6a5c85',
  },

  textoNovidade: {
    marginTop: 10,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },

  botao: {
    backgroundColor: '#9BC6B8',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 220,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

});