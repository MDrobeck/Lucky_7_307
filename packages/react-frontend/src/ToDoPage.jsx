import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import HorizontalCalendar from "./Calendar";

function ToDoPage() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [tasksByDay, setTasksByDay] = useState({});
	//fetch tasks
	function fetchTasks() {
		const promise = fetch("http://localhost:8000/tasks");
		return promise;
	  }
	  useEffect(() => {
		fetchTasks()
		  .then((res) => res.json())
		  .then((json) => setCharacters(json["users_list"]))
		  .catch((error) => {
			console.log(error);
		  });
	  }, []);
	  //create task
	  function postTask(task) {
		const promise = fetch("Http://localhost:8000/tasks", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(task)
		});
	  
		return promise;
	  }

	  function updateTaskList(task) {
		postTask(task)
		  .then(() => setCharacters([...characters, task]))
		  .catch((error) => {
			console.log(error);
		  });
	  }

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

	return (
		<div className="container">
			<HorizontalCalendar onDateSelect={setSelectedDate} />
			<h1>Todo List</h1>
			<Table
				characterData={
					tasksByDay[selectedDate.toDateString()] || []
				}
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateDict} />
			<ul>
				<li>
					<img class="icon" src="src/assets/home.svg"></img>
				</li>
				<li>
					<img
						class="icon"
						src="src/assets/table.svg"
					></img>
				</li>
			</ul>
		</div>
	);
}
export default ToDoPage;
