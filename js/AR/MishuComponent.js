/*
    the actual mishu component, 
    just a wrapper around drawing a box for now
*/

import React, { Component } from 'react'
import mishuTransform from './Transform'
import { Viro3DObject, ViroMaterials, ViroAnimations } from "react-viro"
import {connect} from 'react-redux'
import {selectAnimation} from "../store/petAnimation"

class MishuComponent extends Component {

    constructor() {
        super();

        this.state = {
            modelNum: 0,
            currentAnimation: "01" // 01 is idle
        }
        this.onTap = this.onTap.bind(this);

        // every time transform changes, update this mishu component
        mishuTransform.onTransformChange = () => this.setState({...this.state});
    }

    render() {
        const {modelNum, currentAnimation} = this.props
        let model = "iceCream";
        if(modelNum) model = "turkey";

        if(model === "iceCream"){
            return (
                <Viro3DObject

                source={require('./res/icecreamman_anim/icecreamman_anim_a.vrx')}
                materials={["iceCreamMaterials"]}

                position={mishuTransform.getPosition()}
                rotation={mishuTransform.getRotation()}

                scale={[initModelScale, initModelScale, initModelScale]}

                type="VRX"
                onClick={this.onTap}
                animation={{name:currentAnimation, run:true, loop:true, interruptible: true}}
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

                scale={[initModelScale, initModelScale, initModelScale]}

                type="VRX"
                onClick={this.onTap}
                animation={{name:currentAnimation, run:true, loop:true,}}
              />
            )
        }
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

const initModelScale = .2;

ViroAnimations.registerAnimations({
    rotate: {
        properties: {
            rotateY: "+=90"
        },
        duration: 500, //.5 seconds
    },
    flatten: {
        properties: {
            scaleX: "*=1.75",
            scaleZ: "*=1.75",
            scaleY: "*=.5",
        },
        easing: "EaseOut",
        duration: 1500, // 1 second
    },
    reset: {
        properties: {
            scaleX: initModelScale,
            scaleZ: initModelScale,
            scaleY: initModelScale,
        },
        easing: 'Bounce',
        duration: 500, // 1 second
    },
    smoosh: [['flatten', 'reset']],
});

const mapState = (state) => {
  return {
    modelNum: state.petAnimation.modelNum,
    currentAnimation: state.petAnimation.currentAnimation
  };
};
const mapDispatch = (dispatch) => {
  return {
    storeAnimation: () => dispatch(selectAnimation()),
  };
};

export default connect(mapState, mapDispatch)(MishuComponent);
  