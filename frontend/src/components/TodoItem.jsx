import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, index }) {
    const isCompleted = todo.status === 'completed';

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div
            className={`todo-item ${isCompleted ? 'completed' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
        >
            <div className="todo-checkbox-wrapper">
                <input
                    id={`todo-checkbox-${todo._id}`}
                    type="checkbox"
                    className="todo-checkbox"
                    checked={isCompleted}
                    onChange={() => onToggle(todo._id, todo.status)}
                    aria-label={`Mark "${todo.description}" as ${isCompleted ? 'ongoing' : 'completed'}`}
                />
            </div>

            <div className="todo-content">
                <p className={`todo-description ${isCompleted ? 'completed' : ''}`}>
                    {todo.description}
                </p>
                <div className="todo-meta">
                    <span className={`todo-status-badge ${todo.status}`}>
                        {isCompleted ? '✓ Completed' : '● Ongoing'}
                    </span>
                    {todo.createdAt && (
                        <span className="todo-date">{formatDate(todo.createdAt)}</span>
                    )}
                </div>
            </div>

            <button
                id={`todo-delete-${todo._id}`}
                className="todo-delete-btn"
                onClick={() => onDelete(todo._id)}
                aria-label={`Delete "${todo.description}"`}
                title="Delete task"
            >
                🗑
            </button>
        </div>
    );
}

export default TodoItem;
