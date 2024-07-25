// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    // Function to create a task element
    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.className = isCompleted ? 'completed' : '';
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit-button">Edit</button>
                <button>Delete</button>
                ${!isCompleted ? '<button class="complete-button">Complete</button>' : ''}
            </div>
        `;
        return li;
    }

    // Add new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        const taskElement = createTaskElement(taskText);
        pendingTasksList.appendChild(taskElement);
        taskInput.value = '';
        saveTasks();
    }

    // Mark task as complete
    function completeTask(e) {
        if (e.target.classList.contains('complete-button')) {
            const taskElement = e.target.closest('li');
            taskElement.classList.add('completed');
            taskElement.querySelector('.complete-button').remove();
            completedTasksList.appendChild(taskElement);
            saveTasks();
        }
    }

    // Edit task
    function editTask(e) {
        if (e.target.classList.contains('edit-button')) {
            const taskElement = e.target.closest('li');
            const taskText = prompt('Edit task:', taskElement.querySelector('span').textContent);
            if (taskText !== null) {
                taskElement.querySelector('span').textContent = taskText;
                saveTasks();
            }
        }
    }

    // Delete task
    function deleteTask(e) {
        if (e.target.textContent === 'Delete') {
            e.target.closest('li').remove();
            saveTasks();
        }
    }

    // Save tasks to local storage
    function saveTasks() {
        const pendingTasks = Array.from(pendingTasksList.children).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        }));
        const completedTasks = Array.from(completedTasksList.children).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify({ pendingTasks, completedTasks }));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.pendingTasks.forEach(task => {
                const taskElement = createTaskElement(task.text, task.completed);
                if (task.completed) {
                    completedTasksList.appendChild(taskElement);
                } else {
                    pendingTasksList.appendChild(taskElement);
                }
            });
        }
    }

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    pendingTasksList.addEventListener('click', completeTask);
    pendingTasksList.addEventListener('click', editTask);
    pendingTasksList.addEventListener('click', deleteTask);
    completedTasksList.addEventListener('click', deleteTask);

    loadTasks();
});
