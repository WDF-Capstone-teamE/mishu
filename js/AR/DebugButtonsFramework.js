/*
    framework for easily adding and removing buttons to a ui menu
    for debugging purposes, and triggering logic

    shows unformatted buttons on the screen, 
    so try not to add too many at a time or it
    might clutter things up...
*/

import React, { Component } from "react";
import { Button } from 'react-native';

const debugButtonsFramework = {
    buttons: [],

    addButton (buttonName, callback) {
        this.buttons.push({ buttonName, callback });
    },
    removeButton (buttonName) {
        this.buttons = this.buttons.filter(b => b.buttonName !== buttonName);
    },
};


class DebugButtonsFrameworkComponent extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return debugButtonsFramework.buttons.map(
            b => <Button key={b.buttonName} title={b.buttonName} onPress={
                () => {
                    b.callback();
                    // make sure any changes to the buttons is re rendered
                    this.setState({});
                }
            }/>
        );
    }
}

module.exports = { debugButtonsFramework, DebugButtonsFrameworkComponent };