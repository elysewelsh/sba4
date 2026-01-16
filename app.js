// tasks array will either pull from storage or be empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
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
// get current date in user time zone
const currentDate = Date.parse(new Date());
const dateOffsetMS = ((new Date().getTimezoneOffset()) * 60000);
// format deadline to use in date comparison function
let dateElement = document.getElementById("deadline");   



// load tasks from localStorage immediately upon loading
displayArray(tasks);

// update format of date for use in date comparison function
// this doesn't seem necessary, but when I tried to do all this elsewhere, it broke, so...
dateElement.addEventListener("change", () => {
    const deadlineFormat = (Date.parse(dateElement.value));
    return deadlineFormat;
});

// when user submits task information using add task button:
//  properties are added to task object, 
// object is added to tasks array, 
// tasks array is sent to localStorage,
// and inputs are cleared
addTask_btn.addEventListener("click",() => {
    const task = {
        name : taskNameInput.value,
        category : categoryInput.value,
        deadline : deadlineInput.value,
        taskStatus : statusInput.value,
    };
    tasks.push(task);
    storeTasks ();
    displayArray(tasks);
    taskNameInput.value = "";
    categoryInput.value = "";
    deadlineInput.value = "";
    statusInput.value = "In Progress";
});

// This is the function to display an array.
// Either the tasks array or the filteredTasks list is passed as an argument.
// It adds a header row with all the task object property names as headers,
// then loops through the array and, for every object,:
// adds a list item to the unordered list in the HTML,
// assigns a task-item class to the list item,
// creates a span for each object property,
// inserts the property value into the span,
// appends each span/property to the list item,
// and then appends the list item to the ul (taskList in HMTL).
// In addition, this function houses the editBtn and its event listener.
// The editBtn is assigned a data-item-index based on the loop's increment and should match the taskItem index.
// The button is also appended to the list item and appears at the end of the "row".
// When the button is clicked, the user is prompted for an updated status.
// The data-item-index value is used to assign a new value to the appropriate array and index object's taskStatus property.
// The storeTasks function is run to store the new array's values in localStorage.
// The array is displayed with its new values.
function displayArray (array) {
taskList.innerHTML = "<h2>Tasks</h2>";
const taskHeader = document.createElement("li");
taskHeader.classList.add("table-header");
const taskHeaderName = document.createElement("span");
taskHeaderName.innerText = "Task Name";
taskHeader.appendChild(taskHeaderName);
const taskHeaderCategory = document.createElement("span");
taskHeaderCategory.innerText = "Category";
taskHeader.appendChild(taskHeaderCategory);
const taskHeaderStatus = document.createElement("span");
taskHeaderStatus.innerText = "Task Status";
taskHeader.appendChild(taskHeaderStatus);
const taskHeaderDeadline = document.createElement("span");
taskHeaderDeadline.innerText = "Deadline";
taskHeader.appendChild(taskHeaderDeadline);
const taskHeaderEdit = document.createElement("span");
taskHeaderEdit.innerText = "Edit";
taskHeader.appendChild(taskHeaderEdit);
taskList.appendChild(taskHeader);
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
            storeTasks();
            displayArray(array);
            });
        taskList.appendChild(taskItem);
    }
}

// This is the event listener for the category search button.
// It's the same logic as the Status search button, except that it passes category as the argument to the filterItems function.
// It passes the filteredTasks array as an argument to the displayArray function.
catSearch_btn.addEventListener("click",() => {
    filterItems("category",searchInput.value);
    displayArray(filteredTasks);
})

// This is the event listener for the status search button.
// It's the same logic as the Category search button, except that it passes status as the argument to the filterItems function.
// It passes the filteredTasks array as an argument to the displayArray function.
statSearch_btn.addEventListener("click",() => {
    filterItems("taskStatus",searchInput.value);
    displayArray(filteredTasks);
})

// This is the event listener for the button to clear the aforementioned filters.
// It includes logic to clear the search input and then passes the tasks array as an argument to the displayArray function.
clearFilter_btn.addEventListener("click",() => {
    searchInput.value = "";
    displayArray(tasks);
})

// This function filters the tasks array based on the task object property and the search term.
// It first clears the filteredTasks array,
// then compares the search term to values in the property passed as an argument.
// It collects the results of the comparison in an array called results, 
// and then pushes the results to the filteredTasks array.
function filterItems (property, searchTerm) {
    filteredTasks.length = 0;
    const results = tasks.filter(
        function (e) {
        return e[property].toLowerCase().includes(searchTerm.toLowerCase());
        }
    );
    filteredTasks.push(...results);
}

// This function automatically overwrites the taskStatus property within the appropriate task object based on a date comparison.
// This function is called every time the task list is displayed.
// The appropriate task is passed as an argument to ensure the changes are localized.
// The deadline variable is re-formatted to a comparable format.
// If the taskStatus is complete, the taskStatus cannot be re-written.
// (This avoids automatic updating back to "Overdue" when "Overdue" is updated to completed, 
// but prevents Overdue from being updated to any other status).
// If the status is not complete and the deadline is less than the current date,
// the status is updated to "Overdue". Otherwise, it remains the same.
function overwriteStatus(task) {
    const deadlineFormat = (Date.parse(task.deadline));
    // console.log("deadlineFormat: ", deadlineFormat);
    if ((task.taskStatus.toLowerCase()) === "completed") {
        return task.taskStatus
    }
    if (deadlineFormat < (currentDate - dateOffsetMS)) {
        task.taskStatus = "Overdue";
        return "Overdue";
        }
        else {
        return task.taskStatus
        }; 
};

// This function stores tasks in localStorage for later retrival.
function storeTasks () {
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

// DATETIME VARIABLE VISIBILITY
console.log("dateOffsetMS: ", dateOffsetMS);
console.log("currentDate: ", currentDate);
console.log("currentDate - dateOffsetMS: ", (currentDate - dateOffsetMS));
// deadlineFormat found within relevant function above.