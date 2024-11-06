import PropTypes from "prop-types";
import { useTasks } from "../context/taskContext";
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button onClick={() => deleteTask(task._id)}
            className="bg-red-500 hover:bg-red-950 text-white px-4 py-2 rounded-md"
            >Eliminar</button>
          <Link to={`/tasks/${task._id}`} 
            className="bg-blue-500 hover:bg-blue-950 text-white px-4 py-2 rounded-md"
          
          >Editar</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>
        {dayjs(task.date).utc().format('DD/MM/YYYY')}
      </p>
    </div>
  );
}

// Definir los tipos de las propiedades con PropTypes
TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Añadir _id como requerido
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }).isRequired,
};

export default TaskCard;
