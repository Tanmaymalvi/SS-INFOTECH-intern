const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display saved tasks after refresh
tasks.forEach(task => createTask(task));

addBtn.addEventListener("click", addTask);

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(taskText) {

    const li = document.createElement("li");

    const task = document.createElement("span");
    task.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", function () {

        const index = tasks.indexOf(taskText);

        if(index > -1){
            tasks.splice(index, 1);
        }

        saveTasks();
        li.remove();
    });

    li.appendChild(task);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function addTask() {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please Enter a Task");
        return;
    }

    tasks.push(taskText);

    saveTasks();

    createTask(taskText);

    taskInput.value = "";
}