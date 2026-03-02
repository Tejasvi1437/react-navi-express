import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native"
import axios from "axios"

export default function Dashboard({ route, navigation }) {
  const { user } = route.params
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const fetchTasks = async () => {
    const res = await axios.get(
      `http://localhost:5000/tasks/${user.id}`
    )
    setTasks(res.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async () => {
    if (!title || !startDate || !endDate) return

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date must be before End date")
      return
    }

    const res = await axios.post("http://localhost:5000/tasks", {
      title,
      startDate,
      endDate,
      userId: user.id
    })

    setTasks([...tasks, res.data])
    setTitle("")
    setStartDate("")
    setEndDate("")
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`)
    fetchTasks()
  }

  const toggleTask = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}`)
    fetchTasks()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome {user.name}</Text>

      <TextInput
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text>Start Date</Text>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={styles.input}
      />

      <Text>End Date</Text>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.addBtn} onPress={addTask}>
        <Text style={styles.btnText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.row}>
              <input
                type="checkbox"
                checked={item.completed === 1}
                onChange={() => toggleTask(item.id)}
              />
              <Text style={styles.taskText}>{item.title}</Text>
            </View>

            <Text style={styles.dateText}>
              {item.startDate} - {item.endDate}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, marginBottom: 15 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    padding: 12,
    marginVertical: 10,
    borderRadius: 5
  },
  btnText: { color: "white", textAlign: "center" },
  taskCard: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 6
  },
  row: { flexDirection: "row", alignItems: "center" },
  taskText: { marginLeft: 10, fontSize: 16 },
  dateText: { fontSize: 12, marginTop: 5 },
  deleteBtn: {
    backgroundColor: "red",
    padding: 6,
    marginTop: 5,
    borderRadius: 5
  },
  deleteText: { color: "white", textAlign: "center" },
  logoutBtn: {
    backgroundColor: "black",
    padding: 12,
    marginTop: 20,
    borderRadius: 5
  }
})