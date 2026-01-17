import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../utils/api";

const CrudCard = ({
  name,
  email,
  id,
  onDelete,
}: {
  name: string;
  email: string;
  id: string;
  onDelete: () => {};
}) => {
  const deleteItem = async () => {
    try {
      await api.delete(`/usr/${id}`);
      onDelete();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.navigate({
              pathname: "/add-edit-page" as any,
              params: {
                type: "Edit",
                name,
                email,
                id,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteItem}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
    borderRadius: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  email: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.125)",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
export default CrudCard;
