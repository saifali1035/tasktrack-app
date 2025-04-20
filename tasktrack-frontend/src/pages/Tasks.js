import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTasks(res.data);
  };

  // Function to add a new task
  const addTask = async () => {
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title: newTask, date: new Date() }, // Adding date field here
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setNewTask("");
    fetchTasks();
  };

  // Function to toggle the "done" state of the task
  const toggleTask = async (taskId, done) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${taskId}`,
      { done: !done },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    fetchTasks();
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchTasks();
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Tasks</h2>
      <div style={styles.addTaskContainer}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add Task
        </button>
      </div>
      <ul style={styles.taskList}>
        {tasks.map((t) => (
          <li
            key={t._id}
            style={{
              textDecoration: t.done ? "line-through" : "none",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between", // Spread content across both sides
              alignItems: "center",
            }}
          >
            <div style={styles.taskDetails}>
              <em style={styles.date}>
                {new Date(t.date).toLocaleDateString()}
              </em>
              <span style={styles.taskTitle}>{t.title}</span>
            </div>
            <div style={styles.actions}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t._id, t.done)}
                style={{ marginRight: "10px" }}
              />
              <i
                className="fas fa-trash-alt"
                onClick={() => deleteTask(t._id)}
                style={styles.deleteIcon}
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  addTaskContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  taskList: {
    width: "100%",
    maxWidth: "600px",
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  taskDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "70%", // Adjust width to prioritize task title and date
  },
  date: {
    fontStyle: "italic",
    color: "#888",
    marginRight: "10px",
    fontSize: "14px",
  },
  taskTitle: {
    fontSize: "16px",
    color: "#333",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "30%", // Ensure the actions take the remaining space
  },
  deleteIcon: {
    cursor: "pointer",
    color: "red",
    marginLeft: "10px",
    fontSize: "18px",
  },
};

