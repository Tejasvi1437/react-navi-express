import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Image, platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Alert} from 'react-native-web';
import {useDimensions, useDeviceOrientation} from react-native-community/hooks;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
      
       <View
      style={{
        backgroundColor: 'blue',
        width: '100%',
        height: '30%',
      }}
      ></View>
      
      <TouchableHighlight onPress={() => console.log("image tapped")}>
      <Image
        source={{
          width: 200,
          height: 300,
          uri: "https://picsum.photos/200/300"
        }}
        />
        </TouchableHighlight>
        
      <Button title="Click Me" onPress={() => Alert.alert("My title", "My message", 
      
        {text: "Yes",onPress: () => console.log("Yes pressed")},
        {text: "No",onPress: () => console.log("No pressed")}
      
      //text=>console.log(text)
      )}/> 

    </SafeAreaView>
  );
}

//const containerStyle = { backgroundColor: 'blue'};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: platform.android ? 25 : 0,
  },
});
