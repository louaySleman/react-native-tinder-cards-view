# react-native-tinder-cards
A high performance, beautiful and fully customizable Animated swipe card list for React Native 
without any third party library and support pagination.

<p align="left">
  <a href="https://www.npmjs.com/package/react-native-tinder-cards-view"><img src="https://img.shields.io/badge/npm-v1.0-blue"></a>
  <a href="https://travis-ci.org/louay12/react-native-tinder-cards-view"><img src="https://img.shields.io/travis/react-native-elements/react-native-elements/master.svg"></a>
</p>

<p align="left">
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>


## Getting started
```js
npm install react-native-tinder-cards-view --save
```
or
```js
yarn add react-native-tinder-cards-view
```

## Important Note
For the best experience in your app we prefer adding images with FastImage plugin.

React Native FastImage is a quick way to load images in React Native. All loaded pictures are aggressively cached by FastImage. You may add your own auth headers and preload pictures to your requests. GIF caching is also supported by react-native-fast-image.

To get started with React Native FastImage, first, add the FastImage component to your project:

```js
yarn add react-native-fast-image
```
or
```js
npm install –save react-native-fast-image
```

## Platforms Supported

* [x] iOS
* [x] Android

## Demo
<p>
   <img width="200" src="https://raw.githubusercontent.com/louaySleman/react-native-tinder-cards-view/master/demo/ios.gif" />
</p>

## Props

| Props              | Params                         | isRequire | Default                  | Description                                                                                      | 
|--------------------|--------------------------------|-----------|--------------------------|--------------------------------------------------------------------------------------------------|
| data               | Array                          | Yes       |                          | For simplicity, data is a plain array. If you want to use something else, like an immutable list |
| renderItem        | ({ item: any }) => JSX.Element | Yes       |                          | Function that returns a React element to display as Card.                                        |
| onSwipeRight         | (item: any) => void            | No        | -                        | Function that fire when a card swiped in the right direction.                                    |
| onSwipeLeft         | (item: any) => void            | No        | -                        | Function that fire when a card swiped in the left direction.                                     |
| actionOffset | Number                         | No        | 100                      | The value that when the card swipe over it will fire an action.                                  |
| cardWidth              | Number                         | No        | 96% from screen width    | Card width                                                                                       |
| cardHeight  | Number                         | No        | 90% from screen height   | Card height                                                                                      |
| renderRightElement             | () => JSX.Element              | No        | Tinder Nope Image        | Render right element                                                                             |
| renderLeftElement             | () => JSX.Element              | No        | Tinder Like Image        | Render left element                                                                              |
| renderEmptyComponent             | () => JSX.Element              | No        | No more people text view | Render custom empty list component view                                                          |
| animationDuration             | Number                         | No        | 200                      | Swipe animation duration                                                                         |
| centerCards             | Boolean                        | No        | true                     | Center view                                                                                      |
| cardsLeftToCallLoadMore             | Number                        | No        | 3                        | Number of cards left to call onEndReached function for pagination                                |
| onEndReached             | () => void                        | No        | 3                        | On end reached function (Pagination support)                                                     |


## Style props


| Props              | Params                         | isRequire | Default | Description                                                | 
|--------------------|--------------------------------|-----------|---------|------------------------------------------------------------|
| containerStyle               | ViewStyle                          | No       | {}      | An optional param to set Container custom style            |
| emptyViewContainerStyle               | ViewStyle                          | No       | {}      | An optional param to set Empty view Container custom style |
| cardViewStyle               | ViewStyle                          | No       | {}      | An optional param to set Card view custom style            |
| rightElementStyle               | ViewStyle                          | No       | {}      | An optional param to set right element style               |
| leftElementStyle               | ViewStyle                          | No       | {}      | An optional param to set left element style                |

## Methods

You can use Reference to swipe cards programmatically.

* [x] swipeCardRight
* [x] swipeCardLeft

### Swipe Card Right
Swipe current card to the right programmatically using reference:
```
swiperRef.current?.swipeCardRight();
```

### Swipe Card Left
Swipe current card to the left programmatically using reference:
```
swiperRef.current?.swipeCardLeft();
```

### Example

```typescript jsx
import React, {useRef, useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {AnimatedSwiper, AnimatedSwiperRef} from 'react-native-tinder-cards-view';
import {staticData} from './static/data';

const App = () => {
    /**
     * Swiper reference to make swipe programmatically.
     */
    const swiperRef = useRef<AnimatedSwiperRef>(null);
    const [data, setData] = useState(staticData);

    /**
     * Load more data.
     */
    const loadMore = () => {
        setData(prev => [...prev, ...staticData]);
    }

    return (
        <SafeAreaView>
            <AnimatedSwiper
                ref={swiperRef}
                actionOffset={50}
                renderEmptyComponent={() => (
                    <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>Test empty</Text>
                    </View>
                )}
                data={dataList}
                renderItem={({item}) => (
                    <CardItem image={item.image} name={item.name}/>
                )}
                cardsLeftToCallLoadMore={2}
                onEndReached={() => loadMore()}
                onSwipeRight={item => console.log('swipe right', item)}
                onSwipeLeft={item => console.log('swipe left', item)}
            />
            <Button
                title={'Swipe right programmatically'}
                onPress={() => swiperRef.current?.swipeCardRight()}
            />
            <Button
                title={'Swipe left programmatically'}
                onPress={() => swiperRef.current?.swipeCardLeft()}
            />
        </SafeAreaView>
    )
}
```

Card Item template: 


```typescript jsx
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
```

## Demo App

For full working example you can check it on github from [here](https://github.com/louaySleman/react-native-tinder-cards-view/tree/main/example).

## Credit

This package created by [Louay Sleman](https://www.linkedin.com/in/louay-sleman-4495341a0/).
