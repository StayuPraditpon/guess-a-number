import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Color from "../constants/Color.js"
import Fonts from "../constants/Fonts.js";

const Number = props => {
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    numberContainer: {
        height: '45%',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Color.accent, 
        borderRadius: 20
    },
    number: {
        fontSize: 40,
        fontFamily: Fonts.number,
    }
})

export default Number;