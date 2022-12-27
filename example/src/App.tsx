import React, {useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {data} from './static/data';
import CardItem from './components/CardItem';
import {
  AnimatedSwiper,
  AnimatedSwiperRef,
} from 'react-native-tinder-cards-view';
import {CardItemProps} from './models/cardItem';
import {CARD} from './utils/constants';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const swiperRef = useRef<AnimatedSwiperRef>(null);

  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <AnimatedSwiper
          ref={swiperRef}
          cardHeight={CARD.HEIGHT}
          cardWidth={CARD.WIDTH}
          actionOffset={50}
          centerCards
          animationDuration={200}
          data={data}
          renderItem={({item}: {item: CardItemProps}) => (
            <CardItem image={item?.image} name={item?.name} />
          )}
          cardsLeftToCallLoadMore={2}
          onListIsEmpty={() => setIsEmpty(true)}
          onSwipeRight={id => console.log('right', id)}
          onSwipeLeft={id => console.log('swipe left', id)}
        />
        {!isEmpty && (
          <React.Fragment>
            <TouchableOpacity
              style={styles.like}
              onPress={() => swiperRef.current?.swipeCardRight()}>
              <AntDesign name={'heart'} size={30} color={'#14aa00'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nope}
              onPress={() => swiperRef.current?.swipeCardLeft()}>
              <AntDesign name={'close'} size={30} color={'#a53c45'} />
            </TouchableOpacity>
          </React.Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  like: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.8,
    right: 15,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#14aa00',
    zIndex: 12,
    padding: 12,
    borderRadius: 30,
  },
  nope: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.8,
    left: 15,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#a53c45',
    zIndex: 12,
    padding: 12,
    borderRadius: 30,
  },
});
export default App;
