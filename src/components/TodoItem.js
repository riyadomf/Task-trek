import React from 'react';
import { Button, Card } from 'react-bootstrap';

const TodoItem = ({ todo, onDelete, onEdit, onDone }) => {
  const { id, title, description, dueDate, priority, isCompleted } = todo;

  return (
    <Card className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Due Date: {dueDate}</Card.Text>
        <Card.Text>Priority: {priority}</Card.Text>
        <Button variant="success" onClick={() => onDone(id)}>
          {isCompleted ? 'Undone' : 'Done'}
        </Button>
        <Button variant="warning" onClick={() => onEdit(id)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
