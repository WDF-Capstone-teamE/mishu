import React, { Component } from 'react';
import { connect } from "react-redux";
import { selectAnimation } from "../../../store/petAnimation";
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { planeSelector } from '../../PlaneSelection';
import mishuTransform from '../../Transform'

const movePetButton = {
  id: 'movePetButton',
  title: 'Move Pet',
};

const DATA = [
  movePetButton,

  {
    id: 'danceButton',
    title: 'Dance',
    animId: '02',
    interruptible: true,
  },
  {
    id: 'smooshButton',
    title: 'Smoosh',
    animId: 'smoosh',
    interruptible: false,
  },
  {
    id: 'flattenButton',
    title: 'Flatten',
    animId: 'flatten',
    interruptible: true,
  },
  {
    id: 'resetButton',
    title: 'Reset',
    animId: 'reset',
    interruptible: false,
  },
  {
    id: 'rotateButton',
    title: 'Rotate',
    animId: 'rotate',
    interruptible: true,
  },
];

function Item({ title, callback }) {
  return (
    <TouchableOpacity onPress={callback} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}


class ActionList extends Component {
  constructor() {
      super();
      this.state = {};

      if (!mishuTransform.transformInitialized)
        Alert.alert("Find A Flat Surface For Mishu!", "A Target Visual Will Appear On Valid Surfaces");
  }

  componentWillUnmount()
  {
    planeSelector.unregisterOnEnableCallback('a');
  }
  componentWillMount(){
    planeSelector.registerOnEnableCallback('a', (enabled) => {
  
      if (enabled)
      {
        movePetButton.title = "Here!";
        movePetButton.callback = () => {
          // first check if the planeSelector has a point to put the pet on
          if (planeSelector.hasFlatSurfacePoint()) {
            // set the transform position
            mishuTransform.setPosition(...planeSelector.hitPoint);
          }
          else {
            // display an alert if we try to move the pet without a surface detected
            Alert.alert("Nope!", "Mishu needs a flat surface to stand on!\nA Target Visual Will Appear On Valid Surfaces");
          }
  
          // only disable movement mode if we've already initialized the first 
          // placement
          if (mishuTransform.transformInitialized)
            planeSelector.enable(false);
          
        };
        this.setState({});
      }
      else 
      {
        movePetButton.title = "Move Mishu";
        movePetButton.callback = () => {
          planeSelector.enable(true);
        };
        this.setState({});
      }
    });
  }
  render() {
      
    const {selectAnimation} = this.props
    
    DATA.forEach(button => {
      if (button.animId) button.callback = (() => selectAnimation(button.animId, button.interruptible));
    })

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={planeSelector.enabled ? [movePetButton] : DATA}
          extraData={this.state}
          horizontal={true}
          renderItem={({ item }) => ( <Item title={item.title} callback={item.callback} /> )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#000000aa',
    marginVertical: 4,
    marginHorizontal: 4,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#61a5f2',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
});

const mapDispatch = (dispatch) => {
  return {
    selectAnimation: (animId) => dispatch(selectAnimation(animId)),
  };
};

export default connect(null, mapDispatch)(ActionList);//actionList);