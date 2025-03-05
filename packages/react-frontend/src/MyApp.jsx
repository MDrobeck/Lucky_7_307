import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import ToDoPage from "./ToDoPage";
import TaskPage from "./TaskPage";

function MyApp() {
	// return <ToDoPage />;
	const [showToDoPage, setShowToDoPage] = useState(false); // State to toggle between pages

	// Function to navigate to ToDoPage
	const goToToDoPage = () => {
		setShowToDoPage(true);
	};

	// Function to navigate back to HomePage
	const goToTaskPage = () => {
		setShowToDoPage(true);
	};

	return (
		<>
			{showToDoPage ? (
				<TaskPage goToToDoPage={goToToDoPage} />
			) : (
				<ToDoPage goToTaskPage={goToTaskPage} />
			)}
		</>
	);
}

export default MyApp;
