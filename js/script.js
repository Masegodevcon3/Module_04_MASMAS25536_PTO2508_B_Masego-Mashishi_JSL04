// Load initial tasks
console.log('Initial tasks:', window.initialTasks);
const tasks = [...window.initialTasks];

console.log('Tasks array:', tasks);

const todoColumn = document.getElementById('todo-column');
const doingColumn = document.getElementById('doing-column');
const doneColumn = document.getElementById('done-column');

function renderTasks() {
  console.log('Rendering tasks...');
  [todoColumn, doingColumn, doneColumn].forEach(col => col.innerHTML = '');
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
    taskEl.addEventListener('click', () => console.log('Clicked task', task.id));

    if (task.status === 'todo') {
      todoColumn.appendChild(taskEl);
    } else if (task.status === 'doing') {
      doingColumn.appendChild(taskEl);
    } else if (task.status === 'done') {
      doneColumn.appendChild(taskEl);
    }
  });
}

renderTasks();