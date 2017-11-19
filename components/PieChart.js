import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { VictoryPie, VictoryTheme } from "victory-native";

export default class App extends Component<{}> {
  render() {
    return (
      <VictoryPie
        responsive={true}
        innerRadius={100}
        padAngle={3}
        colorScale={["tomato", "cyan"]}
        data={[
          { x: "Failed", y: 24 },
          { x: "Complete", y: 78 }
        ]}
        labelRadius={90}
        style={{ labels: { fill: "black", fontSize: 20, fontWeight: "bold" } }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
