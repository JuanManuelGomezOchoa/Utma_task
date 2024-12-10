import { Button, Card, Container, Form, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const App = ()=>{
  
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    const loginData = data;
    loginData[e.target.name] = e.target.value;
    setData(loginData)
  }

  const onSubmit = async () => {
    try {
     const res = await axios.post("http://localhost:4001/users/login/", data)
     const user = res.data.user
     user.logined = true
     localStorage.user = JSON.stringify(user) 
     if (user.rol == "administrator"){
      navigate("/Admin")
     }else{
      navigate("/Inicio")
     }

  } catch (error) {
      alert("La informacion proporcionada es incorrecta")
  }
    console.log(data)
  }

  return (
    <>
    <Container>
      <Card className="mb-5">
        <h1>!Iniciar sesion!</h1>
      </Card>


      <Card>
      <Form>
        <Card.Title className="mt-3">Ingresa tu correo electronico:</Card.Title>
      <Form.Control className="mb-3" name="email" placeholder="Ingresa tu correo electronico" onChange={onChange}/>
        <Card.Title >Contraseña</Card.Title>
      <Form.Control className="mb-3" name="password" placeholder="Ingresa tu contraseña" onChange={onChange}/>
      </Form>
      <Button variant="success" onClick={() => onSubmit()}>Iniciar sesion</Button>
      <Nav.Link as={Link} to={"/Register"}>Crear cuenta</Nav.Link>
      </Card>


    </Container>
    
    </>    
  );
}