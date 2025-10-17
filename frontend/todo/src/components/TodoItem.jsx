import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h3 className="todo-title">{todo.title}</h3>
          <div className="todo-actions">
            <button
              onClick={handleToggle}
              className={`btn-toggle ${todo.completed ? 'completed' : ''}`}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={handleDelete}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          <span className="todo-date">
            Created: {formatDate(todo.createdAt)}
          </span>
          {todo.updatedAt !== todo.createdAt && (
            <span className="todo-date">
              Updated: {formatDate(todo.updatedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;