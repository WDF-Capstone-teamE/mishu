/*
    the actual mishu component, 
    just a wrapper around drawing a box for now
*/

import React from 'react'

import mishuTransform from './Transform'

import { Viro3DObject, ViroMaterials } from "react-viro";

function MishuComponent () {
    return (
        <Viro3DObject

        source={require('./res/PolydactylTestModel/Berry_Leaf.vrx')}
        // source={require('./res/icecreamman_anim/icecreamman_anim_a.vrx')}
        materials={["petMaterials"]}

        position={mishuTransform.getPosition()}
        rotation={mishuTransform.getRotation()}
        // model works, but it is HUGE, must be scaled down considerably, do NOT change this
        scale={[.000005, .000005, .000005]}
        type="VRX"
        // animation={{name:"idle", run:true, loop:true,}}
      />
    );
}
 
ViroMaterials.createMaterials({
    petMaterials: {
       lightingModel: "Blinn",
       diffuseTexture: require('./res/PolydactylTestModel/Tex_Cherry.jpg')
    //    diffuseTexture: require('./res/icecreamman_anim/icecreamman_diffuse.png'),
    //    normalTexture: require('./res/icecreamman_anim/icecreamman_normal.png'),
    //    specularTexture: require('./res/icecreamman_anim/icecreamman_specular.png')
     },
  });

module.exports = MishuComponent;