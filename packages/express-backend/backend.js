import express from "express";
import cors from "cors";
import { registerUser, loginUser, authenticateUser } from "./auth.js";
import { creds } from "./auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskService from "./services/task-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "tasks") // connect to Db "tasks"
  .catch((error) => console.log(error));

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
	taskService.getTasks()
		.then(tasks => res.send({ tasks_list: tasks.tasks_list }))
		.catch(error => res.status(500).send(error));
});

//app to post task
app.post("/tasks", (req, res) => {
	const taskToAdd = req.body;
	taskService.addTask(taskToAdd)
		// findOneAndUpdate returns the entire document, so we have to filter it to the list on the
		// date key, and then grab the last added...
		.then(addedTask => res.status(201).send(
			addedTask.tasks_list.get(taskToAdd.date)[addedTask.tasks_list.get(taskToAdd.date).length - 1]))
		.catch(error => res.status(500).send(error));
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