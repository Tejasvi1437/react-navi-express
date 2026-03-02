import React from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import API from "../api/axios";

export default function TaskList({ tasks, setTasks }) {
  const toggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task.id}`, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    } catch {
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity onPress={() => toggleComplete(item)}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      <Button title="Delete" color="#ff4d4d" onPress={() => deleteTask(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { marginTop: 20 },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  taskText: { fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "#888" },
});
