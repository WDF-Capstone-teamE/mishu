/*
    the actual mishu component, 
    just a wrapper around drawing a box for now
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

import mishuTransform from './Transform'

import { Viro3DObject, ViroMaterials } from "react-viro";

class MishuComponent extends Component {

    constructor() {
        super();

        this.state = {
            modelNum: getRandomInt(2)
        }
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
                
                scale={[.3, .3, .3]}
    
                type="VRX"
                onClick={this.onTap}
                animation={{name:this.props.currentAnimation, run:true, loop:true,}}
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
                
                scale={[.3, .3, .3]}
    
                type="VRX"
                onClick={this.onTap}
                animation={{name:this.props.currentAnimation, run:true, loop:true,}}
              />
            )
        }

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
 
ViroMaterials.createMaterials({
    iceCreamMaterials: {
        // lightingModel: "Blinn",
        diffuseTexture: require('./res/icecreamman_anim/icecreamman_diffuse.png'),
        // normalTexture: require('./res/icecreamman_anim/icecreamman_normal.png'),
        // specularTexture: require('./res/icecreamman_anim/icecreamman_specular.png')
    },
    turkeyMaterials: {
        // lightingModel: "Blinn",
        diffuseTexture: require('./res/turkeyman_anim/turkeyman_diffuse.jpg'),
        // normalTexture: require('./res/turkeyman_anim/turkeyman_normal.jpg'),
        // specularTexture: require('./res/turkeyman_anim/turkeyman_specular.jpg')
    }
});

function mapStateToProps(state) {
    return {
        currentAnimation: state.current
    }
}

module.exports = connect(mapStateToProps)(MishuComponent)