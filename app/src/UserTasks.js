import { Card, Container, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { Trash, Pencil } from "react-bootstrap-icons";

export const UserTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newExpirationDate, setNewExpirationDate] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const userId = JSON.parse(localStorage.user)._id;
            const { data } = await axios.get(`http://localhost:4001/tasks/get-all${userId}`);
            setTasks(data.tasks);
        } catch (error) {
            console.log(error);
            alert("Hubo un error al obtener las tareas");
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const { data } = await axios.delete("http://localhost:4001/tasks/delete", {
                data: { taskId },
            });
            alert(data.msg);

            // Actualizar las tareas en el frontend
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error(error);
            alert("Hubo un error al eliminar la tarea");
        }
    };

    const handleShowUpdateModal = (task) => {
        setSelectedTask(task);
        setNewTitle(task.title);
        setNewDescription(task.description);
        setNewExpirationDate(task.expirationDate);
        setShowModal(true);
    };

    const handleUpdateTask = async () => {
        if (!newTitle || !newDescription || !newExpirationDate) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await axios.put("http://localhost:4001/tasks/update", {
                taskId: selectedTask._id,
                title: newTitle,
                description: newDescription,
                expirationDate: newExpirationDate,
            });
            alert(data.msg);

            // Actualizar las tareas en el frontend
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === selectedTask._id
                        ? { ...task, title: newTitle, description: newDescription, expirationDate: newExpirationDate }
                        : task
                )
            );

            // Cerrar el modal
            setShowModal(false);
        } catch (error) {
            console.error(error);
            alert("Hubo un error al actualizar la tarea");
        }
    };

    const markAsCompleted = async (taskId) => {
        try {
            const { data } = await axios.put("http://localhost:4001/tasks/update-status", {
                taskId,
                status: "completed",
            });
            alert(data.msg);

            // Actualizar el estado en el frontend
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, status: "completed" } : task
                )
            );
        } catch (error) {
            console.error(error);
            alert("Hubo un error al actualizar el estado de la tarea");
        }
    };

    return (
        <>
            <Card>
                <Card.Title style={{ textAlign: "center" }}>Tareas por hacer</Card.Title>
            </Card>
            {tasks.map(({ _id, title, expirationDate, description, status }, i) => (
                <Container key={i}>
                    <Card
                        style={{
                            width: "18rem",
                            textDecoration: status === "completed" ? "line-through" : "none",
                            opacity: status === "completed" ? 0.7 : 1,
                        }}
                    >
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>{expirationDate}</Card.Text>
                            <Card.Text>{description}</Card.Text>
                            <Button
                                variant="primary"
                                onClick={() => markAsCompleted(_id)}
                                disabled={status === "completed"}
                            >
                                Marcar como completada
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => deleteTask(_id)}
                            >
                                <Trash />
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => handleShowUpdateModal({ _id, title, description, expirationDate })}
                            >
                                <Pencil />
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            ))}

            {/* Modal para actualizar tarea */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formExpirationDate">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                                type="date"
                                value={newExpirationDate}
                                onChange={(e) => setNewExpirationDate(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleUpdateTask}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
