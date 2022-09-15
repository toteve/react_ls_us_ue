import { useState } from "react";

export const TaskCreator = ({ createNewTask }) => {

  // manejo de estado local de la nueva tarea
  const [newTaskName, setNewTaskName] = useState("");

  // funcion interna de alerta de envio de formulario y crea nueva tarea
  // al final actualiza estado de nueva tarea
  const handleSubmit = (e) => {
    if (newTaskName.trim() === "") {
      alert("Please enter a task name");
      return;
    }

    e.preventDefault();
    createNewTask(newTaskName);
    setNewTaskName("");
  };


  // render del componente, el formulario llama a una funcion interna para su envio, y el input llama
  // a una funcion interna por cada caracter y actualiza el estado del input
  return (
    <form className="my-2 row" onSubmit={handleSubmit}>
      <div className="col-9">
        <input
          type="text"
          className="form-control"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter a new task..."
          autoFocus
        />
      </div>
      <div className="col-3 p-0 d-flex align-items-center">
        <button className="btn btn-primary btn-sm" type="submit">
          Save Task
        </button>
      </div>
    </form>
  );
};
