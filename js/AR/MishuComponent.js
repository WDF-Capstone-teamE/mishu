/*
    the actual mishu component
*/

import React, { Component } from 'react'
import transform from './Transform'
import { Viro3DObject, ViroMaterials, ViroAnimations } from "react-viro"
import { connect } from 'react-redux'
import { selectAnimation } from "../store/petAnimation"
import { Alert } from 'react-native';

const initModelScale = .2;

class MishuComponent extends Component {

    constructor() {
        super();

        this.state = {
            foundInitialPlane: false
        }

        // every time transform changes, update this mishu component
        transform.onTransformChange = () => this.setState({...this.state, foundInitialPlane: true});
    }

    // preload the models
    componentWillMount() {
        this.iceCream = require('./res/icecreamman_anim/icecreamman_anim_a.vrx');
        this.turkey = require('./res/turkeyman_anim/turkeyman_anim.vrx');

        Alert.alert("Find A Flat Surface For Mishu");
    }

    onInitialPlaneFound(anchor) {
        transform.setPosition(...anchor.position);

        //
    }

    render() {
        const {modelNum, currentAnimation, interruptible} = this.props
        
        let modelPath = modelNum ? this.turkey : this.iceCream;
        let modelMaterial = modelNum ? 'turkeyMaterials' : 'iceCreamMaterials';
        
        return <Viro3DObject
            source={modelPath}
            materials={[modelMaterial]}
            position={transform.getPosition()} rotation={transform.getRotation()}
            scale={[
                initModelScale * (this.state.foundInitialPlane ? 1 : 0), 
                initModelScale * (this.state.foundInitialPlane ? 1 : 0), 
                initModelScale * (this.state.foundInitialPlane ? 1 : 0)
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
  