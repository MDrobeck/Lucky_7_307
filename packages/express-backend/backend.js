import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to our ToDo backend!");
});

const tasks = {
	task_list: [
		{
			category: "Grocery",
			task_name: "bananas",
			task_start: "9",
			task_end: "10",
		},
		{
			category: "Other",
			task_name: "Dance",
			task_start: "8",
			task_end: "12",
		},
	],
};

// Function to find tasks by category (Fix: Case-insensitive comparison)
const findtasksByCategory = (category) => {
	return tasks["task_list"].filter(
		(task) => task["category"].toLowerCase() === category.toLowerCase()
	);
};

// Route to GET tasks with optional category filtering
app.get("/tasks", (req, res) => {
	const category = req.query.category;

	if (category !== undefined) {
		const result = findtasksByCategory(category);
		res.send({ task_list: result });
	} else {
		res.send(tasks);
	}
});

// Function to add a task
const addTask = (task) => {
	tasks["task_list"].push(task);
	return task;
};

// Route to POST a new task
app.post("/tasks", (req, res) => {
	const taskToAdd = req.body;
	addTask(taskToAdd);
	res.send();
});

// Function to find a task by name
const findTaskByName = (name) => {
	return tasks["task_list"].filter(
		(task) => task["task_name"].toLowerCase() === name.toLowerCase()
	);
};

// Route to DELETE a task by name
app.delete("/tasks/:task_name", (req, res) => {
	const name = req.params.task_name;
	const taskIndex = tasks.task_list.findIndex(
		(task) => task.task_name.toLowerCase() === name.toLowerCase()
	);

	if (taskIndex === -1) {
		return res.status(404).send("Task not found");
	}

	tasks.task_list.splice(taskIndex, 1);
	res.send({ message: "Task deleted successfully" });
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});