import React, { useState } from "react";

function Form(props) {
	const [person, setPerson] = useState({
		time: "",
		task: "",
		date: ""
	});
	function handleChange(event) {
		const { name, value } = event.target;
		if (name === "task")
			setPerson({ time: person["time"], task: value });
		else setPerson({ time: value, task: person["task"] });
	}

	function submitForm() {
		const taskWithDate = {
			...person,
			date: props.date.toDateString()
		};
		props.handleSubmit(taskWithDate);
		setPerson({ time: "", task: "", date: "" });
	}

	return (
		<form>
			<label htmlFor="time"
			style={{ color: "white"}}>Time</label>
			<input
				type="text"
				name="time"
				id="time"
				value={person.time}
				onChange={handleChange}
			/>
			<label htmlFor="task"
			style={{color: "white"}}>Task</label>
			<input
				type="text"
				name="task"
				id="task"
				value={person.task}
				onChange={handleChange}
			/>
			<input
				type="button"
				value="Submit"
				onClick={submitForm}
			/>
		</form>
	);
}
export default Form;
