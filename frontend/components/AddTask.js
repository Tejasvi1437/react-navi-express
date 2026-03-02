import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../api/axios";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return Alert.alert("Error", "Task title cannot be empty");

    try {
      await API.post("/tasks", { title });
      setTitle("");
      onAdd(); // refresh task list
    } catch (err) {
      Alert.alert("Error", "Failed to add task");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New Task"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
});
