/*
    the actual mishu component, 
    just a wrapper around drawing a box for now
*/

import React from 'react'

import mishuTransform from './Transform'

import { ViroBox, ViroMaterials } from "react-viro";

function MishuComponent () {
    return (
        <ViroBox
          scale={[.1,.1,.1]}
          position={mishuTransform.getPosition()}
          rotation={mishuTransform.getRotation()}
          materials={["mishuMaterial"]}
        />
    );
}

ViroMaterials.createMaterials({
    mishuMaterial: {
        diffuseTexture: require("./res/grid_bg.jpg"),
    },
});
  

module.exports = MishuComponent;