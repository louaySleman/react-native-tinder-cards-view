"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const react_native_1 = require("react-native");
exports.styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    cardView: {
        width: '100%',
        height: '100%',
    },
    customEmptyView: {
        width: '100%',
        height: react_native_1.Dimensions.get('screen').height - 70,
    },
    emptyView: {
        width: '100%',
        height: react_native_1.Dimensions.get('screen').height - 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyViewText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    absolute: {
        position: 'absolute',
        width: '100%',
    },
    like: {
        position: 'absolute',
        top: 10,
        left: '4%',
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nope: {
        position: 'absolute',
        top: 10,
        right: '2%',
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    nopeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
//# sourceMappingURL=styles.js.map