// src/Table.jsx
import React from "react";
function TableHeader() {
	return (
		<thead>
			<tr>
				<th>Time</th>
				<th>Task</th>
			</tr>
		</thead>
	);
}

function TableBody(props) {
	console.log("characterData:", props.characterData);

	if (props.characterData === null) {
		return <caption>Data Unavailable</caption>;
	}
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.time}</td>
				<td>{row.task}</td>
				<td>
					<button
						onClick={() => props.removeCharacter(index)}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});
	return <tbody>{rows}</tbody>;
}

function Table(props) {
	return (
		<table style={{ color: "white"}}>
			<TableHeader />
			<TableBody
				characterData={props.characterData}
				removeCharacter={props.removeCharacter}
			/>
		</table>
	);
}

export default Table;
