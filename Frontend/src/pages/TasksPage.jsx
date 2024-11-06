import { useEffect } from "react";
import { useTasks } from "../context/taskContext";
import {TaskCard} from '../components/TaskCard'

function TasksPage() {


  const {getTasks, tasks} = useTasks();

  useEffect(() =>{
    getTasks()
  }, [])

  if(tasks.lenth ===0) return (  <h1> NO TIENE TAREAS </h1> )


  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tasks.map(task => (
          <TaskCard task={task} key={task._id} /> //enviamos props
        ))}
    </div>
  )
}

export default TasksPage
