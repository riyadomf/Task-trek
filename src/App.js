import React, { useState, useEffect } from "react";
import { Button, Alert, Container, Row, Col, Navbar } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const seedData = [
    {
      "title": "Buy Green Tea",
      "description": "Buy green tea from Shwapno",
      "dueDate": "2024-05-25",
      "priority": "Low",
      "isCompleted": false,
      "id": 1
    },
    {
      "title": "Buy Egg",
      "description": "Buy one dozen of egg",
      "dueDate": "2024-05-29",
      "priority": "Low",
      "isCompleted": false,
      "id": 2
    },
    {
      "title": "Pay wifi bill",
      "description": "pay wifi bill to Mime internet",
      "dueDate": "2024-05-18",
      "priority": "High",
      "isCompleted": false,
      "id": 3
    }
  ];

  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : seedData
  );
  
  // Initialize nextId based on existing todos
  const [nextId, setNextId] = useState(() => {
    const storedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : seedData;
    const maxId = storedTodos.length > 0 ? Math.max(...storedTodos.map(todo => todo.id)) : 0;
    return maxId + 1;
  });

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2*1000); 
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleNewTodo = () => {
    setSelectedTodo(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleAddTodo = (newTodo) => {
    const todoWithId = { ...newTodo, id: nextId };

    setNextId((prevId) => prevId + 1);
    setTodos((prevTodos) => [...prevTodos, todoWithId]);
    setAlert({
      type: "success",
      message: "Todo added successfully!",
    });
    setShowModal(false);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setAlert({
      type: "danger",
      message: "Todo deleted successfully!",
    });
  };

  const handleEditTodo = (editedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );
    setAlert({
      type: "success",
      message: "Todo updated successfully!",
    });
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleDoneTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
    setAlert({
      type: "success",
      message: "Todo status updated",
    });
  };

  const handleEditButtonClick = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setSelectedTodo(todoToEdit);
    setShowModal(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Task Trek</Navbar.Brand>
      </Navbar>
      <Container className="homepage">
        <Row>
          <Col>
            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoList
              todos={todos}
              onDelete={handleDeleteTodo}
              onEdit={handleEditButtonClick}
              onDone={handleDoneTodo}
            />
          </Col>
        </Row>
        <Button
          variant="primary"
          className="add-todo-btn"
          onClick={handleNewTodo}
        >
          <BsPlus />
        </Button>
        <TodoForm
          show={showModal}
          onHide={handleCloseModal}
          onSubmit={handleAddTodo}
          todo={selectedTodo}
          onEdit={handleEditTodo}
        />
      </Container>
    </>
  );
};

export default App;
