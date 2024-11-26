import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";
import jwt from "jsonwebtoken"

export const registerUsers = async (req:Request, res:Response):Promise<any> =>{
    try {
        //Primero validar que los datos que necesitamos existen
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const rol = req.body.rol

        //Administradores no pueden crear clientes
        if(req.user?.rol === "administrator" && rol === "client"){
            return res.status(400).json({msg:"Los administradores no pueden crear clientes"})
        }

        if(!name || !email || !password || !rol){
            return res.status(400).json({
                msg:"Faltan datos para crear un usuario"
            })
        }
        //Validar que el usuario sea administrador si el usuario a crear es administrador
        if(rol === "administrator" && req.user?.rol != "administrator"){
            return res.status(400).json({
                msg:"No puedes crear un nuevo administrador si no eres uno"
            })
        } 

        const user = await UserModel.create({
            name,
            email,
            password,
            rol       
        })

        const token = jwt.sign(JSON.stringify(user), "shhh");

        return res.status(200).json({msg:"Usuario registrados con exito", token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Hubo un error al crear el usuario"})
    }
}