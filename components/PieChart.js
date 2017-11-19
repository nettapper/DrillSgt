import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Svg,{
  Circle,
  Image
} from 'react-native-svg';

import { VictoryPie, VictoryTheme } from "victory-native";

const wh = 300;  // graph width and height
const imgwh = 100;  // img width and height
const irpad = 10; // padding for the innerRadius

export default class App extends Component<{}> {
  render() {
    const { data } = this.props;

    console.log("GI")
    console.log(data);

    return (
      <Svg width={wh} height={wh}>
        <Image y={wh/2 - imgwh/2} x={wh/2 - imgwh/2} width={imgwh} height={imgwh} href={require('../img/drill-sgt-logo.png')}/>
        <VictoryPie
          width={wh}
          height={wh}
          standalone={false}
          responsive={true}
          innerRadius={imgwh + irpad}
          padAngle={3}
          colorScale={["tomato", "cyan"]}
          data={[
            { x: "Failed", y: data.Failed },
            { x: "Complete", y: data.Complete }
          ]}
          labelRadius={90}
          style={{ labels: { fill: "black", fontSize: 20, fontWeight: "bold" } }}
        />
      </Svg>
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
