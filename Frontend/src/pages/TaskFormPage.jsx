
import { useForm } from "react-hook-form"
import { useTasks } from "../context/taskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


function TaskFormPage() {
  const {register,  handleSubmit , setValue} = useForm();
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate()
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"))
      }
    };
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data)=>{
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    } else {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    navigate('/tasks')
  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Titulo"
        {...register("title")} 
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        autoFocus
        />

        <textarea rows={3} placeholder="Descripcion" 
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          {...register("description")}
        >
        </textarea>

        <input type="date" {...register('date')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

        <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>


      </form>

    </div>
  )
}

export default TaskFormPage
