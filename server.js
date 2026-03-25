const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const file = "tasks.json";

function readTasks() {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file));
}

function writeTasks(tasks) {
    fs.writeFileSync(file, JSON.stringify(tasks));
}

app.get("/tasks", (req, res) => {
    res.json(readTasks());
});

app.post("/tasks", (req, res) => {
    const tasks = readTasks();
    tasks.push(req.body.task);
    writeTasks(tasks);
    res.json(tasks);
});

app.put("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    tasks[req.params.id] = req.body.task;
    writeTasks(tasks);
    res.json(tasks);
});

app.delete("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    tasks.splice(req.params.id, 1);
    writeTasks(tasks);
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});