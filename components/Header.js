import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

import Color from '../constants/Color.js'
import Fonts from "../constants/Fonts.js";

const Header = props => {
    return (
        <View style={{...styles.header, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: Dimensions.get('window').height < 400 ? 40 : 80,
        paddingTop: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: Color.primary,
    },
    headerAndroid: {
        backgroundColor: Color.secondary,
    },
    headerText: {
        color: 'white',
        fontSize: Dimensions.get('window').height < 400 ? 10 : 22,
        fontFamily: Fonts.header,
    }
})

export default Header;