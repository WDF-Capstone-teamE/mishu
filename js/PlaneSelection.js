/*
    object in charge of the plane selection feature
*/

import React from 'react'
import { ViroQuad, ViroMaterials } from "react-viro";
import sceneReference from './SceneReference';

const TARGET_VISUAL_SIZE = .1;

const planeSelector = {

    planeSelectionEnabled: true,
    
    // visual marker as to where the ray's "hit point" is
    renderHitPointGhost () {
        if (this.hitPoint)
            return <ViroQuad 
                position={this.hitPoint} 
                height={TARGET_VISUAL_SIZE} width={TARGET_VISUAL_SIZE} 
                rotation={[-90,0,0]} 
                materials={["placeGhostMaterial"]} 
            />
    },

    onCameraARHitTest (results) {
        this.hitPoint = null;
        for (let i = 0; i < results.hitTestResults.length; i++) {
            let result = results.hitTestResults[i];
            if (result.type == "ExistingPlaneUsingExtent") {
                planeSelector.hitPoint = result.transform.position;
                break;
            }     
        }

        // continuously update the scene so it shows teh correct hitpoint
        sceneReference.updateScene();
    },
}

planeSelector.onCameraARHitTest = planeSelector.onCameraARHitTest.bind(planeSelector);

ViroMaterials.createMaterials({
    placeGhostMaterial: {
        diffuseTexture: require("./res/place_target.png"),
    },
});

module.exports = planeSelector;
