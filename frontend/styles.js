import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
    padding: 20
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  linkText: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15
  }
})