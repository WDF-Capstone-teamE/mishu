import React from 'react';

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
    id: 'goButton',
    title: 'Go there',
    callback: () => Alert.alert('test alert')
  },
  {
    id: 'catchButton',
    title: 'Catch',
    callback: () => {}
  },
  {
    id: 'sitButton',
    title: 'Sit',
    callback: () => {}
  },
  {
    id: 'begButton',
    title: 'Beg',
    callback: () => {}
  },
    {
    id: 'brushButton',
    title: 'Brush',
    callback: () => {}
  },
    {
    id: 'petButton',
    title: 'Pet',
    callback: () => {}
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

export default function actionList() {
  // https://reactjs.org/docs/hooks-state.html
  const [selected, setSelected] = React.useState(new Map());

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
    padding: 10,
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
