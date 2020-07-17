import React from 'react';
import { connect } from "react-redux";

import { selectAnimation } from "../../../store/petAnimation";

import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';

import colors from "../../../config/colors";

const DATA = [
  {
    id: 'movePetButton',
    title: 'Move Pet',
    callback: () => Alert.alert('This button will move the pet to your desired location')
  },
  {
    id: 'danceButton',
    title: 'Dance',
    callback: () =>  Alert.alert('This button will play a dance animation'),
    animId: '02',
    interruptible: true,
  },
  {
    id: 'smooshButton',
    title: 'Smoosh',
    callback: () =>  Alert.alert('This button will play a smoosh animation'),
    animId: 'smoosh',
    interruptible: false,
  },
  // {
  //   id: 'squeezeButton',
  //   title: 'Squeeze',
  //   callback: () =>  Alert.alert('This button will play a smoosh animation'),
  //   animId: 'squeeze'
  // },
  {
    id: 'flattenButton',
    title: 'Flatten',
    callback: () =>  Alert.alert('This button will flatten as model while held.'),
    animId: 'flatten',
    interruptible: true,
  },
  {
    id: 'resetButton',
    title: 'Reset',
    callback: () =>  Alert.alert('This button will reset our model w/ animation'),
    animId: 'reset',
    interruptible: false,
  },
  {
    id: 'rotateButton',
    title: 'Rotate',
    callback: () =>  Alert.alert('This button will play rotate model'),
    animId: 'rotate',
    interruptible: true,
  },
  // {
  //   id: 'flipButton',
  //   title: 'Flip',
  //   callback: () =>  Alert.alert('This button will play have our pet make a flip'),
  //   animId: 'flip'
  // },
  //   {
  //   id: 'batheButton',
  //   title: 'Bathe',
  //   callback: () =>  Alert.alert('This button will send you into the bath screen')
  // },
  //   {
  //   id: 'petButton',
  //   title: 'Pet',
  //   callback: () =>  Alert.alert('This button will play a pet animation')
  // },
];

function Item({ id, title, callback, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => {
        callback(); 
        // onSelect(id);
      }}
      style={[
        styles.item,
        {
          backgroundColor: '#61a5f2',
          borderRadius: 20,
        },
        // { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

function actionList(props) {
  // https://reactjs.org/docs/hooks-state.html
  // const [selected, setSelected] = React.useState(new Map());
  const {selectAnimation} = props
  
  DATA.forEach(button => {
    if (button.animId) button.callback = (() => selectAnimation(button.animId, button.interruptible));
  })
  // DATA[1].callback = () => selectAnimation(DATA[1].animId); //dance

  

  // const onSelect = React.useCallback(
  //   id => {
  //     const newSelected = new Map(selected);
  //     newSelected.set(id, !selected.get(id));

  //     setSelected(newSelected);
  //   },
  //   [selected],
  // );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        horizontal={true}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            callback={item.callback}
            // selected={!!selected.get(item.id)}
            // onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        // extraData={selected}
      />
    </SafeAreaView>
  );
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

export default connect(null, mapDispatch)(actionList);