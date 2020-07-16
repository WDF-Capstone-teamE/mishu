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
  },
  {
    id: 'smooshButton',
    title: 'Smoosh',
    callback: () =>  Alert.alert('This button will play a smoosh animation')
  },
  {
    id: 'spinButton',
    title: 'Spin',
    callback: () =>  Alert.alert('This button will play a spin animation')
  },
  {
    id: 'flipButton',
    title: 'Flip',
    callback: () =>  Alert.alert('This button will play a beg animation')
  },
    {
    id: 'batheButton',
    title: 'Bathe',
    callback: () =>  Alert.alert('This button will send you into the bath screen')
  },
    {
    id: 'petButton',
    title: 'Pet',
    callback: () =>  Alert.alert('This button will play a pet animation')
  },
];

function Item({ id, title, callback, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => {callback(); onSelect(id)}}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

function actionList(props) {
  // https://reactjs.org/docs/hooks-state.html
  const [selected, setSelected] = React.useState(new Map());
  const {selectAnimation} = props
  
  DATA[1].callback = () => selectAnimation(DATA[1].animId);

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

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
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
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
    marginHorizontal: 10,
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