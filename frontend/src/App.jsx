import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = '/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTodos(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend server is running.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo
  const handleAdd = async (description, status) => {
    try {
      const res = await axios.post(API_URL, { description, status });
      setTodos((prev) => [res.data, ...prev]);
      setError(null);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Add error:', err);
    }
  };

  // Toggle todo status
  const handleToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'ongoing' : 'completed';
    try {
      const res = await axios.put(`${API_URL}/${id}`, { status: newStatus });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data : todo))
      );
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Toggle error:', err);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Delete error:', err);
    }
  };

  const completedCount = todos.filter((t) => t.status === 'completed').length;
  const ongoingCount = todos.filter((t) => t.status === 'ongoing').length;

  // filter state controls which tasks are shown (all / ongoing / completed)
  const [filter, setFilter] = useState('all');
  const filteredTodos =
    filter === 'all' ? todos : todos.filter((t) => t.status === filter);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">✨</div>
        <h1 className="app-title">TaskFlow</h1>
        <p className="app-subtitle">Organize your day, one task at a time</p>

        {!loading && todos.length > 0 && (
          <div className="app-stats">
            <div className="stat-item">
              <span className="stat-number">{todos.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">{ongoingCount}</span>
              <span className="stat-label">Ongoing</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        )}
      </header>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button className="error-close" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      <TodoForm onAdd={handleAdd} loading={loading} />

      {/* filter control only shown once todos have loaded */}
      {!loading && todos.length > 0 && (
        <div className="filter-controls">
          <div className="filter-pill" role="group" aria-label="Filter tasks">
            <span className="filter-icon" aria-hidden>
              {/* simple filter SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <select
              id="status-filter"
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            <span className="filter-chevron" aria-hidden>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span>Loading your tasks...</span>
        </div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          filter={filter}
          hasTodos={todos.length > 0}
        />
      )}
    </div>
  );
}

export default App;
