import express from "express";
import cors from "cors";
// import { registerUser, loginUser, authenticateUser } from "./auth.js";

const app = express();
const port = 8000;
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
	res.send("Welcome to our ToDo backend!");
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

//finding task by name
const findTaskByName = (name) => {
	return users["task_list"].filter(
	  (user) => user["task_name"] === name
	);
  };






// //authenticate
// app.post("/signup", registerUser);
// app.post("/login", loginUser);

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
  app.post("/tasks", (req, res) => {
	const taskToAdd = req.body;
	addTask(taskToAdd);
	res.send();
  });

  //delete task by name
  app.delete("/tasks", (req, res) => {
	const name = req.params["task_name"]; //or req.params.id
	let result = findTaskByName(name);
	if (result == undefined){
	  res.status(404).send("Resource not found")
	}
	else 
	{
	  const location = tasks.task_list.findIndex(tasks => tasks.task_name == task_name);
	  users.users_list.splice(location, 1);
	}
  }) 
