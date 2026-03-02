import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native"
import axios from "axios"

export default function Register({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    if (!username || !password) return

    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password
      })

      alert("Registered successfully")
      navigation.replace("Login")
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 30 },
  heading: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    marginBottom: 15
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
})