import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, deleteUsers, updateUsers, singIn } from "./controllers/UserController";
import { registerTask, deleteTasks, updateTasks, getTasks, getMetrics, updateTaskStatus} from "./controllers/TaskController";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

app.post("/users/create", registerUsers);
app.post("/users/login", singIn)
app.post("/tasks/create", registerTask);
app.delete("/users/delete", deleteUsers);
app.delete("/tasks/delete", deleteTasks);
app.put("/users/update", updateUsers);
app.put("/tasks/update", updateTasks)
app.put('/tasks/update-status', updateTaskStatus);
app.get("/tasks/get-all:userId", getTasks)
app.get("/tasks/get-metrics", getMetrics)
export default app;