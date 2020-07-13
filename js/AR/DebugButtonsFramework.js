/*
    framework for easily adding and removing buttons to a ui menu
    for debugging purposes, and triggering logic

    shows unformatted buttons on the bottom of the screen, 
    so try not to add too many at a time
*/

import React, { Component } from "react";
import { Button } from 'react-native';

const debugButtonsFramework = {
    buttons: [],

    addButton (name, callback) {
        this.buttons.push({ name, callback });
    },
    removeButton (name) {
        this.buttons = this.buttons.filter(b => b.name !== name);
    },

    // need parent components update view callback
    drawDebugButtonMenu (updateView) {
        return this.buttons.map(b => <Button key={b.name} title={b.name} onPress={() => {
            b.callback();
            updateView();
        }}/>);
    }
};


class DebugButtonsFrameworkComponent extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return debugButtonsFramework.buttons.map(b => <Button key={b.name} title={b.name} onPress={() => {
        b.callback();
        this.setState({});
    }}/>);
  }
}

















module.exports = { debugButtonsFramework, DebugButtonsFrameworkComponent };