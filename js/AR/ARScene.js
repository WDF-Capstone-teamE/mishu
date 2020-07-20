'use strict';

import React, { Component } from 'react';
import { ViroARScene, ViroAmbientLight, ViroDirectionalLight } from 'react-viro';
import MishuComponent from './MishuComponent';
import { planeSelector, PlaneSelectorComponent } from './PlaneSelection';

export default class ARScene extends Component {

  constructor() {
    super();
    this.state = { };
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
}

module.exports = ARScene;
