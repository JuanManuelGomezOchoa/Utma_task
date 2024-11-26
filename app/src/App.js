import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { validateLogin, conteoErrores } from "./validaciones";

export const App = ()=>{
  const [datos, setData] = useState({});
  
  const onChangeLogin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(datos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = validateLogin(datos);
    
    if (!conteoErrores(errores)) {

      alert("Por favor, revisa los campos: " + Object.values(errores).join("\n"));
      return;
    }
    
    console.log("Formulario válido, enviando datos:", datos);
  };

  return (
    <>
    <Container>
      <Card className="mb-5">
        <h1>!Iniciar sesion!</h1>
      </Card>


      <Card>
      <Form>
        <Card.Title className="mt-3">Nombre:</Card.Title>
      <Form.Control className="mb-3" name="name" placeholder="Ingresa tu nombre" onChange={onChangeLogin}/>
        <Card.Title >Contraseña</Card.Title>
      <Form.Control className="mb-3" name="password" placeholder="Ingresa tu contraseña" onChange={onChangeLogin}/>
      </Form>
      <Button variant="success" onClick={handleSubmit}>Iniciar sesion</Button>
      </Card>


    </Container>
    
    </>    
  );
}