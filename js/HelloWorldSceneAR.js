'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroAmbientLight, ViroConstants } from 'react-viro';

import MishuComponent from './MishuComponent';

import sceneReference from './SceneReference';


import planeSelector from './PlaneSelection';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    // Set initial state here
    this.state = { };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this.updateScene = this.updateScene.bind(this);

    sceneReference.updateScene = this.updateScene;
  }

  updateScene() {
    this.setState({});
  }

  render() {
    return (
      <ViroARScene 
        onCameraARHitTest={planeSelector.onCameraARHitTest}
        onTrackingUpdated={this._onInitialized} >
        
        { planeSelector.renderHitPointGhost() }
      
        <ViroAmbientLight color={"#aaaaaa"} />
        
        {/* Draw our mishu component */}
        <MishuComponent />

      </ViroARScene>

    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log("Viro Tracking Initialized!");
      this.updateScene();
    } 
    else if (state == ViroConstants.TRACKING_NONE) {
      console.error("Viro Tracking Error!\n", reason);
      // Handle loss of tracking
    }
  }
}

module.exports = HelloWorldSceneAR;
