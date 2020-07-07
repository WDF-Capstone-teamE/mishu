/*
    object in charge of the plane selection feature
*/

import React from 'react'
import { ViroSphere, ViroMaterials } from "react-viro";
import sceneReference from './SceneReference';

const planeSelector = {
    
    // visual marker as to where the ray's "hit point" is
    renderHitPointGhost () {
        if (this.hitPoint)
            return <ViroSphere position={this.hitPoint} radius={.025} materials={["placeGhostMaterial"]} />
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
        diffuseColor: 'red',
    },
});

module.exports = planeSelector;
