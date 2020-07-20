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
import { setHunger, getHealth } from '../../store/progressBars.js'
import { GameEngine } from "react-native-game-engine";
import { Box, Food, Basket, Rock } from './Entities.js';

// set dimensions of screen to dimesions of device screen
const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075)*2;
const basketSize = Math.trunc(Math.max(width, height) * 0.075);
const sateliteSize = Math.trunc(Math.max(width, height) * 0.075)/2;

// get background image
const background = require('./Art/background.png');
// set constant variable for starting time
const startingTimer = 30;

// create tick variable that will increment on each tick to store total time
let tickNum = 0;
// points global points variable that will be used to increment the score
let points = 0;

// define constants for collision categories, 
// these give each object a sort of group ID used for collision filterinng
const defaultCategory = 0x0001;
const basketCategory = 0x0002;
const satelliteCategory = 0x0004;

// create engine and add the game world that will be controlled by the game engine
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

// create initial basket and floor bodies to be rendered later
const basket = Matter.Bodies.rectangle(width / 2, height - boxSize - basketSize/2, basketSize, basketSize,
  {
    // I am a basket and I collide with default(floors and walls) and satelites(food and obstacles)
    collisionFilter: {
        category: basketCategory,
        mask: defaultCategory | satelliteCategory
    },
    label: 'basket'
});
const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, 
  { 
    // set floor to be an immovable enitity
    isStatic: true, 
    // I am a default(floor/wall) and I collide with baskets
    collisionFilter: {
      category: defaultCategory,
      mask: basketCategory
}});

// add initial elements to the game world, so far just basket and floor
Matter.World.add(world, [basket, floor]);


// game main class component
class FeedingGame extends React.Component {
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

  // function to initialize and start game
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

      basket: { body: basket, size: [basketSize, basketSize], 
        renderer: Basket
      },
      floor: { body: floor, size: [width, boxSize],
        renderer: Box 
      }
  }

  // render the game component view
  render() {
    
    const { setHealth,getHealthBar } = this.props;
    // callback function for end of game logic
    const finishedGame = () => {
      Alert.alert(`This function is called after the GameOver Screen is displayed and the user has tapped on it.\n
      We can use this function to either => \n
      1) Reset the game state and allow the user to play again\n
      2) Navigate automatically back to last page`);

      points = 0;
      setHealth('increase', this.state.score); 
      getHealthBar();
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.image} >
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
          systems={[Physics, moveBasket, CreateRandom, updateGameState]}
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
            <Text style={styles.score}> You will have {startingTimer} seconds to catch as many watermelon slices as you can</Text>
            <Text style={styles.score}> Remember to avoid the rocks!</Text>
          </View>
        </TouchableOpacity>}
        {this.state.gameOver && <TouchableOpacity onPress={finishedGame} style={styles.fullScreenButton}>
          <View style={styles.fullScreen}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.score}> {'Score: ' + this.state.score}</Text>
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
  return entities;
};

// update the game states every tick
const updateGameState = (entities, { dispatch }) => {

  // every 20 ticks, (Approx 1/4 sec) dispatch setScore event to set the correct score based on points collected or lost
  if(tickNum % 20 === 0) dispatch({type: 'setScore'});

  // on every tick, loop through entries objects and remove all items that are beyond our view
  let world = entities["physics"].world;
  Object.keys(entities)
  .filter(key => entities[key].body && entities[key].body.position.y >= height)
  .forEach(key => {
    Matter.Composite.remove(world, entities[key].body);
    delete entities[key];
  });

  // return clean list of entities to be registered to the game world
  return entities;
}


// create move basket system for basket movement on user input
const moveBasket = (entities, { touches }) => {
  let move = touches.find(x => x.type === "move");

  // on finger-move, change [x,y] based on finger's DELTA[x,y] position
  if (move) {
    // calculate what new X and new Y will be
    const newPosition = {
      x: basket.position.x + move.delta.pageX,
      y: basket.position.y + move.delta.pageY,
    };      

    // keep basket within left and right bounds of screen 
    // this is accomplished by checking if new X is beyond screen bounds and correcting if it is
    if(newPosition.x < basketSize/2) newPosition.x = basketSize/2;
    else if (newPosition.x + basketSize/2 > width) newPosition.x = width - basketSize/2;

    //keep basket within bottom y bounds of screen by checking if CURRENT Y is below the ground
    if(basket.position.y > height - boxSize) newPosition.y = height - boxSize;

    // set [x,y] of basket to new calculated position
    Matter.Body.setPosition(basket, newPosition);
  }

  return entities;
};


// create Random function generates food and obstacles at random coordinates at the top
// frequency of object creation, as well as air friction can both be modified to raise/lower difficulty
let boxIds = 0;
const CreateRandom = (entities) => {
  // runs every 10 ticks/frames, so roughly 6X/sec
  if(tickNum % 10 === 0) {
    ++boxIds;
    let world = entities["physics"].world;
    let label = boxIds % 2 === 0 ? 'Food' : 'Rock'
    
    // create new satellite(falling object) at random position
    let newObject = Matter.Bodies.rectangle(
      // generate random food at an x within screen bounds, and at a y above top screen view
      randomInteger(0+sateliteSize/2, width-sateliteSize/2), randomInteger(0, -5), 
      // set dimensions to sateliteSize constant defined under imports
      sateliteSize, sateliteSize,
      { 
        // I am a satellite(food/obstacle) and I collide with baskets
        collisionFilter: {
          group: '-1', 
          category: satelliteCategory,
        },
        // give satellites air friction
        frictionAir: 0.01, 
        label: label,
        trajectory: randomInteger(-5, 5) / 10
      }
    );
    
    // add new object to world
    Matter.World.add(world, [newObject]);

    // add new object to array of enitites and define how they should be rendered
    entities[boxIds] = { body: newObject, size: [sateliteSize, sateliteSize],
      renderer: label === 'Food' ? Food : Rock
    };
  }
  return entities;
};


/* 
This is NOT a system, it is a function supplied by the RNGE 
that is called EVERY time there is a 'collisionStart' event, 
which is a predefined event definition. This function recieves
the collision event as an argument, which gives us access
to the collision 'pairs'. However, because we don't have
access to the game state, or to the dispatch function that
is accessible to Systems from here, I had to find a couple of 
work-arounds for what we wanted to achieve...
*/
Matter.Events.on(engine, 'collisionStart', ({ pairs }) => {
  // get bodies that belong to collision pair
  pairs.forEach(({ bodyA, bodyB }) => {

    if (bodyA.label === 'Rock' || bodyA.label === 'Food') {
      // remove object from screen view...
      // It will later be removed from the game world by the updateGameState System we defined
      Matter.Body.setPosition(bodyA, { x: width/2, y: height });
            
      // increment or decrement points depending on object hit
      if (bodyA.label === "Food") ++points;
      else --points;
      
    }
    else if (bodyB.label === 'Rock' || bodyB.label === 'Food') {
      // remove object from screen view and then remove from world
      Matter.Body.setPosition(bodyB, { x: width/2, y: height });
          
      // increment or decrement points depending on object hit
      if (bodyB.label === "Food") ++points;
      else --points;
    }
  });
});

// helper function to generate random number within min and max bounds
function randomInteger(min, max) {  
  return Math.random() * (max - min) + min; 
}

const mapState = (state) => {
  return {
    hunger: state.progressBars.hungerBar,
  };
};

const mapDispatch = (dispatch) => {
 return {
  setHealth: (action,score) => dispatch(setHunger(action, score)),
  getHealthBar: () => dispatch(getHealth())
 };
}

export default connect(mapState, mapDispatch)(FeedingGame);


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
    color: 'white',
    fontSize: 30,
  },
  timer: {
    color: 'white',
    fontSize: 20,
  },
  gameOverText: {
    color: 'white',
    fontSize: 40
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