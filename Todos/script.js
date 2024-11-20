const btnEl = document.querySelector('#btn');
const taskCardEl = document.querySelector('.todoCard');
const taskContainerEl = document.querySelector('#todoCards');
const delBtnEl = document.querySelector('.delBtn');
const countEl = document.querySelector('#count');

const addTask = () => {
    const newTask = taskCardEl.cloneNode(true); // Clone taskCardEl
    const newTextArea = newTask.querySelector('.task'); // Select the text area of the new card
    const newDelBtnEl = newTask.querySelector('.delBtn'); // Select the new del btn

    newTextArea.value = "New Task"; // Set a new value to the text area
    newDelBtnEl.addEventListener('click', function() {
        deleteTask(newTask); // Delete the new task on click
        updateCount(-1); // -1 to counter when deleting new task
    });

    taskContainerEl.appendChild(newTask); // Add a new Task in the container
    updateCount(1); // +1 to counter when adding a task
}

btnEl.addEventListener('click', addTask); // Listener for the add btn

const deleteTask = (task) => {
    task.remove(); // when called, remove "task" from the html
}

delBtnEl.addEventListener('click', function() { // When clicking on the original del btn
    deleteTask(taskCardEl); // Delete the card
    updateCount(-1); // -1 to counter
});

let count = 1; // Set up the default number
countEl.textContent = count; // Set the default number as content of #count

const updateCount = (x) => { // Function to update counter
    count += x; // Add x to the count
    countEl.textContent = count; // update HTML content
};