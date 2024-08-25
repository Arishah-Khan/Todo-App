var addTaskBtn = document.getElementById('addTaskBtn');
var deleteAllBtn = document.getElementById('deleteAllBtn');
var taskInput = document.getElementById('taskInput');
var tasksList = document.getElementById('tasks');

function addTask() {
    if (taskInput.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please enter a task!',
        });
    } else {
        var listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.innerHTML = `
            ${taskInput.value}
            <div>
                <button class="btn btn-danger btn-sm deleteBtn">
                    <i class="fa-solid fa-trash-can fa-lg"></i>
                </button>
                <button class="btn btn-warning btn-sm editBtn">
                    <i class="fa-solid fa-pencil-alt fa-lg"></i>
                </button>
            </div>
        `;

        tasksList.appendChild(listElement);
        listElement.classList.add('animate__animated', 'animate__fadeInDown');
        taskInput.value = '';

        var deleteButton = listElement.querySelector('.deleteBtn');
        deleteButton.onclick = function() {
            listElement.classList.add('animate__animated', 'animate__fadeOutTopRight');
            listElement.onanimationend = function() {
                listElement.remove();
                if (tasksList.children.length === 0) {
                    deleteAllBtn.style.display = 'none';
                }
            };
        };


        var editButton = listElement.querySelector('.editBtn');
        editButton.onclick = function() {
            taskInput.value = listElement.childNodes[0].textContent.trim();
            addTaskBtn.innerText = "Update Task";
            addTaskBtn.onclick = function() {
                if (taskInput.value !== '') {
                    listElement.childNodes[0].textContent = taskInput.value;
                    taskInput.value = '';
                    addTaskBtn.innerText = "Add Task";
                    addTaskBtn.onclick = addTask;
                }
            };
        };

        if (tasksList.children.length > 0) {
            deleteAllBtn.style.display = 'block';
        }
    }
}

function deleteAllTasks() {
    tasksList.innerHTML = '';
    deleteAllBtn.style.display = 'none';
}


addTaskBtn.onclick = addTask;
deleteAllBtn.onclick = deleteAllTasks;
