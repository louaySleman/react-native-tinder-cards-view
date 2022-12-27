"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const styles_1 = require("./styles");
const constants_1 = require("../config/constants");
const AnimatedSwiper = (0, react_1.forwardRef)(({ data, renderItem, onSwipeRight, onSwipeLeft, actionOffset = constants_1.ACTION_OFFSET, cardWidth = constants_1.CARD.WIDTH, cardHeight = constants_1.CARD.HEIGHT, renderRightElement, renderLeftElement, renderEmptyComponent, containerStyle = {}, cardViewStyle = {}, emptyViewContainerStyle = {}, rightElementStyle = {}, leftElementStyle = {}, animationDuration = 200, centerCards = true, cardsLeftToCallLoadMore = 3, onEndReached, onListIsEmpty, }, ref) => {
    const swipe = (0, react_1.useRef)(new react_native_1.Animated.ValueXY()).current;
    const rotateFactor = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    const [firstIndex, setFirstIndex] = (0, react_1.useState)(0);
    const [showNoMoreCards, setShowNoMoreCards] = (0, react_1.useState)(false);
    const [showSecondCard, setShowSecondCard] = (0, react_1.useState)(true);
    const firstIndexRef = (0, react_1.useRef)(firstIndex);
    const dataRef = (0, react_1.useRef)(data);
    /**
     * Update current data.
     */
    (0, react_1.useEffect)(() => {
        dataRef.current = data;
    }, [data]);
    /**
     * on card release event.
     * @param e
     * @param dx
     * @param dy
     */
    const onPanResponderRelease = (e, { dx, dy }) => {
        const direction = Math.sign(dx);
        const userAction = Math.abs(dx) > actionOffset;
        if (userAction) {
            moveToNextCard(direction, dy);
        }
        else {
            react_native_1.Animated.spring(swipe, {
                friction: 5,
                toValue: {
                    x: 0,
                    y: 0,
                },
                useNativeDriver: true,
            }).start();
        }
    };
    /**
     * Pan responder init.
     */
    const panResponder = (0, react_1.useRef)(react_native_1.PanResponder.create({
        onMoveShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            return Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2)) > 10;
        },
        onPanResponderMove: (e, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy });
            rotateFactor.setValue(y0 > cardHeight / 2 ? 1 : -1);
        },
        onPanResponderRelease,
    })).current;
    /**
     * Swipe to the next card.
     * @param direction
     * @param dy
     */
    const moveToNextCard = (direction, dy) => {
        react_native_1.Animated.timing(swipe, {
            duration: animationDuration,
            toValue: {
                x: direction * cardWidth * 2,
                y: dy,
            },
            useNativeDriver: true,
            easing: react_native_1.Easing.linear,
        }).start(transitionNext);
    };
    /**
     * Transition to the next card callback.
     */
    const transitionNext = () => {
        // @ts-ignore
        if (swipe.x._value) {
            // @ts-ignore
            if (swipe.x._value > 0) {
                onSwipeRight(dataRef.current[firstIndexRef.current]);
            }
            // @ts-ignore
            if (swipe.x._value < 0) {
                onSwipeLeft(dataRef.current[firstIndexRef.current]);
            }
        }
        setShowNoMoreCards(false);
        setFirstIndex((prev) => prev + 1);
        swipe.setValue({ x: 0, y: 0 });
    };
    (0, react_1.useEffect)(() => {
        firstIndexRef.current = firstIndex;
        setShowSecondCard(data.length - 1 > firstIndex);
        setShowNoMoreCards(data.length - 1 < firstIndex);
        if (data.length - cardsLeftToCallLoadMore === firstIndex) {
            onEndReached && onEndReached();
        }
    }, [data.length, firstIndex]);
    /**
     * Fire on list empty callback.
     */
    (0, react_1.useEffect)(() => {
        if (showNoMoreCards && onListIsEmpty)
            onListIsEmpty();
    }, [showNoMoreCards]);
    /**
     * Card rotate animation.
     */
    const rotate = react_native_1.Animated.multiply(swipe.x, rotateFactor).interpolate({
        inputRange: [-constants_1.ACTION_OFFSET, 0, constants_1.ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg'],
    });
    /**
     * Card swipe animation with rotate left/right.
     */
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }],
    };
    /**
     * Like opacity animation.
     */
    const likeOpacity = swipe.x.interpolate({
        inputRange: [0, constants_1.ACTION_OFFSET],
        outputRange: [0, 1],
    });
    /**
     * Nope opacity animation.
     */
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-constants_1.ACTION_OFFSET, 0],
        outputRange: [1, 0],
    });
    /**
     * Left distance.
     */
    const leftDistance = centerCards ? (react_native_1.Dimensions.get('screen').width - cardWidth) / 2 : 0;
    /**
     * Force swipe left/right.
     */
    const swipeCardLeft = () => {
        if (onSwipeLeft)
            onSwipeLeft(data[firstIndex]);
        moveToNextCard(-1, 0);
    };
    /**
     * Force swipe left/right.
     */
    const swipeCardRight = () => {
        if (onSwipeRight)
            onSwipeRight(data[firstIndex]);
        moveToNextCard(1, 0);
    };
    /**
     * Pass swipe card to ref.
     */
    (0, react_1.useImperativeHandle)(ref, () => {
        return {
            swipeCardLeft,
            swipeCardRight,
        };
    });
    return (<react_native_1.Animated.View style={[styles_1.styles.container, containerStyle]}>
                {data?.length > 0 && !showNoMoreCards && (<react_1.default.Fragment>
                        {showSecondCard && (<react_native_1.View style={[
                    {
                        position: 'absolute',
                        left: leftDistance,
                    },
                    cardViewStyle,
                ]}>
                                {renderItem({
                    item: data[firstIndex + 1],
                })}
                            </react_native_1.View>)}
                        <react_native_1.Animated.View style={[
                styles_1.styles.cardView,
                {
                    ...animatedCardStyle,
                    position: 'absolute',
                    left: leftDistance,
                },
                cardViewStyle,
            ]} {...panResponder.panHandlers}>
                            {renderItem({
                item: data[firstIndex],
            })}
                            <react_native_1.View style={styles_1.styles.absolute} pointerEvents={'none'}>
                                <react_native_1.Animated.View style={[styles_1.styles.like, { opacity: likeOpacity }, leftElementStyle]}>
                                    {renderLeftElement ? (renderLeftElement()) : (<react_native_1.Image style={styles_1.styles.likeImage} source={require('../resources/images/like.png')}/>)}
                                </react_native_1.Animated.View>
                                <react_native_1.Animated.View style={[styles_1.styles.nope, { opacity: nopeOpacity }, rightElementStyle]}>
                                    {renderRightElement ? (renderRightElement()) : (<react_native_1.Image style={styles_1.styles.nopeImage} source={require('../resources/images/nope.png')}/>)}
                                </react_native_1.Animated.View>
                            </react_native_1.View>
                        </react_native_1.Animated.View>
                    </react_1.default.Fragment>)}
                {showNoMoreCards &&
            (renderEmptyComponent ? (<react_native_1.View style={[styles_1.styles.customEmptyView, emptyViewContainerStyle]}>
                            {renderEmptyComponent()}
                        </react_native_1.View>) : (<react_native_1.View style={styles_1.styles.emptyView}>
                            <react_native_1.Text style={styles_1.styles.emptyViewText}>No more cards to show</react_native_1.Text>
                        </react_native_1.View>))}
            </react_native_1.Animated.View>);
});
exports.default = AnimatedSwiper;
//# sourceMappingURL=index.js.map