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
        taskStatus.innerText = array[i].taskStatus;
        taskItem.appendChild(taskStatus);
        const deadline = document.createElement("span");
        deadline.innerText = array[i].deadline;
        taskItem.appendChild(deadline);
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
        function (el) {
        return el[property].toLowerCase().includes(searchTerm.toLowerCase());
        }
    );
    filteredTasks.push(...results);
}

// let dateElement = document.getElementById("deadline");
// console.log(dateElement.value);

// dateElement.addEventListener("change", () => {
//     console.log(dateElement.value);
//     console.log(Date.parse(dateElement.value));
//     localStorage.setItem("deadline", Date.parse(dateElement.value));
//     console.log(localStorage);
// })

// console.log(localStorage.getItem("deadline"));

// if(Date.valueOf() < Date.valueOf()) {
//     console.log("Date one is LATER!")
// } else {
//     console.log("Date one is EARLIER!");
// }


