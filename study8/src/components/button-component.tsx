import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonComponent = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 20,
  },
  text: {
    fontSize: 21,
    fontWeight: "700",
    color: "white",
  },
});
export default ButtonComponent;
