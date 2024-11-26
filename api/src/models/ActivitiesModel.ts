 import { Schema, model } from "mongoose";
 import { IActivity } from "../GlobalTypes";

 const ActivitySchema = new Schema<IActivity>({
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

 export const ActivitiesModel = model("activities", ActivitySchema);