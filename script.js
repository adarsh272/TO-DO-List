//Selectors

const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
//Adding eventlistener to the entire ul rather than a specific btn for more flexibility
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('click', filterTodo);

//Functions

function addTodo(event){
    //prevent form from sunmitting
    event.preventDefault();
    //Create div for todo item
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');
    //Create li that will hold the todo item
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to local storage
    saveToStorage(todoInput.value);
    //Create Checked and Delete Button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    //Append todoDiv to document
    todoList.appendChild(todoDiv);
    //Clear Input Field
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === "trash-btn"){
        const to_do = item.parentElement;
        //Animation
        to_do.classList.add("fall");
        removeFromStorage(to_do)
        to_do.addEventListener('transitionend', function(){
            to_do.remove();
        });
       
    }
    //Checkmark todo
    if(item.classList[0] === "complete-btn"){
        const to_do = item.parentElement;
        to_do.classList.toggle("completed");
    }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;    
        }
    })
}

function saveToStorage(todo){
   let todos;
   if(localStorage.getItem("todos") === null){
       todos = [];
   } 
   else{
       todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } 
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        //Create li that will hold the todo item
        const newTodo = document.createElement('li');
        newTodo.textContent = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Create Checked and Delete Button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);
        //Append todoDiv to document
        todoList.appendChild(todoDiv);
    })

}

function removeFromStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } 
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

