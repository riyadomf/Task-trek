import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import moment from "moment";

const TodoForm = ({ show, onHide, onSubmit, todo, onEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    isCompleted: false,
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (todo) {
      setFormData(todo);
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        isCompleted: false,
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (todo) {
        onEdit(formData);
      } else {
        onSubmit(formData);
      }
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        isCompleted: false,
      });
      onHide(); // Close modal after form submission
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{todo ? "Edit Todo" : "New Todo"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a title.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={moment(formData.dueDate).format("YYYY-MM-DD")}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a due date.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a priority.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            {todo ? "Update" : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TodoForm;
