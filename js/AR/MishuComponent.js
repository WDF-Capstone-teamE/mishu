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
            // modelNum: 0,
            // currentAnimation: "01" // 01 is idle
        }
        // this.onTap = this.onTap.bind(this);

        // every time transform changes, update this mishu component
        mishuTransform.onTransformChange = () => this.setState({...this.state});
    }

    render() {
        const {modelNum, currentAnimation, interruptible} = this.props
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
                // onClick={this.onTap}
                animation={{name:currentAnimation, run:true, loop:true, interruptible: interruptible}}
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
                // onClick={this.onTap}
                animation={{name:currentAnimation, run:true, loop:true, interruptible: interruptible}}
              />
            )
        }
    }

    // onTap() {
    //         this.setState({
    //             currentAnimation: 'smoosh'
    //         });

    // }

    
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
            scaleX: "*=1.050",
            scaleZ: "*=1.050",
            scaleY: "*=.9666",
        },
        easing: "Linear",
        duration: 50, // 20 ms
    },
    smooshFlatten: { // a modified flatten to be chained in smoosh animation
        properties: {
            scaleX: initModelScale*1.75,
            scaleZ: initModelScale*1.75,
            scaleY: initModelScale*.5,
        },
        easing: "EaseOut",
        duration: 1500, // 1.5 seconds
    },
    smoosh: [['smooshFlatten', 'reset']],
    // squeezeFlatten: {
    //     properties: {
    //         scaleX: initModelScale/1.75,
    //         scaleZ: initModelScale/1.75,
    //         scaleY: initModelScale/.85,
    //     },
    //     easing: "EaseOut",
    //     duration: 1500, // 1.5 seconds
    // },
    // squeeze: [['squeezeFlatten', 'reset']],
    reset: {
        properties: {
            scaleX: initModelScale,
            scaleZ: initModelScale,
            scaleY: initModelScale,
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
  