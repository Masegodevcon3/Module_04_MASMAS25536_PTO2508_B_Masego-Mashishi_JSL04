/**
 * Create a task card element
 * @param {Object} task - Task object
 * @returns {HTMLElement}
 */

function createTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("task-card");
  card.dataset.id = task.id;

  card.innerHTML = `
    <p>${task.title}</p>
  `;

  card.addEventListener("click", () => openModal(task));

  return card;
}


/**
 * Render all tasks in their correct columns
 */

function renderTasks() {

  const todoColumn = document.getElementById("todo-column");
  const doingColumn = document.getElementById("doing-column");
  const doneColumn = document.getElementById("done-column");

  todoColumn.innerHTML = "";
  doingColumn.innerHTML = "";
  doneColumn.innerHTML = "";

  tasks.forEach(task => {

    const card = createTaskCard(task);

    if (task.status === "todo") {
      todoColumn.appendChild(card);
    }

    if (task.status === "doing") {
      doingColumn.appendChild(card);
    }

    if (task.status === "done") {
      doneColumn.appendChild(card);
    }

  });

}