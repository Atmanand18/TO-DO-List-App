import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoAPI = {
  getAllTodos: () => api.get('/api/todos'),
  getTodoById: (id) => api.get(`/api/todos/${id}`),
  getTodosByStatus: (completed) => api.get(`/api/todos/status/${completed}`),
  createTodo: (todo) => api.post('/api/todos', todo),
  updateTodo: (id, todo) => api.put(`/api/todos/${id}`, todo),
  toggleTodoStatus: (id) => api.patch(`/api/todos/${id}/toggle`),
  deleteTodo: (id) => api.delete(`/api/todos/${id}`),
};

export default api;