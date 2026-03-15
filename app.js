/**
 * Initialize application
 */

document.addEventListener("DOMContentLoaded", () => {

  renderTasks();

  document
    .getElementById("close-modal")
    .addEventListener("click", closeModal);

  document
    .getElementById("save-task")
    .addEventListener("click", saveTask);

});