import express from "express";
import cors from "cors";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

const app = express();
const port = 8000;

app.use(express.json());
app.get("/", (req, res) => {
	res.send("Hello World!");
  });

const tasks= {
	task_list: [{
		category: "Grocery",
		task_name: "bananas",
		task_start: "9",
		task_end: "10"
	}
	]
}
app.get("/tasks", (req, res) => {
	res.send(users);
  });

//find tasks by category
const findtasksByCategory = (category) => {
	return tasks["task_list"].filter(
	  (category) => tasks["category"] === category
	);
  };

//adding a task 
const addTask = (task) => {
	tasks["task_list"].push(task);
	return task;
  };






//authenticate
app.post("/signup", registerUser);
app.post("/login", loginUser);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//app to find by category
app.get("/tasks", (req, res) => {
	const category = req.query.category;
	if (category != undefined) {
	  let result = findtasksByCategory(category);
	  result = { task_list: result };
	  res.send(result);
	} else {
	  res.send(tasks);
	}
  });

  //app to post task
  app.post("/users", (req, res) => {
	const taskToAdd = req.body;
	addTask(taskToAdd);
	res.send();
  });

