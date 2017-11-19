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
  Dimensions,
} from 'react-native';

import {
  countExerciseComplete,
  countExerciseFailure,
  getCurrent,
  insertWorkout,
  randomExerciseAndInsertCurrent,
  removeCurrentById,
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
    this.updateCurrent = this.updateCurrent.bind(this);
    this.setNotification = this.setNotification.bind(this);

    // Get data
    this.getPieChartData();
    this.getCurrentData();

    this.state = {
      "activated": false,
      "ongoingId": "init",
      "pieChartData": {"Failed": 1, "Complete": 1},
      "current": [{"id": 0, "name": "Pushups", "count": 20}],
    };
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

      this.setState({"activated": true});
    }
  }

  getCurrentData() {
    var that = this;
    getCurrent().then(function(currentList) {
      console.log(currentList);
      that.setState({"current": currentList});
      that.setNotification();
      return countExerciseFailure();
    }).catch(function(error) {
      console.log(error);
    });
  }

  getPieChartData() {
    var that = this;
    countExerciseComplete().then(function(countC) {
      console.log(countC)
      that.setState({"pieChartData": {"Failed": that.state.pieChartData.Failed, "Complete": countC}});
      return countExerciseFailure();
    }).then(function(countF) {
      console.log(countF)
      that.setState({"pieChartData": {"Failed": countF, "Complete": that.state.pieChartData.Complete}});
    }).catch(function(error) {
      console.log(error);
    });
  }

  updateCurrent() {
    var that = this;
    var outerId = 0;
    randomExerciseAndInsertCurrent().then(function(currentId) {
      outerId = currentId;
      return getCurrent();
    }).then(function(currentList) {
      currentList.forEach((e) => {
        if (!(e.id === outerId)) {
          removeCurrentById(e.id);
        } else {
          that.setState({"current": [e]});
        }
      })
    }).catch(function(error) {
      console.log(error);
    });
  }

  setNotification() {
    var that = this;

    PushNotification.cancelLocalNotifications({id: '69'});

    PushNotification.localNotificationSchedule({
      id: '69',
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      bigText: "C'mon you filthy maggot your have " + that.state.current[0].count + " " + that.state.current[0].name + " to do!",
      subText: that.state.current[0].name,
      color: "red",
      vibrate: true,
      vibration: 2000,
      group: "DrillSgt",
      title: that.state.current[0].count + " " + that.state.current[0].name,
      message: "Gimme " + that.state.current[0].count + "!",
      playSound: false,
      //soundName: 'default',
      //repeatType: 'time',
      //repeatTime: 1500,
      actions: '["Do it Later"]',
      date: new Date(Date.now() + (1 * 1000)),
    });
  }

  onPressCompleteWorkout() {
    var that = this;
    insertWorkout(that.state.current[0].name, that.state.current[0].count, "2004-01-02 02:34:56", 5, 1).then(function() {
      that.getPieChartData();
      // Get new workout and update state
      that.updateCurrent();
      that.setNotification();
    }).catch(function(error) {
      console.log(error);
    });
  }

  onPressFailWorkout() {
    var that = this;
    insertWorkout(that.state.current[0].name, that.state.current[0].count, "2004-01-02 02:34:56", 5, 0).then(function() {
      that.getPieChartData();
      // Get new workout and update state
      that.updateCurrent();
      that.setNotification();
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View>
            <Text style={{fontSize: 69, textAlign: 'center', marginTop: 10}}>Drill Sgt</Text>
          </View>
          <View>
            <PieChart data={this.state.pieChartData}/>
          </View>
          <View>
            <Text style={{fontSize: 35, textAlign: 'center', marginBottom: 20}}>{this.state.current[0].name} {this.state.current[0].count}</Text>
          </View>
          <View>
              <Button
                style={{width: 600, height: 300,}}
                onPress={this.onPressCompleteWorkout}
                title="Complete"
                color="cyan"
                accessibilityLabel="Once finished the workout you will input your ratings."
              />
              <Button
                style={{width: 600, height: 300,}}
                onPress={this.onPressFailWorkout}
                title="Failed"
                color="tomato"
                accessibilityLabel="Statistics and charts."
              />
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
  row: {
    flex: 1,
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1,
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

<View style={styles.container}>
  <View style={{flexGrow: 1, marginTop: 20, flexDirection: 'row'}}>
    <View style={{flex: 5}}>
      <Text style={{fontSize: 69, textAlign: 'center',}}>Drill Sgt</Text>
    </View>
  </View>
  <View style={{flexGrow: 2}}>
    <PieChart data={this.state.pieChartData}/>
  </View>
  <View style={{flexGrow: 1}}>
    <Text style={{fontSize: 35, textAlign: 'center',}}>{this.state.current[0].name} {this.state.current[0].count}</Text>
    <View style={styles.row}>
       <View style={styles.buttonContainer}>
         <Button
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
</View>
*/
