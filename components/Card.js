import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    margin: 10,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
});

export default Card;
