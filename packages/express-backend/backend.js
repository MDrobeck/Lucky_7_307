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
	tasks_list: {
		"Thu Feb 20 2025": [
			{ time: "5:00pm", task: "Grocery Shopping" },
			{ time: "6:00pm", task: "Book Doctor Appointment" }
		],
		"Wed Feb 19 2025": [{ task: "Pay Bills" }]
	}
};

//find tasks by category
const findtasksByCategory = (category) => {
	return tasks["task_list"].filter(
	  (category) => tasks["category"] === category
	);
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

//finding task by name
const findTaskByName = (name) => {
	return tasks["task_list"].filter(
	  (user) => user["task_name"] === name
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
	res.send(tasks);
});

  //app to post task
  app.post("/tasks", (req, res) => {
	const taskToAdd = req.body;
	console.log("the body is ", taskToAdd);
	const addedTask = addTask(taskToAdd);
	res.status(201).send(addedTask);
  });