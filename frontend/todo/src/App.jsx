import React, { useState, useEffect } from 'react';
import { todoAPI } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoAPI.getAllTodos();
      setTodos(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running on port 8080.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await todoAPI.createTodo(newTodo);
      setTodos(prevTodos => [response.data, ...prevTodos]);
      setError('');
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const response = await todoAPI.toggleTodoStatus(id);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? response.data : todo
        )
      );
      setError('');
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getStats();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Todo List App</h1>
          <p>Manage your tasks efficiently</p>
          <div className="stats">
            <span>Total: {stats.total}</span>
            <span>Active: {stats.active}</span>
            <span>Completed: {stats.completed}</span>
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        <div className="app-content">
          <div className="sidebar">
            <TodoForm onAddTodo={handleAddTodo} />
          </div>

          <div className="main-content">
            <FilterButtons
              currentFilter={filter}
              onFilterChange={handleFilterChange}
            />
            <TodoList
              todos={filteredTodos}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;