/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { Provider } from "react-redux";

// import { ViroARSceneNavigator } from 'react-viro';

import WelcomeScreen from './js/screens/WelcomeScreen'

// var InitialARScene = require('./js/HelloWorldSceneAR');

export default class ViroSample extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <Provider>
        {/* <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        /> */}
        <WelcomeScreen />
      </Provider>
    );
    
  }
}

module.exports = ViroSample
