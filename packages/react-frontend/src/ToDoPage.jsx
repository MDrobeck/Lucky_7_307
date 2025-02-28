import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import HorizontalCalendar from "./Calendar";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Login from "./Login.jsx";

function ToDoPage({ goToTaskPage }) {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [tasksByDay, setTasksByDay] = useState({});

	const INVALID_TOKEN = "INVALID_TOKEN";
	const [token, setToken] = useState(INVALID_TOKEN);
	const [message, setMessage] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	function postTask(task, date) {
		console.log("the date is ", date);
		const taskWithDate = { ...task, date };
		const promise = fetch("Http://localhost:8000/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(taskWithDate)
		});

		return promise;
	}

	function deleteTask(task) {
		const promise = fetch("Http://localhost:8000/tasks", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(task)
		});

		return promise;
	}

	function removeOneCharacter(index) {
		const dateString = selectedDate.toDateString();
		const currentTasks = tasksByDay[dateString] || [];
		const taskToDelete = currentTasks[index];

		if (!taskToDelete) return;

		deleteTask(taskToDelete)
			.then((res) => {
				if (res.status === 204) {
					setTasksByDay((prevTasksByDay) => {
						const prevTasks =
							prevTasksByDay[dateString] || [];
						const updatedTasks = prevTasks.filter(
							(_, i) => i !== index
						);
						return {
							...prevTasksByDay,
							[dateString]: updatedTasks
						};
					});
				} else {
					console.error("Failed to delete task");
				}
			})
			.catch((error) => {
				console.error("Error deleting task:", error);
			});
	}

	function updateDict(task) {
		// the key
		const dateString = selectedDate.toDateString();

		postTask(task, dateString)
			.then((res) => {
				if (res.status === 201) return res.json();
			})
			.then((json) => {
				console.log("this is json", json);
				setTasksByDay((prevTasksByDay) => {
					// the list of tasks
					const currentTasks =
						prevTasksByDay[dateString] || [];
					// adds the tasks to the dict
					return {
						...prevTasksByDay,
						[dateString]: [...currentTasks, json]
					};
				});
			})
			.catch((error) => {
				console.log(error);
			});
		console.log("this is the tasksbyday", tasksByDay);
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
				console.log("this is json:", json["tasks_list"]);
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
					setIsLoggedIn(true);
					console.log("Loggedin. Current token:", token);
				} else {
					setMessage(
						`Login Error ${response.status}: ${response.data}`
					);
					setIsLoggedIn(false);
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
					setIsLoggedIn(true);
					setMessage(
						`Signup successful for user: ${creds.username}; auth token saved`
					);
				} else {
					setMessage(
						`Signup Error ${response.status}: ${response.data}`
					);
					setIsLoggedIn(false);
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
					// if not logged in, move straight to login page.
					element={
						isLoggedIn ? (
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
									removeCharacter={
										removeOneCharacter
									}
								/>
								<Form handleSubmit={updateDict} />
								<ul>
									<li>
										<img
											class="icon"
											src="src/assets/home.svg"
											alt="Home"
										></img>
									</li>
									<li
										onClick={goToTaskPage} // Navigate to task page
										style={{
											cursor: "pointer",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: "40px",
											height: "40px",
											borderRadius: "50%",
											backgroundColor: "#f0f0f0"
										}}
									>
										<img
											className="icon"
											src="src/assets/table.svg"
											alt="Table"
										></img>
									</li>
								</ul>
							</div>
						) : (
							<Navigate to="/login" replace />
						)
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
