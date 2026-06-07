import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Tela5({navigation}) {
  
  return (
  <View style ={styles.container}>
    <Text>Tela 5</Text>
    <Button
      title="ir para Tela 6"
      onPress={() => navigation.navigate("Tela6")}
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
