// function addTask() {
//     const taskInput = document.getElementById('taskInput');
//     const taskText = taskInput.value.trim();

//     if (taskText === '') {
//         alert('Please enter a task');
//         return;
//     }

//     const taskList = document.getElementById('taskList');
//     const listItem = document.createElement('li');

//     // Task text span
//     const taskSpan = document.createElement('span');
//     taskSpan.textContent = taskText;

//     // Complete button
//     const completeButton = document.createElement('button');
//     completeButton.innerHTML = '✔'; // Green checkmark icon
//     completeButton.onclick = () => {
//         taskSpan.classList.toggle('completed');
//     };

//     // Remove button
//     const removeButton = document.createElement('button');
//     removeButton.textContent = 'Remove';
//     removeButton.className = 'remove-btn';
//     removeButton.onclick = () => {
//         taskList.removeChild(listItem);
//     };

//     // Append everything
//     listItem.appendChild(completeButton);
//     listItem.appendChild(taskSpan);
//     listItem.appendChild(removeButton);

//     taskList.appendChild(listItem);

//     taskInput.value = ''; // Clear input field
// }

// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskInput = document.getElementById('taskinput');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from localStorage when page loads
    loadTasks();
    
    // Add task when button is clicked or Enter is pressed
    document.querySelector('button').addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Create new task item
        const li = document.createElement('li');
        
        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Create complete button
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '✓';
        completeBtn.addEventListener('click', function() {
            taskSpan.classList.toggle('completed');
            saveTasks();
        });
        
        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
        
        // Append elements to li
        li.appendChild(completeBtn);
        li.appendChild(taskSpan);
        li.appendChild(removeBtn);
        
        // Add to task list
        taskList.appendChild(li);
        
        // Clear input
        taskInput.value = '';
        
        // Save tasks to localStorage
        saveTasks();
    }
    
    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(function(taskItem) {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.querySelector('span').classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (!savedTasks) return;
        
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(function(task) {
            // Create new task item
            const li = document.createElement('li');
            
            // Create task text span
            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            if (task.completed) {
                taskSpan.classList.add('completed');
            }
            
            // Create complete button
            const completeBtn = document.createElement('button');
            completeBtn.innerHTML = '✓';
            completeBtn.addEventListener('click', function() {
                taskSpan.classList.toggle('completed');
                saveTasks();
            });
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.addEventListener('click', function() {
                li.remove();
                saveTasks();
            });
            
            // Append elements to li
            li.appendChild(completeBtn);
            li.appendChild(taskSpan);
            li.appendChild(removeBtn);
            
            // Add to task list
            taskList.appendChild(li);
        });
    }
});