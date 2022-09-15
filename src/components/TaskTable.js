// import otro componente que utilizamos TaskRow
import { TaskRow } from "./TaskRow";

// componente para construir la tabla y llamar al componente de cada fila
export function TaskTable({ tasks, toggleTask, showCompleted = false }) {
  console.log(showCompleted);

  // filtra y recorre lo filtrado enviandolo a TaskRow
  const taskTableRows = (doneValue) =>
    tasks
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow key={task.name} task={task} toggleTask={toggleTask} />
      ));

  return (
    <table className="table table-striped table-bordered table-dark border-secondary">
      <thead>
        <tr className="table-primary">
          <th>Task</th>
        </tr>
      </thead>
      {/* llamada con showCompleted con valor false recibido en el componente TaskTable */}
      <tbody>{taskTableRows(showCompleted)}</tbody>
    </table>
  );
}
