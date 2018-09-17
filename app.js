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
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
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

        // Clear input
        taskInput.value = '';
    }
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear tasks
function clearTasks(e){
    // taskList.innerHTML = '';
    if(taskList.hasChildNodes() && confirm('Are you sure?')){
        while(taskList.hasChildNodes()){
            taskList.removeChild(taskList.firstChild);
        }
    }
}