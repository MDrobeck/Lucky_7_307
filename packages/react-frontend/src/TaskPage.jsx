import React, { useState } from "react"; 
import TaskTable from "./TaskTable"; 
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
        <h1>Please Enter Tasks</h1>
        <Table  
        characterData={characters}  
        removeCharacter={removeOneCharacter} 
        /> 
        <Form handleSubmit={updateList} /> 
        <ul>
            <li><img class="icon" src="src/assets/home.svg"></img></li></ul>
      </div> 
    ); 
  } 
  export default TaskPage;