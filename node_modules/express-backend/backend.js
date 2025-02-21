import express from "express";
import cors from "cors";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

const tasks = {
	tasks_list: {
		"Thu Feb 20 2025": [
			{ time: "5:00pm", task: "Grocery Shopping" },
			{ time: "6:00pm", task: "Book Doctor Appointment" }
		],
		"Wed Feb 19 2025": [{ task: "Pay Bills" }]
	}
};

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/tasks", authenticateUser, (req, res) => {
	{
		const username = req.username;
		console.log("the current username is: ", username);
		res.send(tasks);
	}
});

// Authentication Stuff
app.post("/signup", registerUser);

app.post("/login", loginUser);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
