import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd, loading }) {
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('ongoing');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        onAdd(description.trim(), status);
        setDescription('');
        setStatus('ongoing');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-input-wrapper">
                    <input
                        id="todo-description-input"
                        type="text"
                        className="form-input"
                        placeholder="What needs to be done?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                        autoComplete="off"
                    />
                </div>
                <select
                    id="todo-status-select"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={loading}
                    aria-label="Task status / list filter"
                >
                    <option value="ongoing">🔄 Ongoing</option>
                    <option value="completed">✅ Completed</option>
                </select>
                <button
                    id="todo-add-btn"
                    type="submit"
                    className="form-btn"
                    disabled={!description.trim() || loading}
                >
                    <span className="form-btn-icon">+</span>
                    Add
                </button>
            </div>
        </form>
    );
}

export default TodoForm;
