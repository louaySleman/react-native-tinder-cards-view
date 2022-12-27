import { ViewStyle } from 'react-native';
export interface AnimatedSwiperProps {
    /**
     * Cards list.
     */
    data: any[];
    /**
     * render card item.
     * @param item
     */
    renderItem: ({ item }: {
        item: any;
    }) => JSX.Element;
    /**
     * On swipe right callback.
     * @param item
     */
    onSwipeRight: (item: any) => void;
    /**
     * On swipe left callback.
     * @param item
     */
    onSwipeLeft: (item: any) => void;
    /**
     * The value that when the card swipe over it
     * will fire an action.
     */
    actionOffset?: number;
    /**
     * An optional param to set Card width.
     * default value [cardHeight = 96% from screen width].
     */
    cardWidth?: number;
    /**
     * An optional param to set Card height.
     * default value [cardHeight = 90% from screen height].
     */
    cardHeight?: number;
    /**
     * An optional param to Render right element.
     */
    renderRightElement?: () => JSX.Element;
    /**
     * An optional param to Render left element.
     */
    renderLeftElement?: () => JSX.Element;
    /**
     * An optional param to set empty list component view.
     */
    renderEmptyComponent?: () => JSX.Element;
    /**
     * An optional param to set Container custom style.
     */
    containerStyle?: ViewStyle;
    /**
     * An optional param to set Empty view Container custom style.
     */
    emptyViewContainerStyle?: ViewStyle;
    /**
     * An optional param to set Card view custom style.
     */
    cardViewStyle?: ViewStyle;
    /**
     * An optional param to set right element style.
     */
    rightElementStyle?: ViewStyle;
    /**
     * An optional param to set left element style.
     */
    leftElementStyle?: ViewStyle;
    /**
     * An optional param change move to next card animation duration in milliseconds.
     * default value [animationDuration = 200]
     */
    animationDuration?: number;
    /**
     * An optional param to change cards alignment.
     * default value is [centerCards = true]
     */
    centerCards?: boolean;
    /**
     * An optional param to set the number of cards that need to be
     * left before calling load more function.
     * default value [cardsLeftToCallLoadMore = 3]
     */
    cardsLeftToCallLoadMore?: number;
    /**
     * An optional param to set the On load more function.
     */
    onEndReached?: () => void;
    /**
     * An optional function fired when no more cards to show.
     */
    onListIsEmpty?: () => void;
}
export interface AnimatedSwiperRef {
    /**
     * Swipe current card on right direction and fire on Right swipe event.
     */
    swipeCardRight: () => void;
    /**
     * Swipe current card on left direction and fire on Right swipe event.
     */
    swipeCardLeft: () => void;
}
