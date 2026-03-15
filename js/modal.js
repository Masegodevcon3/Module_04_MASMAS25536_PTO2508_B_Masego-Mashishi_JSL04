/**
 * Opens modal and fills task data
 * @param {Object} task
 */

function openModal(task) {

  const modal = document.getElementById("task-modal");

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  modal.dataset.id = task.id;

  modal.style.display = "flex";
}


/**
 * Close modal
 */

function closeModal() {
  document.getElementById("task-modal").style.display = "none";
}


/**
 * Save task changes
 */

function saveTask() {

  const modal = document.getElementById("task-modal");
  const taskId = modal.dataset.id;

  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const status = document.getElementById("task-status").value;

  const task = tasks.find(t => t.id == taskId);

  task.title = title;
  task.description = description;
  task.status = status;

  renderTasks();
  closeModal();
}