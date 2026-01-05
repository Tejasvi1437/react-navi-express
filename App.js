import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import { SafeAreaViewBase } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  return (
    <SafeAreaViewBase style={styles.container}>

      <Button title="Press me" onPress={() => Alert.alert("My title","My message",[{text:"Yes"},{text:"No"}])} />

        <Button title="Press me" onPress={() => Alert.prompt("My title","My message",text=> console.log(text))} />

      {/*}
      <Text>Hello</Text>
      <TouchableHighlight onPress={() => {alert('Image pressed!')}}>
        <View style={{width:200, height:70, backgroundColor:'blue'}}></View>
      <Image 
        blurRadius={10}
        fadeDuration={1000}
        source={{ width:200,
        height:200, uri: 'https://picsum.photos/200/300'
      }} /> 
      </TouchableHighlight> */}
    </SafeAreaViewBase>
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
