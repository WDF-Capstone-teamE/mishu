<<<<<<< HEAD
/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./js/store";

// import { ViroARSceneNavigator } from 'react-viro';

import App from "./js/app";

// var InitialARScene = require('./js/HelloWorldSceneAR');
=======
import React, { Component } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

var InitialARScene = require('./js/HelloWorldSceneAR.js');

import debugButtonsFramework from './js/DebugButtonsFramework'
>>>>>>> master

export default class ViroSample extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
<<<<<<< HEAD
      <Provider store={store}>
        <App />
      </Provider>
=======
      <View style={localStyles.outer} >
        <ViroARSceneNavigator style={localStyles.arView}
            initialScene={{scene:InitialARScene}}
        />
        {/* render the debug menu if any debug buttons exist */}
        { debugButtonsFramework.drawDebugButtonMenu( () => this.setState({}) ) }
      </View>
>>>>>>> master
    );
  }
}

<<<<<<< HEAD
module.exports = ViroSample;
=======
var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
  },
});

module.exports = ViroSample
>>>>>>> master
