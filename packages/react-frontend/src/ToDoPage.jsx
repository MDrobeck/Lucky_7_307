import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import HorizontalCalendar from "./Calendar";

function ToDoPage({ goToHomePage }) {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [tasksByDay, setTasksByDay] = useState({});

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
				<li
						onClick={goToHomePage} // Navigate to home page
						style={{ cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "40px",
							height: "40px",
							borderRadius: "50%",
							backgroundColor: "#f0f0f0" }}
					>
						<img
							className="icon"
							src="src/assets/home.svg"
							alt="Home"
						/>
					</li>
					<li>
						<img
							className="icon"
							src="src/assets/table.svg"
							alt="Table"
					></img>
				</li>
			</ul>
		</div>
	);
}
export default ToDoPage;
