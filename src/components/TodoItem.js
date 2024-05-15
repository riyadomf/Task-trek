import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsCheck2Circle, BsCheckCircleFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import moment from 'moment';

const TodoItem = ({ todo, onDelete, onEdit, onDone }) => {
  const { id, title, description, dueDate, priority, isCompleted } = todo;

  return (
    <Card className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Due Date: {moment(dueDate).format("Do MMMM, YYYY")}</Card.Text>
        <Card.Text>Priority: {priority}</Card.Text>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <Button
            variant="success"
            onClick={() => onDone(id)}
            title={isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
          >
            {isCompleted ? <BsCheckCircleFill/>: <BsCheck2Circle />}
          </Button>
          <Button
            variant="warning"
            onClick={() => onEdit(id)}
            title="Edit Todo"
          >
            <BsPencilSquare />
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(id)}
            title="Delete Todo"
          >
            <BsTrash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
