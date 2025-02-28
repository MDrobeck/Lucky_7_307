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

//authenticate
app.post("/signup", registerUser);
app.post("/login", loginUser);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//app to list all tasks
app.get("/tasks", authenticateUser, (req, res) => {
	const username = req.username;
	console.log("the current username is: ", username);
	console.log("the current creds is: ", creds);
	taskService
		.getTasks()
		.then((tasks) => res.send({ tasks_list: tasks }))
		.catch((error) => res.status(500).send(error));
});

//app to post task
app.post("/tasks", authenticateUser, (req, res) => {
	const tasksToAdd = req.body;
	taskService
		.addTask(tasksToAdd)
		.then((addedTask) => res.status(201).send(addedTask))
		.catch((error) => res.status(500).send(error));
});

app.delete("/tasks/:id", authenticateUser, (req, res) => {
	const id = req.params["id"];
	taskService
		.deleteTaskById(id)
		.then((deletedUser) => {
			res.status(204).send(deletedUser);
		})
		.catch((error) => res.status(500).send(error));
});
