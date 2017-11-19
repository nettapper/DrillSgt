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
  ScrollView,
  Image,
  Button,
  DeviceEventEmitter,
} from 'react-native';

import PushNotification from "react-native-push-notification";
import PieChart from './components/PieChart';

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
    PushNotification.cancelLocalNotifications({id: '69'});

    if (!this.state.activated) {
      PushNotification.registerNotificationActions(["I\'m Done"]);

      DeviceEventEmitter.addListener('notificationActionReceived', function(action) {
        console.log('Notification action received: ' + action);
        const info = JSON.parse(action.dataJSON);
        if (info.action == "I\'m Done") {
          // Do work pertaining to Accept action here
          console.log("im done")
        }
      });

      PushNotification.localNotificationSchedule({
        id: '69',
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        bigText: "C'mon you filthy maggot your have 20 pushups to do!",
        subText: "Pushups",
        color: "red",
        vibrate: true,
        vibration: 2000,
        group: "DrillSgt",
        title: "20 Pushups",
        message: "Gimme 20!",
        playSound: false,
        //soundName: 'default',
        //repeatType: 'time',
        //repeatTime: 1500,
        actions: '["I\'m Done"]',
        date: new Date(Date.now() + (1 * 1000))
      });

      this.setState({"activated": true});
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <View style={{flex: 1, padding: 5}}>
              <Image
                style={{flex:1, width:'100%'}}
                resizeMode='contain'
                source={require('./img/drill-sgt-logo.png')}
              />
            </View>
            <View style={{flex: 5}}>
              <Text style={{fontSize: 69, textAlign: 'left', paddingLeft: 10}}>Drill Sgt.</Text>
            </View>
          </View>

          <View style={{flexGrow: 2}}>
            <PieChart/>
          </View>

          <View style={{flexGrow: 6}}>
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
      </ScrollView>
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
