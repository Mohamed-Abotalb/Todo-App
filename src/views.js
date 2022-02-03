import { getTodos, toggleTodo, removeTodo } from './todos';
import { getFilters } from './filters';

// render application todo based on filters
const renderTodos = () => {
    const todosElement = document.querySelector('#todos');
    const filters = getFilters();
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    });

    // filter the incomplete todos
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
    todosElement.innerHTML = '';
    
    // create new h2 element and append to the body element
    const summeryHTwo = generateSummeryDOM(incompleteTodos);
    todosElement.appendChild(summeryHTwo);

    if(filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todosElement.appendChild(generateTodoDOM(todo));
        });
    } else {
        const msgElement = document.createElement('p');
        msgElement.classList.add('empty-message');
        msgElement.textContent = 'No to-dos to show';
        todosElement.appendChild(msgElement);
    }
}

// get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('label');
    const containerElement = document.createElement('div');
    
    // setup the checkbox button
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.checked = todos.completed;
    containerElement.appendChild(check);
    check.addEventListener('change', () => {
        toggleTodo(todo.id);
        renderTodos();
    });
    
    // setup the todo text
    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    containerElement.appendChild(todoText);

    // setup the container
    todoElement.classList.add('list-item');
    containerElement.classList.add('list-item__container');
    todoElement.appendChild(containerElement);

    // setup the remove todo button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    removeBtn.classList.add('btn', 'btn--text');
    todoElement.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        removeTodo(todo.id);      
        renderTodos();
    });
    return todoElement;
}

// get the DOM elements for list summery
const generateSummeryDOM = (incompleteTodos) => {
    const summery = document.createElement('h2');
    const plural = incompleteTodos.length === 1 ? '' : 's';
    summery.classList.add('list-title');
    summery.textContent = `You have ${incompleteTodos.length} todo${plural} left`;

    return summery;
}

// set up the exports
export { generateSummeryDOM, generateTodoDOM, renderTodos };