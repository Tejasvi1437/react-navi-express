import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native"
import axios from "axios"

export default function Login({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    if (!username || !password) return

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username,
        password
      })

      navigation.replace("Dashboard", { user: res.data })
    } catch (err) {
      alert(err.response?.data?.error || "Login failed")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Don't have an account? Register</Text>
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
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 5,
    marginBottom: 15
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
})