'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroConstants, ViroAmbientLight, ViroDirectionalLight } from 'react-viro';

import MishuComponent from './MishuComponent';
import { planeSelector, PlaneSelectorComponent } from './PlaneSelection';

import mishuTransform from './Transform'
import { debugButtonsFramework } from './DebugButtonsFramework';

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
  }

  render() {
    /* 
      turns our disabling and enabling the continuous hit detection via
      rendering a different version of the ViroARScene component (one with
      hit detection, one without) also reloads all the assets within a scene :/ 
      so i guess we have to deal with the performance hit of continuously querying 
      plane detection via viro over relaodign models everytime 
      we turn it off and on
    */
    return (
      <React.Fragment>

        <ViroARScene 
          onCameraARHitTest={planeSelector.onCameraARHitTest}
          onTrackingUpdated={this._onInitialized} >
          
          <PlaneSelectorComponent />

          {/* Draw our mishu component */}
          <ViroDirectionalLight color="#ffffff" direction={[0,-1,-.2]}/>
          <ViroAmbientLight color="#ffffff" intensity={200}/>
          <MishuComponent />
  
        </ViroARScene>

      </React.Fragment>
    )
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log("Viro Tracking Initialized!");
    } 
    else if (state == ViroConstants.TRACKING_NONE) {
      console.error("Viro Tracking Error!\n", reason);
    }
  }
}

module.exports = HelloWorldSceneAR;
