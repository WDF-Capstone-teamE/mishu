/*
    the actual mishu component, 
    just a wrapper around drawing a box for now
*/

import React, { Component } from 'react'
import mishuTransform from './Transform'
import { Viro3DObject, ViroMaterials } from "react-viro";

class MishuComponent extends Component {

    constructor() {
        super();

        this.state = {
            modelNum: 0,
            currentAnimation: "01"
        }
        this.onTap = this.onTap.bind(this);
    }

    render() {

        let model = "iceCream";
        if(this.state.modelNum) model = "turkey";

        if(model === "iceCream"){
            return (
                <Viro3DObject

                source={require('./res/icecreamman_anim/icecreamman_anim_a.vrx')}
                materials={["iceCreamMaterials"]}

                position={mishuTransform.getPosition()}
                rotation={mishuTransform.getRotation()}

                scale={[.2, .2, .2]}

                type="VRX"
                onClick={this.onTap}
                animation={{name:this.state.currentAnimation, run:true, loop:true,}}
              />
            )
        } 

        else if(model === "turkey"){
            return (
                <Viro3DObject

                source={require('./res/turkeyman_anim/turkeyman_anim.vrx')}
                materials={["turkeyMaterials"]}

                position={mishuTransform.getPosition()}
                rotation={mishuTransform.getRotation()}

                scale={[.2, .2, .2]}

                type="VRX"
                onClick={this.onTap}
                animation={{name:this.state.currentAnimation, run:true, loop:true,}}
              />
            )
        }
    }

    onTap() {
        if (this.state.currentAnimation === "01"){
            this.setState({
                currentAnimation: "02"
            });
        }
        else if (this.state.currentAnimation === "02"){
            this.setState({
                currentAnimation: "01"
            });  
        }
    }
}
 
ViroMaterials.createMaterials({
    mishuMaterial: {
        diffuseTexture: require("./res/grid_bg.jpg"),
    },
});
  
module.exports = MishuComponent;