import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Tela6({navigation}) {
  
  return (
  <View style ={styles.container}>
    <Text>Tela 6</Text>
    <Button
      title="ir para Tela 7"
      onPress={() => navigation.navigate("Tela7")}
    >

    </Button>
  </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
