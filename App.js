import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import * as Font from "expo-font";
import  AppLoading from "expo-app-loading";

import Header from "./components/Header.js";
import StartGameScreen from "./screens/StartGameScreen.js";
import GameScreen from "./screens/GameScreen.js";
import GameOver from "./screens/GameOver.js";

const fetchFonts = () => {
  return Font.loadAsync({
    "bebas-neue": require("./assets/fonts/BebasNeue-Regular.ttf"),
    "secular-one": require("./assets/fonts/SecularOne-Regular.ttf"),
    "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRound(null);
  };

  const gameOverHandler = (totalRound) => {
    setGuessRound(totalRound);
  };

  const configureNewGameHandler = () => {
    setUserNumber(0);
    setGuessRound(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOver
        onNewGame={configureNewGameHandler}
        userNumber={userNumber}
        guessRound={guessRound}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("./assets/bg3.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
        blurRadius={5}
        fadeDuration={300}
      >
        <Header title="Guess A Number" />
        {content}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    flex: 1,
  },
});
