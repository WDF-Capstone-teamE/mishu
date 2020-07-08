/*
    object in charge of the plane detection feature

    can be enabled and disabled, since the hit detection
    feature happens every "frame", so we want to disable
    it when not in use
*/

import React from 'react'
import { ViroQuad, ViroMaterials } from "react-viro";

import sceneReference from './SceneReference';

// the size of the visual that renders
// where we are detecting a plane
const TARGET_VISUAL_SIZE = .1;

const planeSelector = {

    // the point in 3d space that the camera is pointing towards 
    // that lies on a flat surface
    // (null if none found)
    hitPoint: null,

    hasFlatSurfacePoint() {
        return !!this.hitPoint;
    },

    // are we looking for a plane ?
    enabled: false,

    // array of callbacks to invoke when enabling or disabling
    // plane selection mode
    onEnabledCallbacks: [],
    
    registerOnEnableCallback(callback) {
        // initialize the callback to current enabled state
        callback(this.enabled);
        // store the callback  
        this.onEnabledCallbacks.push(callback);
    },
        
    // toggle the plane selection mode on or off
    enable(enabled) {
        this.enabled = enabled;

        // notify the registered callbacks
        this.onEnabledCallbacks.forEach(cb => cb(enabled));
    },
    
    // clalback given to the Viro AR scene to continuously cehck for
    // flat surfaces
    onCameraARHitTest (results) {
        
        this.hitPoint = null;
        
        for (let i = 0; i < results.hitTestResults.length; i++) {
            let result = results.hitTestResults[i];
            if (result.type == "ExistingPlaneUsingExtent") {
                this.hitPoint = result.transform.position;
                break;
            }     
        }
        
        // continuously update the scene so it redraws the react 
        // components and shows the correct hitpoint
        sceneReference.updateScene();
    },

    // render the visual marker as to where the ray's "hit point" is
    // currently just a Quad with a "target" texture
    renderHitPointGhost () {
        if (this.hitPoint)
            return <ViroQuad 
                position={this.hitPoint} 
                height={TARGET_VISUAL_SIZE} width={TARGET_VISUAL_SIZE} 
                rotation={[-90,0,0]} 
                materials={["placeGhostMaterial"]} 
            />
    },
}

planeSelector.onCameraARHitTest = planeSelector.onCameraARHitTest.bind(planeSelector);

ViroMaterials.createMaterials({
    placeGhostMaterial: {
        diffuseTexture: require("./res/place_target.png"),
    },
});

module.exports = planeSelector;
