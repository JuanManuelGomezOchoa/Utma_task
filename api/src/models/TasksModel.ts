 import { Schema, model } from "mongoose";
 import { ITask } from "../GlobalTypes";

 const TaskSchema = new Schema<ITask>({
    title:{
        type: String,
        required: true
    },
    expirationDate:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    status:{
        type: String,
        enum: ["completed","incompleted"],
        default: "incompleted"
    }
 })

 export const TaskModel = model("tasks", TaskSchema);