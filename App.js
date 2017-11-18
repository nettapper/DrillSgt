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
  Image
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
          <View style={{flex: 1, padding: 5}}>
            <Image
              style={{flex:1, width:'100%'}}
              resizeMode='contain'
              source={require('./img/drill-sgt-logo.gif')}
            />
          </View>
          <View style={{flex: 5}}>
            <Text style={{fontSize: 69, textAlign: 'left', paddingLeft: 10}}>Drill Sgt.</Text>
          </View>
        </View>

        <View style={{flexGrow: 8}}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>

        <View style={{flexGrow: 1}}>
          <Text>Bottom buttons</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
