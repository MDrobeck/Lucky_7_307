import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    time: "",
    task: ""

    
  });
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "task")
      setPerson({ time: person["time"], task: value });
    else setPerson({ time: value, task: person["task"] });
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ time: "", task: "" });
  }


  return (
    <form>
      <label htmlFor="time">Time</label>
      <input
        type="text"
        name="time"
        id="time"
        value={person.time}
        onChange={handleChange}
      />
      <label htmlFor="task">Task</label>
      <input
        type="text"
        name="task"
        id="task"
        value={person.task}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}
export default Form;
