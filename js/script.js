// Initial sample data
const tasks = [
  { id: 1, title: "Design Homepage", description: "Create initial designs", status: "To Do" },
  { id: 2, title: "Develop API", description: "Build REST API", status: "In Progress" },
  { id: 3, title: "Test Application", description: "Test all features", status: "Done" },
];

let currentTaskId = null; // Track task being edited

// Select DOM elements
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

    // Task title and badge
    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.title;

    const badge = document.createElement('span');
    badge.className = 'status-dot ' + task.status.replace(' ', '').toLowerCase();

    // Append badge to title
    titleSpan.appendChild(badge);

    // Append title to task
    taskEl.appendChild(titleSpan);

    // Add click event to open modal
    taskEl.addEventListener('click', () => openModal(task.id));

    // Append to correct column
    if (task.status === 'To Do') {
      todoColumn.appendChild(taskEl);
    } else if (task.status === 'In Progress') {
      doingColumn.appendChild(taskEl);
    } else if (task.status === 'Done') {
      doneColumn.appendChild(taskEl);
    }
  });
}

// Open modal and populate with task data
function openModal(id) {
  currentTaskId = id;
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  taskTitleInput.value = task.title;
  taskDescription.value = task.description;
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

  // Update task data
  task.title = taskTitleInput.value;
  task.description = taskDescription.value;
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
    status: 'To Do'
  };
  tasks.push(newTask);
  renderTasks();
  openModal(newId);
});

// Event listeners for modal
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTask);

// Close modal when clicking outside content
taskModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

// Initial render
renderTasks();