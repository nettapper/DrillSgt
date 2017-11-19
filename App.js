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
  Linking,
} from 'react-native';

import {
  countExerciseComplete,
  countExerciseFailure,
} from './fixtures';

import PushNotification from "react-native-push-notification";
import PieChart from './components/PieChart';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.onPressCompleteWorkout = this.onPressCompleteWorkout.bind(this);
    this.onPressFailWorkout = this.onPressFailWorkout.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.getPieChartData = this.getPieChartData.bind(this);

    // Get data
    this.getPieChartData();

    this.state = {
      "activated": false,
      "ongoingId": "init",
      "pieChartData": {"Failed": 1, "Complete": 1},
      "current": {"name": "Pushups", "count": 20},
    };
  }

  getPieChartData() {
    var that = this;
    countExerciseComplete().then(function(countC) {
      console.log(countC);
      that.setState({"pieChartData": {"Failed": that.state.pieChartData.Failed, "Complete": countC}});
      return countExerciseFailure();
    }).then(function(countF) {
      console.log(countF);
      that.setState({"pieChartData": {"Failed": countF, "Complete": that.state.pieChartData.Complete}});
    }).catch(function(error) {
      console.log(error);
    });
  }

  componentWillMount() {
    PushNotification.cancelLocalNotifications({id: '69'});

    if (!this.state.activated) {
      PushNotification.registerNotificationActions(["Do it Later"]);

      DeviceEventEmitter.addListener('notificationActionReceived', function(action) {
        const info = JSON.parse(action.dataJSON);
        if (info.action == "Do it Later") {
          // Do work pertaining to I\'m Done action here
          info.date = new Date(Date.now() + (5 * 1000)), // 5 seconds
          PushNotification.localNotificationSchedule(info);
        }
      });

      this.setNotification();
      this.setState({"activated": true});
    }
  }

  setNotification() {
    PushNotification.cancelLocalNotifications({id: '69'});

    // Query random workout

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
      actions: '["Do it Later"]',
      date: new Date(Date.now() + (1 * 1000)),
      workoutId: 10,
    });
  }

  onPressCompleteWorkout() {
    return
  }

  onPressFailWorkout() {
    return
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginTop: 20, flexDirection: 'row'}}>
            <View style={{flex: 5}}>
              <Text style={{fontSize: 69, textAlign: 'center',}}>Drill Sgt</Text>
            </View>
          </View>
          <View style={{flexGrow: 2}}>
            <PieChart data={this.state.pieChartData}/>
          </View>
          <View style={{flexGrow: 1}}>
            <Text style={{fontSize: 35, textAlign: 'center',}}>{this.state.current.name} {this.state.current.count}</Text>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.buttonComplete}
                onPress={this.onPressCompleteWorkout}
                title="Complete"
                color="cyan"
                accessibilityLabel="Once finished the workout you will input your ratings."
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.buttonFaile}
                onPress={this.onPressFailWorkout}
                title="Failed"
                color="tomato"
                accessibilityLabel="Statistics and charts."
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
  buttonComplete: {
  },
  buttonFail: {
  },
});

/*
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
*/
