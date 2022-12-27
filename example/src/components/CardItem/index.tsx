import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

const CardItem = ({image, name}: {image: string; name: string}) => {
  return (
    <View style={styles.card}>
      <FastImage style={styles.image} source={{uri: image, priority: FastImage.priority.high}} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default CardItem;
