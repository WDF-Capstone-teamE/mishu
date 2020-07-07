/*
    object in charge of the plane selection feature
*/

import { ViroSphere, ViroMaterials } from "react-viro";


const planeSelector = {
    hitPoints: [],
    
    /*
        arHitTestResult = (object) {
            type : string, [ "ExistingPlaneUsingExtent", "ExistingPlane", "EstimatedHorizontalPlane", "FeaturePoint" ]
            transform : (object) {
                position : array(number),
                rotation : array(number),
                scale : array(number)
            }
        }
    */
    onCameraARHitTest(results) {
        this.hitPoints = [];
        if (results.hitTestResults.length <= 0) {
            return;
        }

        for (let i = 0; i < results.hitTestResults.length; i++) {
            let result = results.hitTestResults[i];
            if (
                result.type == "ExistingPlaneUsingExtent"
                || result.type == "ExistingPlane"
                || result.type == "EstimatedHorizontalPlane"
                || result.type == "FeaturePoint"
            ) {
                this.points.push(results.transform.position);
           } 
        }
    },

    renderHitPointGhosts () {
        return (
            this.points.map(p => {
                return <ViroSphere
                    position={p}
                    radius={.1}
                    materials={["placeGhostMaterial"]}
                />
            })
        );
    }
}


ViroMaterials.createMaterials({
    placeGhostMaterial: {
        diffuseColor: 'red',
    },
});

module.exports = planeSelector;
