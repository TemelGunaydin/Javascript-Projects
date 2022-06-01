const form = document.querySelector(".add");
const ul = document.querySelector(".todos");
const search = document.querySelector(".search input");

function generateTemplate(todo) {
  const htmlInput = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${todo}</span>
          <i class="far fa-trash-alt delete"></i>
      </li>
    `;
  ul.innerHTML += htmlInput;
}

//add todos
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = form.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    form.reset();
  }
});

//delete todos
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// Filtering Todos
const filterTodos = (term) => {
  Array.from(ul.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(ul.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
