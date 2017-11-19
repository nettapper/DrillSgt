import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Svg,{
  Circle,
  Image
} from 'react-native-svg';

import { VictoryPie, VictoryTheme } from "victory-native";

const wh = Dimensions.get('window').width * .80;  // graph width and height
const imgwh = wh / 3;  // img width and height
const irpad = 15; // padding for the innerRadius

export default class App extends Component<{}> {
  render() {
    const { data } = this.props;

    return (
      <Svg width={wh} height={wh}>
        <Image y={wh/2 - imgwh/2} x={wh/2 - imgwh/2} width={imgwh} height={imgwh} href={require('../img/drill-sgt-logo.png')}/>
        <VictoryPie
          width={wh}
          height={wh}
          standalone={false}
          responsive={true}
          innerRadius={imgwh + irpad}
          padAngle={2}
          colorScale={["tomato", "cyan"]}
          data={[
            { x: "Failed", y: data.Failed },
            { x: "Complete", y: data.Complete }
          ]}
          labelRadius={70}
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
