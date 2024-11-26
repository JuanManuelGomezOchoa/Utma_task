import { Button, Card, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const Register = ()=>{
    const [data, setData] = useState({});

    const navigate = useNavigate();

    const onChangeRegister = (e) => {
        e.preventDefault();
        const nData = data;
        nData[e.target.name] = e.target.value;
        setData(nData);
        console.log(nData)
    };
    const onSubmit =  async() => {
        /* Enviar data al server */
        try {
            data.rol = "client"
            await axios.post("http://localhost:4001/users/create/", data)
            navigate("/")
        } catch (error) {
            alert("Hubo un error")
        }
        console.log(data)
    }
    return(
        <>
        <Container>
            <Card>
                <h1>!Registrate!</h1>
            </Card>

            <Card>
                <Form>
                    <Card.Title>Nombre:</Card.Title>
                    <Form.Control name="name" placeholder="Ingresa tu nombre" onChange={onChangeRegister}/>
                    <Card.Title>Correo:</Card.Title>
                    <Form.Control name="email" placeholder="Ingresa tu correo electronico" onChange={onChangeRegister}/>
                    <Card.Title>Contraseña:</Card.Title>
                    <Form.Control name="password" placeholder="Ingresa tu contraseña" onChange={onChangeRegister}/>            
                </Form>


                <Button variant="success" onClick={() => onSubmit()}>Registrarse</Button>
            </Card>

        </Container>
        </>
    )
} 