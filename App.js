import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
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
        <ViroARSceneNavigator style={localStyles.arView} apiKey="YOUR API KEY"
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

  buttons : {
    height: 80,
    width: 80,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});

module.exports = ViroSample