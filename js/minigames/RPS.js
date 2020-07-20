/*
    a rock paper scissors implementation
*/

'use strict';

import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import colors from "../config/colors";

const AppButton = ({ onPress, text }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            elevation: 8,
            backgroundColor: colors.secondary,
            borderRadius: 40,
            width: "33%",
            height: 60,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
        }}
    >
        <Text style={styles.appButtonText}>{text}</Text>
    </TouchableOpacity>
);


class RockPaperScissors extends Component {

    constructor() {
        super();
        
        this.state = {
            score: 0,
            playerWon: false,
            winMessage: "",
            ready: true,
            choice: -1,
            mishuChoice: -1,
        };

        this.makeChoice = this.makeChoice.bind(this);
        this.mishuMakeChoice = this.mishuMakeChoice.bind(this);
    }

    makeChoice (choice)
    {
        this.setState({ ...this.state, choice, mishuChoice: -1, ready: false });
        setTimeout(this.mishuMakeChoice, 1);
    }
    mishuMakeChoice()
    {
        const mishuChoice = Math.floor(Math.random() * 2.9);
    
        const dif = (this.state.choice - mishuChoice);
        
        let score = this.state.score;
        let playerWon = true;
        let winMessage = "Draw!";

        // not a draw
        if (dif !== 0)
        {
            playerWon = dif == 1 || dif == -2;
            score += playerWon ? 1 : -1;
            winMessage = playerWon ? "You Won!" : "You Lost!";
        }
        
        this.setState({ ...this.state, mishuChoice, playerWon, winMessage, score });
        
        // reset the game state
        setTimeout(() => this.setState({ ...this.state, ready: true, winMessage: "" }) , 1000);
    }
           
    // preload the images
    componentWillMount() {
        const style = { width: 128, height:128 };
        this.imagesPlayer = [
            (<Image style={style} source={require("./assets/Rock.png")} />),
            (<Image style={style} source={require("./assets/Paper.png")} />),
            (<Image style={style} source={require("./assets/Scissors.png")} />),
        ];
        const styleFlipped = { width: 128, height:128, transform: [ { scaleX: -1 } ] };
        this.imagesMishu = [
            (<Image style={styleFlipped} source={require("./assets/Rock.png")} />),
            (<Image style={styleFlipped} source={require("./assets/Paper.png")} />),
            (<Image style={styleFlipped} source={require("./assets/Scissors.png")} />),
        ];
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titleText}>{"Rock, Paper, Scissors"}</Text>

                <Text style={this.state.score >= 0 ? styles.scoreWin : styles.scoreLose}>
                    {`Your Score: ${this.state.score}`}
                </Text>
                
                <Text style={{ fontSize: 25, color: this.state.playerWon ? "green" : "red" }}>
                    {this.state.winMessage}
                </Text>

                <View style={styles.middle}>
                    <View style={styles.middleContainer}>
                        <Text>{"You:"}</Text>
                        {this.imagesPlayer[this.state.choice]}
                    </View>
                    <View style={styles.middleContainer}>
                        <Text>{"Mishu:"}</Text>
                        {this.imagesMishu[this.state.mishuChoice]}
                    </View>
                </View>

                { 
                    !this.state.ready ? undefined : 
                    (
                        <View style={styles.bottom}>
                            <Text style={styles.titleText2}>{"Choose Your Move!"}</Text>
                            <View style={styles.appButtonContainer}>
                                <AppButton text="Rock" onPress={() => this.makeChoice(0) } />
                                <AppButton text="Paper" onPress={() => this.makeChoice(1) } />
                                <AppButton text="Scissors" onPress={() => this.makeChoice(2) } />
                            </View>
                        </View>
                    )
                }
            </View>
        );
    }
}

module.exports = RockPaperScissors;

const styles = StyleSheet.create({
    scoreLose: {
        marginTop: 25,
        fontSize: 25,
        color: "red"
    },
    scoreWin: {
        marginTop: 25,
        fontSize: 25,
        color: "green"
    },
    middle:{
        padding:10,
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems:"center",
        width: "100%"
    },
    middleContainer:{
        alignContent: "center",
        alignItems:"center",
        margin: "auto",
    },
    titleText2:{
        fontSize: 45,
        fontWeight: "bold",
        color: colors.primary
    },
    titleText: {
        marginTop: 45,
        fontSize: 45,
        fontWeight: "bold",
        color: colors.primary
    },
    appButtonContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: 'flex-end',
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    bottom: {
        justifyContent: 'flex-end',
        marginBottom: 100,
        width: "100%",
        alignItems: "center",
    }
});
