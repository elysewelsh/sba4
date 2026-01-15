// put it in local storage
// css flex


const tasks = [];
const filteredTasks = [];
const taskNameInput = document.getElementById("taskName");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const statusInput = document.getElementById("status");
const taskList = document.getElementById("taskList");
const addTask_Btn = document.getElementById("addTask_btn");
const catSearch_btn = document.getElementById("catSearch_btn");
const statSearch_btn = document.getElementById("statSearch_btn");
const searchInput = document.getElementById("search");
const clearFilter_btn = document.getElementById("clear_btn");
const currentDate = Date.parse(new Date());

let dateElement = document.getElementById("deadline");   
dateElement.addEventListener("change", () => {
    const deadlineFormat = (Date.parse(dateElement.value));
    return deadlineFormat;
});

addTask_btn.addEventListener("click",() => {
    const task = {
        name : taskNameInput.value,
        category : categoryInput.value,
        deadline : deadlineInput.value,
        taskStatus : statusInput.value,
    };
    tasks.push(task);
    displayArray(tasks);
    taskNameInput.value = "";
    categoryInput.value = "";
    deadlineInput.value = "";
    statusInput.value = "In Progress";
});

function displayArray (array) {
taskList.innerHTML = "<h2>Tasks</h2>";
for(let i = 0; i < array.length; i++) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        const name = document.createElement("span");
        name.innerText = array[i].name;
        taskItem.appendChild(name);
        const category = document.createElement("span");
        category.innerText = array[i].category;
        taskItem.appendChild(category);
        const taskStatus = document.createElement("span");
        taskStatus.innerText = overwriteStatus(array[i]);
        taskItem.appendChild(taskStatus);
        const deadline = document.createElement("span");
        deadline.innerText =array[i].deadline;
        taskItem.appendChild(deadline);
        let editBtn = document.createElement("button");
        editBtn.innerText = "update status";
        taskItem.appendChild(editBtn);
        editBtn.classList.add("edit-btn");
        editBtn.setAttribute('data-item-index',i);
        editBtn.addEventListener("click", function () {
            let index = this.getAttribute('data-item-index');
            array[index].taskStatus = prompt("Updated Status: ");
            displayArray(array);
            });
        taskList.appendChild(taskItem);
    }
}

catSearch_btn.addEventListener("click",() => {
    filterItems("category",searchInput.value);
    displayArray(filteredTasks);
})

statSearch_btn.addEventListener("click",() => {
    filterItems("taskStatus",searchInput.value);
    displayArray(filteredTasks);
})

clearFilter_btn.addEventListener("click",() => {
    searchInput.value = "";
    displayArray(tasks);
})

function filterItems (property, searchTerm) {
    filteredTasks.length = 0;
    const results = tasks.filter(
        function (e) {
        return e[property].toLowerCase().includes(searchTerm.toLowerCase());
        }
    );
    filteredTasks.push(...results);
}

function overwriteStatus(task) {
    const deadlineFormat = (Date.parse(task.deadline));
    console.log(task.taskStatus, deadlineFormat,currentDate);
    if ((task.taskStatus.toLowerCase()) === "completed") {
        return task.taskStatus
    }
    if (deadlineFormat < currentDate) {
        task.taskStatus = "Overdue";
        return "Overdue";
        }
        else {
        return task.taskStatus
        };
};

