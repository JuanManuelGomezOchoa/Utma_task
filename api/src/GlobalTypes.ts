import { Schema } from "mongoose";

export interface IUser{
    name:string;
    email:string;
    password:string;
    rol: "administrator" | "client"
}

export interface IActivity{
    title:string;
    expirationDate:string;
    description:string;
    userId: Schema.Types.ObjectId | string;
    status: "completed" | "incompleted"
}

