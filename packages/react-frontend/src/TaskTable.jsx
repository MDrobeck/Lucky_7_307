import React from "react";
function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Task</th>
                <th>Time-to-Complete</th>
				<th>Start</th>
                <th>Due</th>
            </tr>
        </thead>
    );
}

function TableBody(props) {
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.task}</td>
                <td>{row.time}</td>
				<td>{row.start}</td>
				<td>{row.due}</td>
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
		<table>
			<TableHeader />
			<TableBody
				characterData={props.characterData}
				removeCharacter={props.removeCharacter}
			/>
		</table>
	);
}

export default TaskTable;
