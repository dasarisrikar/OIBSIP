const toggleBtn = document.getElementById('toggleForm');
const form = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDesc = document.getElementById('taskDesc');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');

toggleBtn.addEventListener('click', () => {
  form.classList.toggle('hidden');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  if (!title || !desc) return;

  const task = createTaskElement(title, desc, new Date(), false);
  pendingList.appendChild(task);
  form.reset();
  form.classList.add('hidden');
});

function createTaskElement(title, desc, date, isCompleted) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  if (isCompleted) taskDiv.classList.add('completed');

  const h3 = document.createElement('h3');
  h3.textContent = title;

  const p = document.createElement('p');
  p.textContent = desc;
  p.className = 'desc';

  const small = document.createElement('small');
  small.textContent = `Added: ${date.toLocaleString()}`;

  const btns = document.createElement('div');
  btns.classList.add('task-buttons');

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delete');
  delBtn.onclick = () => taskDiv.remove();
  btns.appendChild(delBtn);

  if (!isCompleted) {
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete');
    completeBtn.onclick = () => {
      const completedTask = createTaskElement(title, desc, new Date(), true);
      completedList.appendChild(completedTask);
      taskDiv.remove();
    };
    btns.appendChild(completeBtn);
  }

  if (desc.length > 80 || desc.includes('\n')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Show More';
    toggleBtn.classList.add('toggle');
    toggleBtn.onclick = () => {
      const isFull = taskDiv.classList.toggle('show-full');
      toggleBtn.textContent = isFull ? 'Show Less' : 'Show More';
    };
    btns.appendChild(toggleBtn);
  }

  taskDiv.appendChild(h3);
  taskDiv.appendChild(p);
  taskDiv.appendChild(small);
  taskDiv.appendChild(btns);

  return taskDiv;
}
