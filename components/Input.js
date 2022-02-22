import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} textAlign="center" />;
};

const styles = StyleSheet.create({
  input: {
    width: 40,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
});

export default Input;
