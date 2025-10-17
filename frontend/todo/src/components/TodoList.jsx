import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="no-todos">
        <p>No todos found. Add a new todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Your Todos ({todos.length})</h2>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;