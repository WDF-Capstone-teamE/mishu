'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroAmbientLight, ViroConstants } from 'react-viro';

import MishuComponent from './MishuComponent';

import sceneReference from './SceneReference';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    // Set initial state here
    this.state = { };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (

      // set the global scene reference so we can have access
      // to it in other scripts
      <ViroARScene 
        ref={ref => { sceneReference.setReference(ref); }}
        onTrackingUpdated={this._onInitialized} >
      
        <ViroAmbientLight color={"#aaaaaa"} />
        
        {/* Draw our mishu component */}
        <MishuComponent />
      
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log("Viro Tracking Initialized!");
      this.setState();
    } 
    else if (state == ViroConstants.TRACKING_NONE) {
      console.error("Viro Tracking Error!\n", reason);
      // Handle loss of tracking
    }
  }
}

module.exports = HelloWorldSceneAR;
