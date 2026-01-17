import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const InputComponent = ({
  title,
  placeholder,
  value,
  onChangeText,
}: {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 19,
    fontWeight: "600",
    color: "black",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    height: 55,
    fontSize: 18,
    color: "black",
  },
});
export default InputComponent;
