import {Router} from  'express';
import {authRequired} from '../middlewares/validateToken.js'
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
  } from '../controllers/tasks.controller.js';

import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";


const router = Router();

router.get("/tasks", authRequired, getTasks);

router.post("/tasks", authRequired, validateSchema(createTaskSchema),createTask);

router.get("/tasks/:id", authRequired, getTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

export default router