/*
    object in charge of the plane detection feature

    can be enabled and disabled, since the hit detection
    feature happens every "frame", so we want to disable
    some logic when not in use
*/

import React, { Component } from "react";
import { ViroQuad, ViroMaterials } from "react-viro";

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
    enabled: true,

    // array of callbacks to invoke when enabling or disabling
    // plane selection mode
    onEnabledCallbacks: [],

    redrawPlaneTargetImage: null,
    
    registerOnEnableCallback(callback) {
        // initialize the callback to current enabled state
        callback(this.enabled);
        // store the callback  
        this.onEnabledCallbacks.push(callback);
    },
        
    // toggle the plane selection mode on or off
    enable(enabled) {
        this.enabled = enabled;

        // this is to make sure the plane selector
        // react component stops rendering when disabled
        if (!enabled && this.redrawPlaneTargetImage)
            this.redrawPlaneTargetImage();

        // notify the registered callbacks
        this.onEnabledCallbacks.forEach(cb => cb(enabled));
    },

    // clalback given to the Viro AR scene to continuously cehck for
    // flat surfaces
    onCameraARHitTest (results) {

        if (!this.enabled)
            return;
        
        this.hitPoint = null;
        
        for (let i = 0; i < results.hitTestResults.length; i++) {
            let result = results.hitTestResults[i];
            if (result.type == "ExistingPlaneUsingExtent") {
                this.hitPoint = result.transform.position;
                break;
            }
        }

        // continuously update the react component so it displays the
        // correct hit point
        if (this.redrawPlaneTargetImage)
            this.redrawPlaneTargetImage();
    },
}

// bind so we can supply the callback to viro AR scene,
// but still use 'this' as the actual planeSelector object
planeSelector.onCameraARHitTest = planeSelector.onCameraARHitTest.bind(planeSelector);


class PlaneSelectorComponent extends Component {
    constructor() {
        super();
        this.state = {}

        const redrawPlaneTargetImage = () => this.setState({});

        planeSelector.redrawPlaneTargetImage = redrawPlaneTargetImage;
    }

    render() {
        if (planeSelector.enabled && planeSelector.hitPoint)
        {
            return <ViroQuad 
                position={planeSelector.hitPoint} 
                height={TARGET_VISUAL_SIZE} width={TARGET_VISUAL_SIZE} 
                rotation={[-90, 0, 0]} 
                materials={["placeTargeMaterial"]} 
            />
        }
        return null;
    }
}

// create the material for the "target"
// that displays at the hit point in the world
ViroMaterials.createMaterials({
    placeTargeMaterial: {
        diffuseTexture: require("./res/place_target.png"),
    },
});

module.exports = { planeSelector, PlaneSelectorComponent };
