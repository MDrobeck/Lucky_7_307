import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import ToDoPage from "./ToDoPage";
import HomePage from "./HomePage";

function MyApp() {
	const [showToDoPage, setShowToDoPage] = useState(false); // State to toggle between pages

	// Function to navigate to ToDoPage
	const goToToDoPage = () => {
		setShowToDoPage(true);
	};

	// Function to navigate back to HomePage
	const goToHomePage = () => {
		setShowToDoPage(false);
	};

	return (
		<>
			{showToDoPage ? (
				<ToDoPage goToHomePage={goToHomePage} />
			) : (
				<HomePage goToToDoPage={goToToDoPage} />
			)}
		</>
	);
}

export default MyApp;
