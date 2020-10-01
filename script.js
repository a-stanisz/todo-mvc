class Model {
  constructor() {
    this.todos = [
      { id: 1, text: 'Fly to the Moon', complete: false },
      { id: 2, text: 'Tide up the room', complete: false },
    ];
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    };

    this.todos.push(todo);
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: updatedText, complete: todo.complete }
        : todo
    );
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
    );
  }
}

class View {
  constructor() {
    // The root element
    this.app = this.getElement('#root');

    // The App title
    this.title = this.createElement('h1');
    this.title.textContent = 'Todos';

    // The form with an input and a submit button
    this.form = this.createElement('form');
    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add TODO';
    this.input.name = 'todo';
    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    // The ul for visual representation of the TODO list
    this.todoList = this.createElement('ul', 'todo-list');

    // Append the input and the submit button to the form
    this.form.append(this.input, this.submitButton);

    // Append the title, form, and TODO list to the app
    this.app.append(this.title, this.form, this.todoList);
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = '';
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  displayTodos(todos) {
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Show default message
    if (todos.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'No tasks, maybe add some?';
      this.todoList.append(p);
    } else {
      // Create TODO item nodes for each todo in state
      todos.forEach((todo) => {
        const li = this.createElement('li');
        li.id = todo.id;

        // Each TODO item has a checkbox to toggle
        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;

        // Each TODO item is within a content-editable span
        const span = this.createElement('span');
        span.contentEditable = true;
        span.classList.add('editable');

        // Done TODO has a strikethrough
        if (todo.complete) {
          const strike = this.createElement('s');
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          // Not done TODO is just a normal text
          span.textContent = todo.text;
        }

        // Each TODO has a delete button
        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(checkbox, span, deleteButton);

        // Append above li nodes to the TODO list
        this.todoList.append(li);
      });
    }
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());
