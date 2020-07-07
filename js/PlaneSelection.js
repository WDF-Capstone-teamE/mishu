/*
    object in charge of the plane selection feature
*/

import React from 'react'
import { ViroQuad, ViroMaterials } from "react-viro";
import sceneReference from './SceneReference';


import debugButtonsFramework from './DebugButtonsFramework';

const TARGET_VISUAL_SIZE = .1;

const planeSelector = {

    planeSelectionEnabled: true,

    planeSelectionToggledCallbacks: [],
    
    onPlaneSelectionToggled(callback) {
        // initialize the callback to current state
        callback(this.planeSelectionEnabled);
        
        this.planeSelectionToggledCallbacks.push(callback);
    },
        

    enablePlaneSelection(enabled) {
        this.planeSelectionEnabled = enabled;

        this.planeSelectionToggledCallbacks.forEach(cb => cb(enabled));

        // sceneReference.updateScene();
    },
    
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
planeSelector.enablePlaneSelection = planeSelector.enablePlaneSelection.bind(planeSelector);

planeSelector.enablePlaneSelection(false);



// DEBUG ONLY
planeSelector.onPlaneSelectionToggled((enabled) => {
    debugButtonsFramework.removeButton(`${enabled ? "Enable" : "Disable"} Plane Select`)
    debugButtonsFramework.addButton(`${enabled ? "Disable" : "Enable"} Plane Select`, () => {
        planeSelector.enablePlaneSelection(!enabled);
    });
});
// DEBUG ONLY

ViroMaterials.createMaterials({
    placeGhostMaterial: {
        diffuseTexture: require("./res/place_target.png"),
    },
});

module.exports = planeSelector;
