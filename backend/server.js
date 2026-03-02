const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()

const app = express()
app.use(cors())
app.use(express.json())

const db = new sqlite3.Database("./database.sqlite")

db.serialize(() => {

   db.run(`DROP TABLE IF EXISTS users`)

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      startDate TEXT,
      endDate TEXT,
      completed INTEGER DEFAULT 0,
      userId INTEGER
    )
  `)
})

app.post("/auth/register", (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.status(400).json({ error: "All fields required" })

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id: this.lastID, username })
    }
  )
})

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.status(400).json({ error: "All fields required" })

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message })
      if (!user)
        return res.status(401).json({ error: "Invalid credentials" })
      res.json(user)
    }
  )
})

app.get("/tasks/:userId", (req, res) => {
  const userId = req.params.userId

  db.all(
    "SELECT * FROM tasks WHERE userId = ?",
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(rows)
    }
  )
})

app.post("/tasks", (req, res) => {
  const { title, startDate, endDate, userId } = req.body

  if (!title || !userId)
    return res.status(400).json({ error: "Title and userId required" })

  db.run(
    "INSERT INTO tasks (title, startDate, endDate, userId) VALUES (?, ?, ?, ?)",
    [title, startDate, endDate, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })

      res.json({
        id: this.lastID,
        title,
        startDate,
        endDate,
        completed: 0,
        userId
      })
    }
  )
})

app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id

  db.run(
    "UPDATE tasks SET completed = NOT completed WHERE id = ?",
    [taskId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ success: true })
    }
  )
})

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id

  db.run("DELETE FROM tasks WHERE id = ?", [taskId], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ success: true })
  })
})

app.listen(5000, () => console.log("Server running on port 5000"))