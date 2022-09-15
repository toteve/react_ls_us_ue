
// visualiza cada fila y maneja una funcion recibida de App (toggleTask) para supervisar 
// los cambios en la propiedad done true/false de cada tarea
export const TaskRow = ({ task, toggleTask }) => (
  <tr key={task.name}>
    <td className="d-flex justify-content-between">
      {task.name}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task)}
      />
    </td>
  </tr>
);
