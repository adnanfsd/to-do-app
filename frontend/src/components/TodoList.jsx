import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggle, onDelete, filter = 'all', hasTodos = false }) {
    if (!todos || todos.length === 0) {
        // when the full list contains items but the filtered list is empty,
        // show a message specific to the current filter
        if (hasTodos && filter !== 'all') {
            return (
                <div className="empty-state">
                    <span className="empty-icon">🔍</span>
                    <h3 className="empty-title">
                        No {filter} tasks
                    </h3>
                    <p className="empty-subtitle">
                        Try a different filter or add more tasks.
                    </p>
                </div>
            );
        }

        return (
            <div className="empty-state">
                <span className="empty-icon">📋</span>
                <h3 className="empty-title">No tasks yet</h3>
                <p className="empty-subtitle">Add your first task above to get started!</p>
            </div>
        );
    }

    return (
        <div className="todo-list-container">
            <div className="todo-list-header">
                <span className="todo-list-title">Your Tasks</span>
                <span className="todo-list-count">
                    {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
                </span>
            </div>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        index={index}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoList;
