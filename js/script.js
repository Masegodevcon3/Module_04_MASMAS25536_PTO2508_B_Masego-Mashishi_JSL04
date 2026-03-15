const tasks = [
  { id: 1, title: "Design Homepage", description: "Create initial designs", status: "To Do" },
  { id: 2, title: "Develop API", description: "Build REST API", status: "In Progress" },
  { id: 3, title: "Test Application", description: "Test all features", status: "Done" },
];

let currentTaskId = null;

// DOM Elements
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

// Render Tasks
function renderTasks() {
  [todoColumn, doingColumn, doneColumn].forEach(col => col.innerHTML = '');
  tasks.forEach(task => {
    const taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.dataset.id = task.id;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.title;

    const badge = document.createElement('span');
    badge.className = 'status-dot ' + task.status.replace(' ', '').toLowerCase();

    titleSpan.appendChild(badge);
    taskEl.appendChild(titleSpan);

    taskEl.addEventListener('click', () => openModal(task.id));

    if (task.status === 'To Do') {
      todoColumn.appendChild(taskEl);
    } else if (task.status === 'In Progress') {
      doingColumn.appendChild(taskEl);
    } else if (task.status === 'Done') {
      doneColumn.appendChild(taskEl);
    }
  });
}

function openModal(id) {
  currentTaskId = id;
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  taskTitleInput.value = task.title;
  taskDescInput.value = task.description;
  taskStatusSelect.value = task.status;
  taskModal.classList.remove('hidden');
}

function closeModal() {
  taskModal.classList.add('hidden');
}

function saveTask() {
  const task = tasks.find(t => t.id === currentTaskId);
  if (!task) return;

  task.title = taskTitleInput.value;
  task.description = taskDescInput.value;
  task.status = taskStatusSelect.value;

  renderTasks();
  closeModal();
}

addTaskBtn.addEventListener('click', () => {
  const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = {
    id: newId,
    title: 'New Task',
    description: '',
    status: 'To Do'
  };
  tasks.push(newTask);
  renderTasks();
  openModal(newId);
});

closeModalBtn.addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTask);

// Initial render
renderTasks();