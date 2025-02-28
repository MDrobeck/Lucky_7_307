import express from "express";
import cors from "cors";
import { registerUser, loginUser, authenticateUser } from "./auth.js";
import { creds } from "./auth.js";

const app = express();
const port = 8000;
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
	res.send("Welcome to our ToDo backend!");
});

const tasks = {
	tasks_list: {}
};

//adding a task
const addTask = (task) => {
	if (!tasks["tasks_list"][task.date]) {
		// If the key doesn't exist, initialize it with an empty array
		tasks["tasks_list"][task.date] = [];
	}
	//const username = req.username;
	//const user = creds.find(user => user.username === username); // finds the user in creds

	//if(user) {
	//	user.tasks
	//}
	//creds[username].push(task);
	tasks["tasks_list"][task.date].push(task);
	console.log("these are tasks", tasks);
	console.log("this is task singular", task);
	return task;
};

const removeTask = (task) => {
	console.log("this is the task being deleted:", task);
	console.log("these are the tasks", tasks);
	console.log(
		"this is on the specific date",
		tasks["tasks_list"][task.date]
	);
	tasks["tasks_list"][task.date] = tasks["tasks_list"][
		task.date
	].filter(
		(currTask) =>
			currTask["name"] !== task.name ||
			currTask["time"] !== task.time
	);
};

//finding task by name
const findTaskByName = (name) => {
	return tasks["task_list"].filter(
		(user) => user["task_name"] === name
	);
};

const generateID = () => {
	return Math.random();
};

//authenticate
app.post("/signup", registerUser);
app.post("/login", loginUser);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//app to find by category
app.get("/tasks", (req, res) => {
	const username = req.username;
	console.log("the current username is: ", username);
	console.log("the current creds is: ", creds);
	res.send(tasks);
});

//app to post task
app.post("/tasks", (req, res) => {
	const taskToAdd = req.body;
	console.log("the body is ", taskToAdd);
	const addedTask = addTask(taskToAdd);
	res.status(201).send(addedTask);
});

app.delete("/tasks", (req, res) => {
	const taskToDelete = req.body;
	if (taskToDelete === undefined) {
		res.status(404).send("Task not found.");
	} else {
		removeTask(taskToDelete);
		res.status(204).send();
	}
});
