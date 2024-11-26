import { Card, Container, Table } from "react-bootstrap"

export const AdministratorView = ()=>{
    return(
        <>
        <Container>
            <Card>
                <h1>Vista de administrador</h1>
            </Card>

            <Table>
                <thead>
                    <tr>
                        <th>Usuario:</th>
                        <th>Numero de tareas:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Manuel</td>
                        <td>123</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
        </>
    )
}