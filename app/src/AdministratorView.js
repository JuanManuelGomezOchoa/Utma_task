import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FileEarmarkBarGraphFill, PeopleFill } from "react-bootstrap-icons";
import axios from "axios";

export const AdministratorView = ()=>{
    const [user, setUser] = useState({});
  const [metrics, setMetrics] = useState({
    numberOfUsers: 0,
    numberOfTasks: 0,
  });

  useEffect(() => {
    getUser();
    getMetrics();
  }, []);
  

  const getUser = () => {
    const user = JSON.parse(localStorage.user);
    setUser(user);
  };

  const getMetrics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4001/tasks/get-metrics"
      );

      const data = {
        numberOfTasks: res.data.numberOfTasks,
        numberOfUsers: res.data.numberOfUsers,
      };

      setMetrics(data)
    } catch (error) {
      alert("Hubo un error al obtener las métricas.", error);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Bienvenido de nuevo {user.name} </Card.Title>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Numero de usuarios registrados: </Card.Title>
                  <PeopleFill />: {metrics.numberOfUsers}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Numero de tareas creadas: </Card.Title>
                  <FileEarmarkBarGraphFill />: {metrics.numberOfTasks}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
);
        
}