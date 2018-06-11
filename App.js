/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import FastSecp256k1BridgeNativeModule from './FastSecp256k1BridgeNativeModule';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

FastSecp256k1BridgeNativeModule.exampleMethod();

FastSecp256k1BridgeNativeModule.keccak256("68656c6c6f").then(hash=>{
  console.log("Hash matches" + (hash == "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"));
});

//eth address = be862ad9abfe6f22bcb087716c7d89a26051f74c
FastSecp256k1BridgeNativeModule.ecsign("68656c6c6f","e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109").then(
  signature=>{
    console.log("Signature matches:" + (signature == "e6a21b8c7e3ae24f7486f3ee2d5e1aaa1d47f0b5efca149bf141d2fd7494f06805944d0564e8fdcb35b2b91fd154d8fa78dc485dc8f40f1b1b5bf9d0f14d77a900"));
    var r = signature.slice(0,64);
     var s = signature.slice(64,128);
     var v = 27 + parseInt(signature.slice(128,130));
      FastSecp256k1BridgeNativeModule.ecrecover("1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8",r,s,v).then(alert);
  });


function clicker(){
  FastSecp256k1BridgeNativeModule.verifyMessage("HELLO WORLD").then(console.log);
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
       <Button
        onPress={clicker  }
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
