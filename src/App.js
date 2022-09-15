// importamos componentes para manejar estados del componente y efectos secundarios 
// del componente
import { useState, useEffect } from "react";

// importamos todos los componentes que deseo utilizar desde App.js son cinco (5)
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import { TaskTable } from "./components/TaskTable";
import { Container } from "./components/Container";

// codigo del componete App
function App() {

  // definimos 3 juegos de state Usuario, Arreglo y Mostrar
  const [userName, setUserName] = useState("Totesaut");
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setshowCompleted] = useState(false);

  // 1er efecto que se va a ejecutar solo al cargar el componente
  useEffect(() => {
    // leer datos del localStotage del navegador
    let data = localStorage.getItem("tasks");

    // si existe data en el LS se actualiza el estado del arreglo, convirtiendo a Json
    if (data) {
      setTaskItems(JSON.parse(data));
    }
    setUserName("Totesaut");
  }, []);

  // 2do efecto que se va a ejecutar solo al actualizar el estado de la variable del arreglo
  useEffect(() => {
    // graba los datos en el LS ahora convirtiendo a string
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);


  // definicion de funciones internas del componente

  // funcion para crear nuevas tareas
  const createNewTask = (taskName) => {

    // si el nombre de tarea no existe entonces se agrega un objeto al arreglo sin mutarlo (spread operator)
    if (!taskItems.find((t) => t.name === taskName))
      setTaskItems([...taskItems, { name: taskName, done: false }]);
  };

  // funcion para activar o desactivar la tarea en su propiedad done true/false, se actualiza el estado del arreglo sin mutarlo
  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );


  // funcion para limpiar tareas de las que estan hechas  
  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setshowCompleted(false);
  };


  // render del componente App
  // llaman los componentes importados de components
  return (
    <main className="bg-dark vh-100 text-white">
      {/* paso a TaskBanner las variables de 2 de los State */}
      <TaskBanner userName={userName} taskItems={taskItems} />

      {/* el Container es llamado */}
      <Container>

        {/* el TaskCreator le paso una funcion interna de App */}
        <TaskCreator createNewTask={createNewTask} />

        {/* el TaskTable le paso el arreglo de tareas y la funcion de intercambio, ver TO DO */}
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />

        {/* a VC paso la variable y funcion de seteo del state showCompleted y la funcion interna
        cleanTasks */}
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setshowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        {/* evaluacion perezosa si showCompleted ejecuta a TaskTable pasando 3 propiedades 
            para mostrar las Completadas */}
        {showCompleted && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
