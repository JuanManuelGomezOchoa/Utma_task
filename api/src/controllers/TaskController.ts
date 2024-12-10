import { Request, Response } from "express";
import { TaskModel } from "../models/TasksModel";
import { UserModel } from "../models/UsersModel";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";

export const registerTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, expirationDate, description, userId, status } = req.body;

        
        if (!title || !expirationDate || !description || !userId || !status) {
            return res.status(400).json({
                msg: "Faltan datos para crear la tarea"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "El ID del usuario no es válido" });
        }

     
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }

        
        const task = await TaskModel.create({
            title,
            expirationDate,
            description,
            userId: user._id, 
            status       
        });

        const token = jwt.sign(JSON.stringify(task), "shhh");

        return res.status(200).json({ msg: "Tarea registrada con éxito", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Hubo un error al intentar crear la tarea" });
    }
};



export const deleteTasks = async (req: Request, res: Response): Promise<any> => {
    try {
        const { taskId } = req.body; 

        if (!taskId) {
            return res.status(400).json({ msg: "El taskId es obligatorio" });
        }

        const task = await TaskModel.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ msg: "No se encontró ninguna tarea con ese ID" });
        }

        return res.status(200).json({ msg: "Tarea eliminada con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Hubo un error al intentar eliminar la tarea" });
    }
};



export const updateTasks = async (req: Request, res: Response): Promise<any> => {
    try {
        const { taskId, title, description, expirationDate } = req.body;

        
        if (!taskId) {
            return res.status(400).json({ msg: "El ID de la tarea es obligatorio" });
        }

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ msg: "El ID proporcionado no es válido" });
        }

        if (!title && !description && !expirationDate) {
            return res.status(400).json({
                msg: "Debes proporcionar al menos uno de los campos: título, descripción o fecha de vencimiento",
            });
        }

        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ msg: "No se encontró ninguna tarea con ese ID" });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (expirationDate) task.expirationDate = expirationDate;

    
        await task.save();

        return res.status(200).json({ msg: "Tarea actualizada con éxito", task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Hubo un error al intentar actualizar la tarea" });
    }
};



export const getMetrics = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const numberOfUsers = await UserModel.find({
        rol: "client",
      }).countDocuments();
  
      const numberOfTasks =
        await TaskModel.find().countDocuments();
  
      res.status(200).json({
        msg: "Datos obtenidos con éxito.",
        numberOfUsers,
        numberOfTasks,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Hubo un error en encontrar los datos.",
  });}
  };
  
  export const getTasks = async(req:Request, res:Response):Promise<any> =>{
    try {

      const tasks = await TaskModel.find({userId:req.params.userId});
      res.status(200).json({msg:"Tareas obtenidas con exito", tasks})
    } catch (error) {
      console.log(error);
      res.status(500).json({msg:"Hubo un error al obtener las tareas"})    
    }
  }

  export const updateTaskStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { taskId, status } = req.body;

        if (!taskId || !status) {
            return res.status(400).json({ msg: "Faltan datos: taskId y status son obligatorios" });
        }

        
        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ msg: "Tarea no encontrada" });
        }

        task.status = status;
        await task.save();

        return res.status(200).json({ msg: "La tarea se marco como completada", task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al actualizar el estado de la tarea" });
    }
};


