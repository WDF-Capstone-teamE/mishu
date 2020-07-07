'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroConstants } from 'react-viro';

import MishuComponent from './MishuComponent';

import sceneReference from './SceneReference';

import planeSelector from './PlaneSelection';

// import debugButtonsFramework from './DebugButtonsFramework'

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    this.state = { };
    this._onInitialized = this._onInitialized.bind(this);
    this.updateScene = this.updateScene.bind(this);

    // let other components and scripts update the entire scene easily 
    // without having to pass props around
    sceneReference.updateScene = this.updateScene;
  }

  updateScene() {
    this.setState({});
  }

  render() {

    /*
      the rest of the rendering logic that doesn't have anything
      to do with the plane detection logic
    */
    function renderInnerScene () {
      return (
        <React.Fragment>
          {/* Draw our mishu component */}
          <MishuComponent />
        </React.Fragment>
      );
    }

    /*
      since the only way to get continuous hit detection for placement 
      is through a callback on the ViroARScene, we need to have two versions 
      of rendering the scene,

      one where we're checking every "frame" for plane detection
      
      and one when we're not, so we dont check for hit detection 
      when we dont need it
    */
    const renderSceneWithHitDetection = () => {
      return (
        <ViroARScene 
          onCameraARHitTest={planeSelector.onCameraARHitTest}
          onTrackingUpdated={this._onInitialized} >
          
          { planeSelector.renderHitPointGhost() }
          
          { renderInnerScene() }
  
        </ViroARScene>
      );
    }
    const renderSceneWithoutHitDetection = () => {
      return (
        <ViroARScene onTrackingUpdated={this._onInitialized} >
          { renderInnerScene() }
        </ViroARScene>
      );  
    }

    return (
      <React.Fragment>

        { 
          planeSelector.planeSelectionEnabled ? 
            renderSceneWithHitDetection() : 
            renderSceneWithoutHitDetection() 
        }

        {/* render the debug menu if any debug buttons exist */}
        {/* { debugButtonsFramework.drawDebugButtonMenu() } */}
      </React.Fragment>
    )
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log("Viro Tracking Initialized!");
      this.updateScene();
    } 
    else if (state == ViroConstants.TRACKING_NONE) {
      console.error("Viro Tracking Error!\n", reason);
    }
  }
}

module.exports = HelloWorldSceneAR;
