interface IUser{
    _id: string;
    name: string;
    email: string;
    password: string;
    rol: "administrator" | "client";
}

declare namespace Express{
    export interface Request{
        user?:IUser       
    }
}