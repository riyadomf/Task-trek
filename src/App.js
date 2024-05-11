import React, { useState } from 'react';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [alert, setAlert] = useState(null);

  const handleNewTodo = () => {
    setSelectedTodo(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleAddTodo = newTodo => {
    const todoWithId = { ...newTodo, id: nextId};

    setNextId(nextId => nextId + 1)
    setTodos(prevTodos => [...prevTodos, todoWithId]);
    setAlert({
      type: 'success',
      message: 'Todo added successfully!'
    });
    setShowModal(false);
  };

  const handleDeleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    setAlert({
      type: 'danger',
      message: 'Todo deleted successfully!'
    });
  };

  const handleEditTodo = editedTodo => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === editedTodo.id ? editedTodo : todo))
    );
    setAlert({
      type: 'success',
      message: 'Todo updated successfully!'
    });
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleDoneTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
    setAlert(({
      type: 'success',
      message: 'Todo status updated'
    }));
  };

  const handleEditButtonClick = id => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setSelectedTodo(todoToEdit);
    setShowModal(true);
  };

  return (
    <Container className="homepage">
      <Row>
        <Col>
          <Button variant="primary" onClick={handleNewTodo}>
            New Todo
          </Button>
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
      <TodoForm
        show={showModal}
        onHide={handleCloseModal}
        onSubmit={handleAddTodo}
        todo={selectedTodo}
        onEdit={handleEditTodo}
      />
    </Container>
  );
};

export default App;
