'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroConstants } from 'react-viro';

import MishuComponent from './MishuComponent';
import planeSelector from './PlaneSelection';

import sceneReference from './SceneReference';

import mishuTransform from './Transform'
import debugButtonsFramework from './DebugButtonsFramework';
import { Alert } from 'react-native';




/*
===========================
vvvvvvvvvvv   DEBUG ONLY:: Remove when we have an actual UI vvvvvvvvvvv
===========================

just adding some buttons here to test the functionality of
the plane selector
*/

planeSelector.registerOnEnableCallback((enabled) => {
    
  // add buttons to the debug menu to disable and enable the plane selector
  debugButtonsFramework.removeButton(`${enabled ? "Enable" : "Disable"} Plane Select`)

  debugButtonsFramework.addButton(`${enabled ? "Disable" : "Enable"} Plane Select`, () => {
      planeSelector.enable(!enabled);
  });

  // if teh plane selector is enabled add a button to set
  // the transform position of the pet to the 
  // plane selector's found "hit point"
  if (enabled) {
      debugButtonsFramework.addButton("Move Pet To Spot", () => {

          // first check if the planeSelector has a point to put
          // the pet on
          if (planeSelector.hasFlatSurfacePoint()) {
              // set the transform position
              mishuTransform.setPosition(...planeSelector.hitPoint);
          }
          else {
              // just display an alert for now if we try to move the pet
              // without a surface detected
              Alert.alert("Nope!", "Mishu needs a flat surface to stand on!");
          }
      });
  }
  else {
      debugButtonsFramework.removeButton("Move Pet To Spot");
  }
});
/*
===========================
^^^^^^^^^^^   DEBUG ONLY:: Remove when we have an actual UI ^^^^^^^^^^^
===========================
*/











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
          planeSelector.enabled ? 
            renderSceneWithHitDetection() : 
            renderSceneWithoutHitDetection() 
        }

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
