/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

import debugButtonsFramework from './js/DebugButtonsFramework'

var InitialARScene = require('./js/HelloWorldSceneAR');

export default class ViroSample extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <ViroARSceneNavigator {...this.state.sharedProps} initialScene={{scene: InitialARScene}} />
        {/* render the debug menu if any debug buttons exist */}
        { debugButtonsFramework.drawDebugButtonMenu( () => this.setState({}) ) }
      </React.Fragment>
    )
  }
}

module.exports = ViroSample
