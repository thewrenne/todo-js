const todos = [
  {
    id: crypto.randomUUID(),
    title: "To-Do 1",
    description: "description",
    deleted: false,
    expanded: false,
    selected: false
  },
  {
    id: crypto.randomUUID(),
    title: "To-Do 2",
    description: "description",
    deleted: false,
    expanded: false,
    selected: false
  }
];

const form = document.querySelector("#todo-form");
const titleInput = document.querySelector("#todo-title-input");
const descriptionInput = document.querySelector("#todo-description-input");
const listElement = document.querySelector("#todo-list");

function renderTodos() {
  listElement.innerHTML = "";

  for (const todo of todos) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    if (todo.deleted) {
      listItem.classList.add("deleted");
    }

    const row = document.createElement("div");
    row.className = "todo-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.selected;
    checkbox.setAttribute("aria-label", `select ${todo.title}`);
    checkbox.addEventListener("change", () => {
      todo.selected = checkbox.checked;
    });

    const title = document.createElement("p");
    title.className = "todo-title";
    title.textContent = todo.title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "todo-delete";
    deleteButton.textContent = "Delete";

    row.addEventListener("click", () => {
      todo.expanded = !todo.expanded;
      renderTodos();
    });

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTodo(todo.id);
    });
    checkbox.addEventListener("click", (event) => event.stopPropagation());

    row.append(checkbox, title, deleteButton);
    listItem.appendChild(row);

    if (todo.expanded && todo.description.trim() !== "") {
      const description = document.createElement("p");
      description.className = "todo-description";
      description.textContent = todo.description;
      listItem.appendChild(description);
    }

    listElement.appendChild(listItem);
  }
}

function deleteTodo(todoId) {
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    return;
  }

  const [todo] = todos.splice(index, 1);
  todo.deleted = true;
  todo.expanded = false;
  todos.push(todo);
  renderTodos();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  if (!title) {
    return;
  }

  const description = descriptionInput.value.trim();
  todos.push({
    id: crypto.randomUUID(),
    title,
    description,
    deleted: false,
    expanded: false,
    selected: false
  });

  form.reset();
  renderTodos();
});

renderTodos();
