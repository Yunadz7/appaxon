import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity} from 'react-native';

export default function Principal({ navigation }) {
  return (
    //imagem fundo tela inicial app
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >

    {/* imagem logo axon tela inicial */}
    <Image
     source={require('../../../assets/logo.png')}
     style={styles.logo}
    />

    <Text style={styles.titulo1}>Explore o fututo {"\n"} da conexão</Text>
    <Text style={styles.titulo2}>Conecte-se e acompanhe tudo{"\n"}com facilidade e praticidade</Text>





      <View style={styles.container}>

        <TouchableOpacity
  style={styles.botao}
  onPress={() => navigation.navigate("Tela7")}
>
  <Text style={styles.textoBotao}>começar 🠒</Text>
</TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // estilo do fundo  
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 //estilo logo
  logo: {
  width: 350,
  height: 300,
  marginBottom: 20,
  alignSelf: 'center',
},
//titulo 1 da tela principal
  titulo1: {
  fontSize: 40,
  fontWeight: '360',
  color: '#8db6a8ff',
  textAlign: 'center',
  marginTop: -100,
},
//titulo 2 da tela principal
 titulo2: {
  fontSize: 20,
  fontWeight: '300',
  color: '#000000ff',
  textAlign: 'center',
  marginTop: 20,
},
//botão estilo
botao: {
  backgroundColor: '#9BC6B8',
  padding: 15,
  borderRadius: 30,
  alignItems: 'center',
  width: 200,
  marginTop: -90,
},

textoBotao: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600'
}
});

