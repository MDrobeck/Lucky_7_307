import React, { useState } from "react"; 
import Table from "./Table"; 
import Form from "./Form"; 


function ToDoPage() { 
    const [characters, setCharacters] = useState([]); 
    function removeOneCharacter(index) { 
      const updated = characters.filter((character, i) => { 
        return i !== index; 
      }); 
      setCharacters(updated); 
    } 
   
    function updateList(person) { 
      setCharacters([...characters, person]); 
    } 
   
    return ( 
      <div className="container"> 
        <h1>Week</h1>
        <ul>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thur</li>
            <li>Fri</li>
            <li>Sat</li>
            <li>Sun</li>
        </ul>
        <h1>Todo List</h1>
        <Table  
        characterData={characters}  
        removeCharacter={removeOneCharacter} 
        /> 
        <Form handleSubmit={updateList} /> 
        <ul>
            <li><img class="icon" src="src/assets/home.svg"></img></li>
            <li><img class="icon" src="src/assets/table.svg"></img></li></ul>
      </div> 
    ); 
  } 
  export default ToDoPage;