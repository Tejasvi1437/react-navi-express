import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../components/button-component";
import InputComponent from "../components/input-component";
import api from "../utils/api";

const Page = () => {
  const params = useLocalSearchParams();
  const [name, setName] = useState(params?.name || "");
  const [email, setEmail] = useState(params?.email || "");

  const onSave = async () => {
    if (!name || !email) {
      return Alert.alert("Error", "All fields are required...");
    }

    try {
      if (params.id) {
        const response = await api.put(`/usr/${params.id}`, {
          name,
          email,
        });
        console.log(response.data);
      } else {
        const response = await api.post("/usr", {
          name,
          email,
        });
        console.log(response.data);
      }
      router.navigate("/");
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: "center" }]}>CRUD APP</Text>
      <Text style={styles.title}>{params.type} User</Text>
      <View style={styles.inputContainer}>
        <InputComponent
          title="Name"
          placeholder="Enter your name"
          value={name as string}
          onChangeText={(value: string) => setName(value)}
        />

        <InputComponent
          title="Email"
          placeholder="Enter your email"
          value={email as string}
          onChangeText={(value: string) => setEmail(value)}
        />
      </View>
      <ButtonComponent title="Save" onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    gap: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "black",
  },
  inputContainer: {
    backgroundColor: "white",
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    minHeight: 450,
    gap: 20,
  },
});
export default Page;
