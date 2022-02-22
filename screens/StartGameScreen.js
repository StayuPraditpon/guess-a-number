import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";

import Card from "../components/Card.js";
import Input from "../components/Input.js";
import Color from "../constants/Color.js";
import Number from "../components/Number.js";
import Fonts from "../constants/Fonts.js";
import MainButton from "../components/MainButton.js";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width > 400 ? '80%' : '100%')

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width > 400 ? '80%' : '100%')
        }
        Dimensions.addEventListener('change', updateLayout);
        return () =>{
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Please try a number between 1 and 99.',
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: resetInputHandler
                }]);
            return;
        }
        Keyboard.dismiss();
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        setConfirmed(true);
    }

    let confirmOutput

    if (confirmed) {
        confirmOutput = <Card style={styles.enteredNumberContainer}>
            <Text style={styles.cardTitle}>You entered</Text>
            <Number>{selectedNumber}</Number>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start A New Game</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={styles.cardTitle}>Select A Number</Text>
                            <Input
                                blueOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={{width: buttonWidth, ...styles.buttonContainer}}>
                                <MainButton onPress={() => { confirmInputHandler() }} style={{ width: 100, backgroundColor: Color.primary }}>COMFIRM</MainButton>
                                <MainButton onPress={() => { resetInputHandler() }} style={{ width: 100, backgroundColor: Color.accent }}>CANCEL</MainButton>
                            </View>
                        </Card>
                        {confirmOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        height: "20%",
        minHeight: 150,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontFamily: Fonts.header
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
    },
    enteredNumberContainer: {
        width: 300,
        maxWidth: '80%',
        height: "20%",
        minHeight: 150,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 17,
        fontFamily: Fonts.header,
    }
});

export default StartGameScreen;
