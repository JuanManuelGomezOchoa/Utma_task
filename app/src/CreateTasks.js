import { Button } from "react-bootstrap"
import { Card, Form, Container } from "react-bootstrap"

export const CreateTasks = ()=>{
    return(
        <>
        <Container>
        <Card>
            <Card.Text>Ingresa el titulo de tu tarea</Card.Text>
            <Form.Control name="title" placeholder="Titulo de la tarea" type="text"/>

            <Card.Text>Ingresa la fecha de vencimiento de tu tarea</Card.Text>
            <Form.Control name="expirationDate" placeholder="Fecha de vencimiento" type="date"/>

            <Card.Text>Ingresa la descripcion de tu tarea:</Card.Text>
            <Form.Control name="description" placeholder="Descripcion de la tarea" type="text"/>

            <Button variant="success">Crear tarea</Button>
        </Card>
        </Container>
        </>
    )
}