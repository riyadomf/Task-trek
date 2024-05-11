import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onEdit, onDone }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onDone={onDone}
        />
      ))}
    </div>
  );
};

export default TodoList;
