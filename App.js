import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
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
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
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
});
