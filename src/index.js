// Add necessary imports
import { renderTodos } from './views';
import { setFilters } from './filters';
import { createTodo, loadTodos } from './todos';

// Render initial todos
renderTodos();

// Set up search text handler
const searchInput = document.querySelector('#search-text');
searchInput.addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos();
});

// Set up form submission handler
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const todoText = e.target.elements.text.value.trim();
    e.preventDefault();
    if (todoText) {
        createTodo(todoText);
        renderTodos();
        e.target.elements.text.value = '';
    }
}); 

// Set up checkbox handler
const hide = document.querySelector('#hide-completed');
hide.addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos();
});

// Add a watcher for local storage
window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos();
        renderTodos();
    }
})