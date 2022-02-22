import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Fonts from "../constants/Fonts.js";
import MainButton from "../components/MainButton.js";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Game Over</Text>
      </View>
      <View style={styles.sumaryContainer}>
        <Text style={styles.sumaryText}>Total of rounds: {props.guessRound}</Text>
        <Text style={styles.sumaryText}>Number was: {props.userNumber}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton onPress={() => props.onNewGame()} style={styles.button}>NEW GAME</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  mainTextContainer: {
    width: 200,
    height: 200,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    marginVertical: 10,
  },
  mainText: {
    fontSize: 50,
    color: "white",
    padding: 20,
    fontFamily: Fonts.header
  },
  buttonContainer: {
      width: 150,
      height: 50,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
  },
  sumaryContainer: {
    height: 40,
    margin: 30,
    alignItems: "center",
    justifyContent: 'center',
  },
  sumaryText: {
    color: 'white',
    fontSize: 35,
    fontFamily: Fonts.body
  },
  button: {
    width: 200,
    height: 50,
  }
});

export default GameOver;
