/*==========Global variables==========*/
const form = document.getElementById("form");
const input = document.getElementById("input-todo");
const todos = document.getElementById("todos");
const buttonCompleteAll = document.getElementById("complete-all-btn");
const footer = document.getElementById("footer");
const buttonFilterAll = document.getElementById("filter-all");
const buttonFilterActive = document.getElementById("filter-active");
const buttonFilterCompleted = document.getElementById("filter-completed");
const todosRemaining = document.getElementById("todos-remaining");
const buttonClearCompleted = document.getElementById("clear-completed");

/*==========Functions==========*/
// Add todo
function addTodo(){
    //Create listelement
    const listElement = document.createElement("li");

    //Create container for todos and delete and checkbox
    const container = document.createElement("div");

    //Create checkbox for mark as complete
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox")
    checkbox.addEventListener("click", () => {
        listElement.classList.toggle("completed");
        updateTodo();
    })

    //Create input for input value
    const inputTodo = document.createElement("input");
    inputTodo.setAttribute("type", "text");
    inputTodo.value = input.value;
    inputTodo.disabled = true;

    //Create delete button
    const buttonDelete = document.createElement("button")
    buttonDelete.type = "button";
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-times", "fa-2x");
    buttonDelete.appendChild(deleteIcon);
    //Delete button event
    buttonDelete.addEventListener("click", () => {
        listElement.remove();
    })


    //Append all previous objects to listelement
    container.appendChild(checkbox);
    container.appendChild(inputTodo);
    container.appendChild(buttonDelete);

    //Apend to list of todos
    listElement.appendChild(container);
    todos.appendChild(listElement);

    updateTodo();
}

// Update todo list
function updateTodo() {
    //Get all list elements from unordered list
    const listElements = document.querySelectorAll("li");

    //How many of the list elements has the class completed
    // let count = 0;
    // listElements.forEach(element => {
    //     if(!element.classList.contains("completed")){
    //         count++;
    //     }
    // })
    const completedElements = document.querySelectorAll(".completed").length;
    const count = listElements.length - completedElements.length;

    //Update todos remaining
    todosRemaining.textContent = `${count} item${count > 1 ? "s" : ""} left`

    //If there is any todo, remove hidden class from footer
    if(listElements.length > 0) {
        footer.classList.remove("hidden");
    }

    //If there is a completed todo, remove hidden from clear-completed
    if(completedElements.length > 0) {
        buttonClearCompleted.classList.remove("hidden");
    }


    //Checks the checkbox if it is completed
    listElements.forEach(element => {
        if(element.classList.contains("completed")){
            //called first child of first child which should be checkbox
            element.children[0].children[0].checked = true;
        } else {
            element.children[0].children[0].checked = false;
        }
    })
}

// Toggle all todos as completed
function toggleAllTodos() {
    //Get all list elements from unordered list
    const listElements = document.querySelectorAll("li");
    const countCompletedElements = document.querySelectorAll(".completed").length;

    //if all elements is not completed
    //Add class completed on all
    if (listElements.length === countCompletedElements) {
        listElements.forEach((element) => {
            if(element.classList.contains("completed")){
                element.classList.remove("completed");
            }
        })
    } else {
        listElements.forEach((element) => {
        if(!element.classList.contains("completed")){
            element.classList.add("completed");
        }
    })

    }

    //else remove all completed

    updateTodo();
}

// Toggle completed

// Remove filter

// Filter by active

// Filter by completed

// Clear all marked as completed

/*==========Event handlers==========*/
// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

buttonCompleteAll.addEventListener("click", toggleAllTodos)