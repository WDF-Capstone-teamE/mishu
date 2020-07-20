/*
For Transfer over to our ViroMedia App,
Files/Folders Needed:
App.js
Entities.js
Art/
*/

import React from 'react';
import { Dimensions, StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Matter from "matter-js";
import { connect } from 'react-redux';
import { setCleanliness, getHealth } from '../../store/progressBars.js'
import { GameEngine } from "react-native-game-engine";
import { Bathtub, Bubbles } from './Entities.js';

// set dimensions of screen to dimesions of device screen
const { width, height } = Dimensions.get("screen");
const tubSize = Math.trunc(Math.max(width, height) * 0.075)*4;
const bubbleSize = Math.trunc(Math.max(width, height) * 0.075);

// get background image
const background = require('./Art/bathroomWall.jpg');
// set constant variable for starting time
const startingTimer = 10;

// create tick variable that will increment on each tick to store total time
let tickNum = 0;
// points global points variable that will be used to increment the score
let points = 0;

// define constants for collision categories, 
// these give each object a sort of group ID used for collision filterinng
const defaultCatefory = 0x0001;
const tubCategory = 0x0002;
const bubbleCategory = 0x0004;

// create engine and add the game world that will be controlled by the game engine
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

// create initial basket and floor bodies to be rendered later
const bathtub = Matter.Bodies.rectangle(width / 2 - tubSize/2, (height/4)*3 - tubSize, tubSize, tubSize,
  {
    // set floor to be an immovable enitity
    isStatic: true, 
    // I am a bathtub and I collide with default objects(nothing)
    collisionFilter: {
        category: tubCategory,
        //fixed bug where bubbles where getting stuck in middle of screen
        mask: defaultCatefory
        // ^ do not remove this line!!! ^
    },
    label: 'bathtub'
});

// add initial elements to the game world, so far just bathtub
Matter.World.add(world, [bathtub]);


// game main class component
class CleaningGame extends React.Component {
  constructor() {
    super();
    // state to control gameflow/gameplay
    this.state = {
      gameStart: true,
      running: false,
      gameOver: false,
      timer: startingTimer,
      score: 0
    }
  }

  // updateTimer function is called once every second and updates the countdown timer
  updateTimer = () => {
    this.setState({ timer: --this.state.timer })

    if (this.state.timer === 0){
      this.stop();
    }
  }

  start = () => {
    // exit start screen
    this.setState({ gameStart: false });

    // initialize game states

    // start game
    setTimeout( () => { 
      this.setState({ running: true });
      setInterval(this.updateTimer, 1000);
    }, 1000);
  }


  stop = () => {
    this.setState({ running: false, gameOver: true })
  }

  // callback function to set game state based on events
  updateHandler = (event) => {
    if(event.type === 'setScore'){
      this.setState({ score: points })
    }
  }

  // entities object is initialized with initial entities that will form the game world
  entities={ 
      physics: { engine: engine, world: world },

      bathtub: { body: bathtub, size: [tubSize, tubSize], 
        renderer: Bathtub
      }
  }

  // render the game component view
  render() {

    const { setCleanliness, getHealthBar } = this.props;
    // callback function for end of game logic
    const finishedGame = () => {
      Alert.alert(`This function is called after the GameOver Screen is displayed and the user has tapped on it.\n
      We can use this function to either => \n
      1) Reset the game state and allow the user to play again\n
      2) Navigate automatically back to last page`);

      //send game score to redux store to increase health stats
      setCleanliness('increase', this.state.score); 
      getHealthBar();

      // reset games
      this.setState({ gameStart: true });
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.image}>
        <GameEngine
          ref={ref => {
            this.gameEngine = ref;
          }}

          style={styles.gameContainer}
          // these props are all reserved words...
          // running deteremines if the game should still be running. on Game Over, set to false
          running={this.state.running}
          // onEvent will be called every time a game event is dispatched
          onEvent={this.updateHandler}
          /*
          Systems are special functions controlled by the game engine. They are defined by us, 
          but called by the game engine once every tick. They also have access to 
          various methods and arguments, such as time, dispatch, touches, etc.
          Systems also have the ability to change the entities rendered on screen because
          the engine re-renders based on the entities object returned by the systems. 
          This means that systems MUST ALWAYS return the entities object
          */
          systems={[Physics, CreateBubbles, updateGameState]}
          // pass in our entities object that contains the game world objects
          entities={this.entities}>
            <StatusBar hidden={true} />
        </GameEngine>
        <View style={styles.scoresContainer}>
          <View style={styles.scoreBoard}>
             <Text style={styles.timer}> {'Timer: ' + this.state.timer}</Text>
             <Text style={styles.score}> {'Score: ' + this.state.score}</Text>
          </View>
        </View>
        {this.state.gameStart && <TouchableOpacity onPress={this.start} style={styles.fullScreenButton}>
          <View style={styles.fullScreen}>
            <Text style={styles.gameOverText}>Start Game</Text>
            <Text style={styles.gameOverScore}>You will have {startingTimer} seconds to get your pet as clean as you can</Text>
            <Text style={styles.gameOverScore}>Scrub hard!</Text>
          </View>
        </TouchableOpacity>}
        {this.state.gameOver && <TouchableOpacity onPress={finishedGame} style={styles.fullScreenButton}>
          <View style={styles.fullScreen}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.gameOverScore}> {'Score: ' + this.state.score}</Text>
          </View>
        </TouchableOpacity>}
        </ImageBackground>
      </View>
    );
  }
}

// create physics system for gravity, will apply to all entities(objects that are part of the game world)
const Physics = (entities, { time }) => {
  // keep track of the ticks by incrementing on each function call
  // this is used to control random spawn rates later
  tickNum++;
  // gravity system that updates based on delta time
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);

  // apply anty-gravity force to all entities that exist
  Object.keys(entities)
  .filter(key => entities[key].body)
  .forEach(key => {
    Matter.Body.applyForce(entities[key].body, entities[key].body.position, { x: 0.0, y: -0.01 });
  });

  return entities;
};

// update the game states every tick
const updateGameState = (entities, { dispatch }) => {

  // every 20 ticks, (Approx 1/4 sec) dispatch setScore event to set the correct score based on points collected or lost
  if(tickNum % 10 === 0) dispatch({type: 'setScore'});

  // on every tick, loop through entries objects and remove all items that are beyond our view
  let world = entities["physics"].world;
  Object.keys(entities)
  .filter(key => entities[key].body && entities[key].body.position.y <= 0 )
  .forEach(key => {
    Matter.Composite.remove(world, entities[key].body);
    delete entities[key];
  });

  // return clean list of entities to be registered to the game world
  return entities;
}

// create bubbles function generates bubbles at random coordinates at the bottome of the screeen
// frequency of object creation, as well as air friction can both be modified
let bubbleIds = 0;
let scrubs = 0;
const CreateBubbles = (entities, { touches } ) => {

  let swipe = touches.find(x => x.type === "move");

  // runs every 10 ticks/frames, so roughly 6X/sec
  if(tickNum % 10 === 0)
    entities = createBubble(entities);
  if(swipe){
    ++scrubs;
    entities = createBubble(entities);

    if(scrubs % 10 === 0) ++ points;
  }
    
  
  // return new list of generated entities to be registered to the game world
  return entities;
};

// Helper function for generating random new bubbles, can be called by any system when more bubbles are needed
function createBubble(entities) {
  ++bubbleIds;
  let world = entities["physics"].world;
  let label = 'Bubbles'
  
  // create new bubble at random position
  let newBubble = Matter.Bodies.rectangle(
    // generate bubble at x within screen bounds, and at a y above top screen view
    randomInteger(0-bubbleSize/2, width-bubbleSize/2), randomInteger(height+bubbleSize/2, height+height/2), 
    // set dimensions to bubbleSize constant defined under imports
    bubbleSize, bubbleSize,
    { 
      // I am a bubble and I collide with other bubbles
      collisionFilter: {
        category: bubbleCategory,
      },
      // give bubbles air friction, label and trajectory
      frictionAir: 0.04, 
      label: label,
      trajectory: randomInteger(-5, 5) / 10
    }
  );
  
  // add newly created bubble to world
  Matter.World.add(world, [newBubble]);

  // add new bubble to array of enitites and define how they should be rendered
  entities[bubbleIds] = { body: newBubble, size: [bubbleSize, bubbleSize],
    renderer: Bubbles
  };

  return entities;
}

// helper function to generate random number within min and max bounds
function randomInteger(min, max) {  
  return Math.random() * (max - min) + min; 
}

const mapState = (state) => {
  return {
    cleanliness: state.progressBars.cleanlinessBar,
  };
};

const mapDispatch = (dispatch) => {
 return {
   setCleanliness: (action, score) => dispatch(setCleanliness(action, score)),
   getHealthBar: () => dispatch(getHealth()),
 };
}

export default connect(mapState, mapDispatch)(CleaningGame);

// style sheet for all game page components
// all view components within the outermost container MUST have a position of relative or absolute
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87d3f8'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoresContainer: {
    position: 'absolute',
    marginLeft: width/50,
    marginTop: height/40,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  scoreBoard: {
    position: 'absolute',
    flexDirection: "column",
    marginLeft: 20,
    marginTop: 40,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  score: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  timer: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  gameOverText: {
    color: 'white',
    fontSize: 40
  },
  gameOverScore: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  }
});