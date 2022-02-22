import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Color from "../constants/Color.js";
import Fonts from "../constants/Fonts.js";

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button , ...props.style}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 120,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 20,
        backgroundColor: Color.secondary,
    },
    buttonText: {
        fontFamily: Fonts.header,
        color: 'white',
    }
})

export default MainButton;