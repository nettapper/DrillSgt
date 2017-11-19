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
  Image,
  Button
} from 'react-native';
import PushNotification from "react-native-push-notification";

//var PushNotification = require('react-native-push-notification');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props) {
		super(props);
    this.state = {
      "activated": false,
    };
  }

  componentWillMount() {
    if (!this.state.activated) {
      PushNotification.localNotificationSchedule({
        id: '69',
        ticker: "20 PUSHUPS", // (optional)
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        subText: "Pushups", // (optional) default: none
        //color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: "group", // (optional) add group to message
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        title: "20 Pushups", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        message: "Don't be a pussy!", // (required)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
        actions: '["I\'m Done"]',  // (Android only) See the doc for notification actions to know more
        date: new Date(Date.now() + (1 * 1000)) // in 10 secs
      });

      this.setState({"activated": true});
    }
  }

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
          <Button
            onPress={onPressCompleteWorkout}
            title="Complete This Workout"
            color="#841584"
            accessibilityLabel="Once finished the workout you will input your ratings."
          />
          <Button
            onPress={onPressStatistics}
            title="Stats"
            color="#66CCCC"
            accessibilityLabel="Statistics and charts."
          />
        </View>
      </View>
    );
  }
}

class onPressCompleteWorkout extends Component<{}> {}
class onPressStatistics extends Component<{}> {}

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
