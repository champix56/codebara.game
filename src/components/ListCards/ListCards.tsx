import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import { ICard } from '../../interfaces/card';

const SCREEN_WIDTH = Dimensions.get('window').width;

// interface Item {
//   id: string;
//   name: string;
//   uri: string;
// }

interface Props {
  data: ICard[];
  baseLoc:string;
}

export default function ListCards({ data, baseLoc }: Props) {
  const [search, setSearch] = useState('');
  const [columns, setColumns] = useState(2);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const itemWidth = SCREEN_WIDTH / columns;
  const itemHeight = itemWidth * (4096 / 2370); // ratio respecté

  const increaseZoom = () => {
    setColumns(prev => Math.max(1, prev - 1));
  };

  const decreaseZoom = () => {
    setColumns(prev => Math.min(4, prev + 1));
  };

  const renderItem = ({ item }: { item: ICard }) => (
    <TouchableOpacity
      style={[styles.item, { width: itemWidth, height: itemHeight }]}
      onPress={() => ToastAndroid.show(item.name, ToastAndroid.SHORT)}
    >
      <Image source={{ uri: item.fileloc+'front.png' }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        placeholder="Rechercher..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* Zoom controls */}
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomBtn} onPress={increaseZoom}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomBtn} onPress={decreaseZoom}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList
        key={columns} // important pour re-render
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={columns}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  zoomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  zoomBtn: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  zoomText: {
    color: '#fff',
    fontSize: 18,
  },
  item: {
    padding: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
