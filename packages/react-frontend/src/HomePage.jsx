import React from "react";

function HomePage({ goToToDoPage }) {
	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<button onClick={goToToDoPage}>Go to To-Do List</button>
		</div>
	);
}

export default HomePage;