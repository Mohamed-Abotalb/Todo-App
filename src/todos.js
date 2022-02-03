import { v4 as uuidv4 } from 'uuid';

// Set up the empty todos array
let todos = [];

// fetch existing todo from localStorage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
}

// save todo to the localStorage
const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos));

const getTodos = () => todos;

// create new todo
const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text,
        completed: false
    });
    saveTodos()
}

// remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        saveTodos();
    }
}

// toggle the completed value for the given todo
const toggleTodo = function (id) {
    const toggled = todos.find((todo) => todo.id === id);
    if (toggled) {
        toggled.completed = !toggled.completed;
        saveTodos();
    }
}

loadTodos();

// call loadTodos and set up the exports
export { loadTodos ,getTodos, createTodo, removeTodo, toggleTodo };