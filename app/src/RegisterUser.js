import { Button, Card, Container, Form } from "react-bootstrap"

export const Register = ()=>{
    return(
        <>
        <Container>
            <Card>
                <h1>!Registrate!</h1>
            </Card>

            <Card>
                <Form>
                    <Card.Title>Nombre:</Card.Title>
                    <Form.Control name="name" placeholder="Ingresa tu nombre"/>
                    <Card.Title>Correo:</Card.Title>
                    <Form.Control name="email" placeholder="Ingresa tu correo electronico"/>
                    <Card.Title>Contraseña:</Card.Title>
                    <Form.Control name="password" placeholder="Ingresa tu contraseña"/>            
                </Form>


                <Button variant="success">Registrarse</Button>
            </Card>


        </Container>
        </>
    )
} 