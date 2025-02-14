// src/Form.jsx
import React, { useState } from "react";



  function Form(props) {
  const [person, setPerson] = useState({
    Task: "",
    Time: "",
    Priority: ""
  });
  
  async function submitForm() {
    if (person.name && person.job) {
      props.handleSubmit(person);
      setPerson({ name: "", job: "" });
    }
}

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson({ name: person["name"], job: value });
    else setPerson({ name: value, job: person["job"] });
  }
  
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />x
      <input type="button" value="Add Task" onClick={submitForm} />
    </form>
  );
}
export default Form;