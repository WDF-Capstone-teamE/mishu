/*
    the actual mishu component
*/

import React, { Component } from 'react'
import transform from './Transform'
import { Viro3DObject, ViroMaterials, ViroAnimations } from "react-viro"
import { connect } from 'react-redux'
import { selectAnimation } from "../store/petAnimation"

const MODEL_SCALE = .2;

class MishuComponent extends Component {

    constructor() {
        super();
        this.state = {}
        // every time transform changes, update this mishu component
        transform.onTransformChange = () => this.setState({});
    }

    render() {
        const {modelNum, currentAnimation, interruptible} = this.props
        
        return <Viro3DObject
            source={modelNum ? require('./res/turkeyman_anim/turkeyman_anim.vrx') : require('./res/icecreamman_anim/icecreamman_anim_a.vrx')}
            materials={[modelNum ? 'turkeyMaterials' : 'iceCreamMaterials']}
            position={transform.getPosition()}
            scale={[
                MODEL_SCALE * (transform.transformInitialized ? 1 : 0), 
                MODEL_SCALE * (transform.transformInitialized ? 1 : 0), 
                MODEL_SCALE * (transform.transformInitialized ? 1 : 0)
            ]}
            type="VRX"
            animation={{name:currentAnimation, run:true, loop:true, interruptible: interruptible}}
        />
    }
}
 
ViroMaterials.createMaterials({
    iceCreamMaterials: {
        diffuseTexture: require("./res/icecreamman_anim/icecreamman_diffuse.png"),
    },
    turkeyMaterials: {
        diffuseTexture: require("./res/turkeyman_anim/turkeyman_diffuse.jpg")
    }
});

ViroAnimations.registerAnimations({
    rotate: {
        properties: {
            rotateY: "+=90"
        },
        duration: 500, //.5 seconds
    },
    flatten: {
        properties: {
            scaleX: "*=1.050",
            scaleZ: "*=1.050",
            scaleY: "*=.9666",
        },
        easing: "Linear",
        duration: 50, // 20 ms
    },
    smooshFlatten: { // a modified flatten to be chained in smoosh animation
        properties: {
            scaleX: MODEL_SCALE*1.75,
            scaleZ: MODEL_SCALE*1.75,
            scaleY: MODEL_SCALE*.5,
        },
        easing: "EaseOut",
        duration: 1500, // 1.5 seconds
    },
    smoosh: [['smooshFlatten', 'reset']],
    reset: {
        properties: {
            scaleX: MODEL_SCALE,
            scaleZ: MODEL_SCALE,
            scaleY: MODEL_SCALE,
        },
        easing: 'Bounce',
        duration: 500, // .5 seconds
    },
});

const mapState = (state) => {
  return {
    modelNum: state.petAnimation.modelNum,
    currentAnimation: state.petAnimation.currentAnimation,
    interruptible: state.petAnimation.interruptible
  };
};
const mapDispatch = (dispatch) => {
  return {
    selectAnimation: () => dispatch(selectAnimation()),
  };
};

export default connect(mapState, mapDispatch)(MishuComponent);
  