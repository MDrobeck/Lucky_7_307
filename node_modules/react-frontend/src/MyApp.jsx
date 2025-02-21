import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import ToDoPage from "./ToDoPage";

function MyApp() {
	const [characters, setCharacters] = useState([]);
	const INVALID_TOKEN = "INVALID_TOKEN";
	const [token, setToken] = useState(INVALID_TOKEN);
	const [message, setMessage] = useState("");

	function removeOneCharacter(index) {
		const person = characters[index];
		const updated = characters.filter((character, i) => {
			return i !== index;
		});
		deleteUser(person)
			.then((res) => {
				if (res.status === 204) setCharacters(updated);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function updateList(person) {
		postUser(person)
			.then((res) => {
				if (res.status === 201) return res.json();
			})
			.then((json) => {
				setCharacters([...characters, json]);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function fetchUsers() {
		console.log("fetchUsers is called. Current token:", token);
		const promise = fetch(`http://localhost:8000/users`, {
			headers: addAuthHeader()
		});

		return promise;
	}

	useEffect(() => {
		console.log("useEffect is running. Current token:", token);
		fetchUsers()
			.then((res) =>
				res.status === 200 ? res.json() : undefined
			)
			.then((json) => {
				if (json) {
					setCharacters(json["users_list"]);
				} else {
					setCharacters(null);
				}
			});
	}, [token]);

	function postUser(person) {
		const promise = fetch("Http://localhost:8000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(person)
		});

		return promise;
	}

	function deleteUser(person) {
		const promise = fetch(
			"Http://localhost:8000/users/" + person.id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(person)
			}
		);

		return promise;
	}

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
				}
			})
			.catch((error) => {
				setMessage(`Login Error: ${error}`);
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
				<Route path="/" element={<ToDoPage />} />

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

	// return <ToDoPage />;
}

export default MyApp;
