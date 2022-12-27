import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const CARD = {
  WIDTH: width * 0.96,
  HEIGHT: height * 0.8,
  BORDER_RADIUS: 20,
  OUT_OF_SCREEN: width + 0.5 * width,
};
