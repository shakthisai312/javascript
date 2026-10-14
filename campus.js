let form = document.querySelector("#todo-form");
let input = document.querySelector("#task-input");
let taskList = document.querySelector("#task-list");
let message = document.querySelector("#message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let taskText = input.value.trim();

  if (taskText === "") {
    message.textContent = "Please type a task first.";
    input.focus();
    return;
  }

  message.textContent = "";

  let listItem = document.createElement("li");
  listItem.className = "task-item";

  let text = document.createElement("span");
  text.className = "task-text";
  text.textContent = taskText;

  let completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.textContent = "Complete";
  completeButton.setAttribute("aria-pressed", "false");
  completeButton.addEventListener("click", function () {
    let isComplete = listItem.classList.toggle("completed");
    completeButton.textContent = isComplete ? "Undo" : "Complete";
    completeButton.setAttribute("aria-pressed", String(isComplete));
  });

  let deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    listItem.remove();
  });

  listItem.append(text, completeButton, deleteButton);
  taskList.append(listItem);

  input.value = "";
  input.focus();
});

let clearAllButton = document.querySelector("#clear-all");

clearAllButton.addEventListener("click", function () {
  taskList.innerHTML = "";
  message.textContent = "All tasks cleared!";
});



