import React, { Component } from "react";
import { Image } from "react-native";
import { array, object } from 'prop-types';

// Basket Component
export class Bathtub extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x
        const y = this.props.body.position.y

        return (
            <Image source={require('./Art/rubberDuckTub.png')} 
            style={[{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            flex: 1,
            overflow: 'visible'
            }]}/>
        );
    }
}
Bathtub.propTypes = {
    size: array,
    body: object
}

let bubbleNum;
// Bubbles component
export class Bubbles extends Component {

    render() {
        ++bubbleNum;
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        let img = null;

        img = require('./Art/bubble1.png')
        // use one of 3 render images
        // if(bubbleNum % 2 === 0) img = require('');
        // else if(bubbleNum % 3 === 0) img = require('');
        // else img = require('./Art/bubble1.png');

        return (
            <Image source={img}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height
            }}/>
        );
    }
}
Bubbles.propTypes = {
    size: array,
    body: object
}