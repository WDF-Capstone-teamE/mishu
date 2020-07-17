import React, { Component } from "react";
import { Image } from "react-native";
import { array, object, string } from 'prop-types';

// Basket Component
export class Basket extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        return (
            <Image source={require('./Art/basket.png')} 
            style={[{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            }]}/>
        );
    }
}
Basket.propTypes = {
    size: array,
    body: object
}


// Food Item component
export class Food extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        return (
            <Image source={require('./Art/watermelon.png')}
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
Food.propTypes = {
    size: array,
    body: object
}


// Rock Item component
export class Rock extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        return (
            <Image source={require('./Art/rock.png')}
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
Rock.propTypes = {
    size: array,
    body: object
}


// Generfic box component
export class Box extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        return (
            <Image source={require('./Art/ground.png')}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: "transparent"
            }}/>
        );
    }
}
Box.propTypes = {
    size: array,
    body: object, 
    color: string
}