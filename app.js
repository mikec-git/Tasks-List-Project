// Define UI vars
const form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);    
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks(e){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e){
    e.preventDefault();    
    if(taskInput.value === ''){
        alert('Add a task');
    } else{        
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);

        // Store in local storage
        storeTaskInLocalStorage(taskInput.value);
        // Clear input
        taskInput.value = '';
    }
}

// Store tasks in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            
            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));    
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(){
    // taskList.innerHTML = '';
    if(taskList.hasChildNodes() && confirm('Are you sure?')){
        while(taskList.hasChildNodes()){
            taskList.removeChild(taskList.firstChild);
        }

        // Clear from local storage
        clearTasksFromLocalStorage();
    }
}

// Clear tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter tasks
function filterTasks(e){
    console.log(e.target.value);
    const search = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(search) !== -1 ){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    });
}