import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, FlatList, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card.js";
import Number from "../components/Number.js";
import Fonts from "../constants/Fonts.js";
import MainButton from "../components/MainButton.js";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => {
return (
  <View style={styles.listItem}>
    <Text style={styles.listText}>{listLength - itemData.index}</Text>
    <Text style={styles.listText}>{itemData.item}</Text>
  </View>
)};

const GameScreen = (props) => {
// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const numberGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current + 1,
      currentHigh.current - 1,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curGuesses) => [currentGuess, ...curGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.guessCard}>
        <Text style={styles.cardTitle}>Opponent's Guess</Text>
        <Number style={styles.guessNumber}>{currentGuess}</Number>
      </Card>
      <Card style={styles.choiceCard}>
        <MainButton
          onPress={numberGuessHandler.bind(this, "lower")}
          style={styles.button}
        >
          <Ionicons name="chevron-down" size={24} color={"white"} />
        </MainButton>
        <MainButton
          onPress={numberGuessHandler.bind(this, "higher")}
          style={styles.button}
        >
          <Ionicons name="chevron-up" size={24} color={"white"} />
        </MainButton>
      </Card>
      <View>
        <FlatList
          keyExtractor={(item) => item + Math.random()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  guessCard: {
    width: 200,
    height: 150,
    margin: 20,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: Fonts.header,
  },
  guessNumber: {
    fontSize: 20,
  },
  choiceCard: {
    width: 200,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 10,
  },
  button: {
    width: 80,
    height: 70,
  },
  listItem: {
    width: 200,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 30,
  },
  listText: {
    color: "white",
    fontSize: 20,
    fontFamily: Fonts.number,
  }
});

export default GameScreen;
