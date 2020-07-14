/*
    the actual mishu component, 
    just a wrapper around drawing a box for now
*/

import React, { Component } from 'react'
import mishuTransform from './Transform'
import { Viro3DObject, ViroMaterials } from "react-viro";
import {connect} from 'react-redux'
import {selectAnimation} from "../store/petAnimation"

class MishuComponent extends Component {

    constructor() {
        super();

        this.state = {
            modelNum: 0,
            currentAnimation: "01"
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

                scale={[.2, .2, .2]}

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

                scale={[.2, .2, .2]}

                type="VRX"
                onClick={this.onTap}
                animation={{name:currentAnimation, run:true, loop:true,}}
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
    iceCreamMaterials: {
        diffuseTexture: require("./res/icecreamman_anim/icecreamman_diffuse.png"),
    },
    turkeyMaterials: {
        diffuseTexture: require("./res/turkeyman_anim/turkeyman_diffuse.jpg")
    }
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
  