import { Button } from "react-bootstrap";
import { Card, Form, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const CreateTasks = ()=>{

    const [data, setData] = useState({});

    const navigate = useNavigate();

    const [createTask, setCreateTask] = useState({
        title: "Cuestionario vacio",
        expirationDate: "hoy",
        description: "Descripcion simple",
        userId:JSON.parse(localStorage.user)._id,
        status:"incompleted"
    });

    const onChangeCreate = (e) => {
        e.preventDefault();
        const nData = data;
        nData[e.target.name] = e.target.value;
        setData(nData);
        console.log(nData);
    };

    const onChangeTitle = (e) => {
        e.preventDefault();
        const data = createTask;
        data.title = e.target.value;
        setCreateTask({ ...data })
    };

    const onChangeExpiration = (e) => {
        e.preventDefault();
        const data = createTask;
        data.expirationDate = e.target.value;
        setCreateTask({ ...data })
    };
    
    const onChangeDescription = (e) => {
        e.preventDefault();
        const data = createTask;
        data.description = e.target.value;
        setCreateTask({ ...data })
    };

    const sendData = async () => {
        try {
            await axios.post("http://localhost:4001/tasks/create", createTask)
            navigate("/MisTareas")
        } catch (error) {
            alert("Datos incorrectos")
        }
    }

    return(
        <>
        <Container>
        <Card>
            <Card.Text>Ingresa el titulo de tu tarea</Card.Text>
            <Form.Control name="title" placeholder="Titulo de la tarea" type="text" onChange={onChangeTitle}/>

            <Card.Text>Ingresa la fecha de vencimiento de tu tarea</Card.Text>
            <Form.Control name="expirationDate" placeholder="Fecha de vencimiento" type="date" onChange={onChangeExpiration}/>

            <Card.Text>Ingresa la descripcion de tu tarea:</Card.Text>
            <Form.Control name="description" placeholder="Descripcion de la tarea" type="text" onChange={onChangeDescription}/>

            <Button variant="success" onClick={() => sendData()}>Crear tarea</Button>
        </Card>
        </Container>
        </>
    )
}