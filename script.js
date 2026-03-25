const API = "http://localhost:3000/tasks";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from server
async function loadTasks(){
    const res = await fetch(API);
    const tasks = await res.json();

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add task
addBtn.addEventListener("click", async ()=>{
    const task = taskInput.value.trim();
    if(task==="") return;

    await fetch(API,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({task})
    });
    taskInput.value = "";
    loadTasks();
});

// Edit task
async function editTask(id){
    const newTask = prompt("Edit task");
    if(newTask===null || newTask.trim()==="") return;

    await fetch(`${API}/${id}`,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({task:newTask})
    });

    loadTasks();
}

// Delete task
async function deleteTask(id){
    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    loadTasks();
}

// Initial load
loadTasks();