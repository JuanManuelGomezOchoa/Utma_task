import { Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

export const UserView = ()=>{
    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Nav className="me-auto">
            <Nav.Link as={Link} to={"/MisTareas"}>Ver mis tareas</Nav.Link>
            <Nav.Link as={Link} to={"/CrearTarea"}>Crear tarea</Nav.Link>
            </Nav>
        </Navbar>
        </>
    )
}