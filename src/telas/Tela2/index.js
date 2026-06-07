import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';

export default function Tela2({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

//TELA LOGIN 

  return (
    <ImageBackground
      source={require('../../../assets/img_fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />

        <Text style={styles.titulo1}>Faça seu login</Text>
        <Text style={styles.titulo2}>Não possui uma conta ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Tela7')}>
          <Text style={styles.linkTexto}>Clique aqui</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
   
          <TextInput
            style={styles.input1}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />

          <TextInput
            style={styles.input3}
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />

     
         

          <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Tela1')}
        >
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>




        </View>
      </ScrollView>
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

   input1: {
    borderWidth: 1,
    borderColor: '#7b81b1ff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginLeft: 55,
    fontSize: 16,
    color: '#969CC6',
    width: 290,
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
  marginTop: -90,
},
//titulo 1 
  titulo1: {
  fontSize: 25,
  fontWeight: '400',
  color: '#8db6a8ff',
  textAlign: 'center',
  marginTop: -100,
  marginLeft: -150,
},
//titulo 2 da tela 
 titulo2: {
  fontSize: 12,
  fontWeight: '300',
  color: '#000000ff',
  textAlign: 'center',
  marginTop: 10,
  marginLeft:-180,
},
//botão estilo
botao: {
  backgroundColor: '#9BC6B8',
  padding: 15,
  borderRadius: 30,
  alignItems: 'center',
  width: 200,
  marginTop: 100,
  marginLeft: 105,
},

textoBotao: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600'
},

  linkTexto: {
    color: '#969CC6',          // cor link
    textDecorationLine: 'underline', // sublinha
    fontSize: 12,
    textAlign: 'center',
    marginTop: -17,
    marginLeft:6,
  },


  input2: {
    borderWidth: 1,          // borda da caixa
    borderColor: '#7b81b1ff',     // cor da borda
    borderRadius: 10,        // cantos arredondados
    padding: 10,             // espaço interno
    marginTop: 30,
    marginLeft:55 ,
    fontSize: 16,
    color:'#969CC6',
    width:290,
  },

  input3: {
    borderWidth: 1,          // borda da caixa
    borderColor: '#7b81b1ff',     // cor da borda
    borderRadius: 10,        // cantos arredondados
    padding: 10,             // espaço interno
    marginTop:46 ,
    marginLeft:55,
    fontSize: 16,
    color:'#969CC6',
    width:290,
  },




  
  
});

