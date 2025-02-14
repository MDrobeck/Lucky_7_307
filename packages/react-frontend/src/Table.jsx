// src/Table.jsx
import React from "react";

function TableHeader() {
    return (
      <thead>
        <tr>
        <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    const rows = props.characterData.map((row) => {
      return (
        <tr key={row.Task}>
  <td>{row.Task}</td>
  <td>{row.Time}</td>
  <td>{row.Priority}</td>
  <td>
    <button onClick={() => props.removeCharacter(row.id)}>
      Delete
    </button>
  </td>
</tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
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
  export default Table;