/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import { connect } from "react-redux";

import { ViroARSceneNavigator } from 'react-viro';
import WelcomeScreen from "./screens/WelcomeScreen";
var InitialARScene = require('./AR/HelloWorldSceneAR');

class Mishu extends Component {
  constructor() {
    super();
    this.state = {}
  }
  
  render() {
    const {selectedPet} = this.props
    return selectedPet.kind ? (
      <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }} />
    ) : (
      <WelcomeScreen />
    );
  }
}

const mapState = state => {
  console.log(state.pet)
  return {
    selectedPet: state.pet.selectedPet
  }
}

export default connect(mapState)(Mishu)
