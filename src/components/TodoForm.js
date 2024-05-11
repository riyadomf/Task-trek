import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const TodoForm = ({ show, onHide, onSubmit, todo, onEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        isCompleted: false
    });

    useEffect(() => {
        if (todo) {
            setFormData(todo);
        } else {
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                priority: 'Low',
                isCompleted: false
            });
        }
    }, [todo]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (todo) {
            onEdit(formData);
        } else {
            onSubmit(formData);
        }
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            priority: 'Low',
            isCompleted: false
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{todo ? 'Edit Todo' : 'New Todo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="dueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="priority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                            as="select"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {todo ? 'Update' : 'Submit'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TodoForm;
