// script.js

// Load initial tasks from global variable
const tasks = [...window.initialTasks];

let currentTaskId = null;

// Select columns
const todoColumn = document.getElementById('todo-column');
const doingColumn = document.getElementById('doing-column');
const doneColumn = document.getElementById('done-column');

const taskModal = document.getElementById('taskModal');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescInput = document.getElementById('taskDescription');
const taskStatusSelect = document.getElementById('taskStatus');

const closeModalBtn = document.getElementById('closeModal');
const saveBtn = document.getElementById('saveTask');
const addTaskBtn = document.getElementById('addTaskBtn');

// Render all tasks
function renderTasks() {
  // Clear columns
  [todoColumn, doingColumn, doneColumn].forEach(col => col.innerHTML = '');

  // Create task elements
  tasks.forEach(task => {
    const taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.dataset.id = task.id;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.title;

    const badge = document.createElement('span');
    badge.className = 'status-dot ' + task.status;
    titleSpan.appendChild(badge);

    taskEl.appendChild(titleSpan);

    taskEl.addEventListener('click', () => openModal(task.id));

    // Append to correct column
    if (task.status === 'todo') {
      todoColumn.appendChild(taskEl);
    } else if (task.status === 'doing') {
      doingColumn.appendChild(taskEl);
    } else if (task.status === 'done') {
      doneColumn.appendChild(taskEl);
    }
  });
}

// Open modal and populate data
function openModal(id) {
  currentTaskId = id;
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  taskTitleInput.value = task.title;
  taskDescInput.value = task.description;
  taskStatusSelect.value = task.status;
  taskModal.classList.remove('hidden');
}

// Close modal
function closeModal() {
  taskModal.classList.add('hidden');
}

// Save task changes
function saveTask() {
  const task = tasks.find(t => t.id === currentTaskId);
  if (!task) return;
  task.title = taskTitleInput.value;
  task.description = taskDescInput.value;
  task.status = taskStatusSelect.value;
  renderTasks();
  closeModal();
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = {
    id: newId,
    title: 'New Task',
    description: '',
    status: 'todo'
  };
  tasks.push(newTask);
  renderTasks();
  openModal(newId);
});

// Event listeners
document.getElementById('closeModal').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTask);

// Initial render
renderTasks();