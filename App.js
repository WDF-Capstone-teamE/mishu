import React, { Component } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

var InitialARScene = require('./js/HelloWorldSceneAR.js');


export default class ViroSample extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <View style={localStyles.outer} >
        <ViroARSceneNavigator style={localStyles.arView}
            initialScene={{scene:InitialARScene}}
        />
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
  },
});

module.exports = ViroSample