import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import HorizontalCalendar from "./Calendar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";

function ToDoPage() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [tasksByDay, setTasksByDay] = useState({});

	const INVALID_TOKEN = "INVALID_TOKEN";
	const [token, setToken] = useState(INVALID_TOKEN);
	const [message, setMessage] = useState("");

	function removeOneCharacter(index) {
		setTasksByDay((prevTasksByDay) => {
			// the key
			const dateString = selectedDate.toDateString();
			// the list of tasks
			const currentTasks = prevTasksByDay[dateString];
			// removes the task
			const updated = currentTasks.filter((task, i) => {
				return i !== index;
			});
			// returns the updated task w/o removed task
			return {
				...prevTasksByDay,
				[dateString]: updated
			};
		});
	}

	function updateDict(person) {
		setTasksByDay((prevTasksByDay) => {
			// the key
			const dateString = selectedDate.toDateString();
			// the list of tasks
			const currentTasks = prevTasksByDay[dateString] || [];

			// adds the tasks to the dict
			return {
				...prevTasksByDay,
				[dateString]: [...currentTasks, person]
			};
		});
	}

	function fetchTasks() {
		const promise = fetch("http://localhost:8000/tasks", {
			headers: addAuthHeader()
		});

		return promise;
	}

	useEffect(() => {
		console.log("useEffect is running. Current token:", token);
		fetchTasks()
			.then((res) =>
				res.status === 200 ? res.json() : undefined
			)
			.then((json) => {
				if (json) {
					setTasksByDay(json["tasks_list"]);
				} else {
					setTasksByDay({});
				}
			});
	}, [token]);

	// auth stuff
	function loginUser(creds) {
		const promise = fetch(`http://localhost:8000/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(creds)
		})
			.then((response) => {
				if (response.status === 200) {
					response
						.json()
						.then((payload) => setToken(payload.token));
					setMessage(`Login successful; auth token saved`);
					console.log("Loggedin. Current token:", token);
				} else {
					setMessage(
						`Login Error ${response.status}: ${response.data}`
					);
					throw error;
				}
			})
			.catch((error) => {
				setMessage(`Login Error: ${error}`);
				throw error;
			});

		return promise;
	}

	function signupUser(creds) {
		const promise = fetch(`http://localhost:8000/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(creds)
		})
			.then((response) => {
				if (response.status === 201) {
					response
						.json()
						.then((payload) => setToken(payload.token));
					setMessage(
						`Signup successful for user: ${creds.username}; auth token saved`
					);
				} else {
					setMessage(
						`Signup Error ${response.status}: ${response.data}`
					);
				}
			})
			.catch((error) => {
				setMessage(`Signup Error: ${error}`);
			});

		return promise;
	}

	function addAuthHeader(otherHeaders = {}) {
		console.log("addAuthHeader is called. Current token:", token);
		if (token === INVALID_TOKEN) {
			return otherHeaders;
		} else {
			return {
				...otherHeaders,
				Authorization: `Bearer ${token}`
			};
		}
	}

	return (
		<BrowserRouter>
			<Routes>
				{/* Login Route */}
				<Route
					path="/login"
					element={
						<Login
							handleSubmit={loginUser}
							message={message}
						/>
					}
				/>

				{/* Main Content Route */}
				<Route
					path="/"
					element={
						<div className="container">
							<HorizontalCalendar
								onDateSelect={setSelectedDate}
							/>
							<h1>Todo List</h1>
							<Table
								characterData={
									tasksByDay[
										selectedDate.toDateString()
									] || []
								}
								removeCharacter={removeOneCharacter}
							/>
							<Form handleSubmit={updateDict} />
							<ul>
								<li>
									<img
										class="icon"
										src="src/assets/home.svg"
									></img>
								</li>
								<li>
									<img
										class="icon"
										src="src/assets/table.svg"
									></img>
								</li>
							</ul>
						</div>
					}
				/>

				<Route
					path="/signup"
					element={
						<Login
							handleSubmit={signupUser}
							buttonLabel="Sign Up"
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
export default ToDoPage;
