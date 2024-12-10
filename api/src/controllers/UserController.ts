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


export const deleteUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name } = req.body; // Obtenemos el nombre del usuario desde el cuerpo de la solicitud

        // Validar que se proporcionó un nombre
        if (!name) {
            return res.status(400).json({ msg: "El nombre del usuario es requerido" });
        }

        // Buscar y eliminar al usuario por su nombre
        const user = await UserModel.findOneAndDelete({ name });

        if (!user) {
            return res.status(404).json({ msg: "No se encontro a un usuario con ese nombre :( " });
        }

        return res.status(200).json({ msg: "Usuario eliminado con exito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Hubo un error al intentar eliminar el usuario" });
    }
};

export const updateUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name } = req.body; // Identificador único del usuario (en este caso, su nombre)
        const { email, password } = req.body; // Datos que se desean actualizar

        // Validar que se haya proporcionado el nombre
        if (!name) {
            return res.status(400).json({ msg: "El nombre del usuario es requerido" });
        }

        // Validar que se proporcionen datos para actualizar
        if (!email && !password) {
            return res.status(400).json({ msg: "Debes proporcionar al menos el correo o la contraseña para actualizar" });
        }

        // Buscar al usuario por nombre
        const user = await UserModel.findOne({ name });
        if (!user) {
            return res.status(404).json({ msg: `No se encontró un usuario con el nombre '${name}'` });
        }

        // Actualizar los campos permitidos
        if (email) user.email = email;
        if (password) user.password = password;

        // Guardar los cambios
        await user.save();

        return res.status(200).json({ msg: "Usuario actualizado con éxito", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Hubo un error al actualizar el usuario" });
    }
};

export const singIn = async (req: Request, res: Response): Promise<any> => {
    try {
        //Correo y contraseña
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "El campo de correo y contraseña son requeridos" });
        }

        // Verificar que el usuario existe con el email y la passwor
        const user = await UserModel.findOne({email:req.body.email, password:req.body.password});

        // Si no existe devuelve un error
        if (!user) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        
        // Devolver un token
        const token = jwt.sign(JSON.stringify(user), "shhh");

        return res.status(200).json({ msg: "El usuario si existe", token, user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hubo un error al intentar iniciar sesion" });
    }
};