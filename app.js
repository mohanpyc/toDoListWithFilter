const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
// this is a function to initialize all the functions
function loadEventListeners(){
    document.addEventListener("DOMContentLoaded",getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener("click",removeTask);
    clearBtn.addEventListener("click",clearLists);
    filter.addEventListener("keyup",filterList);
}

function getTasks(){
    let tasks;
    if( localStorage.getItem("tasks") === null ){
        tasks=[];
    }else{
        tasks= JSON.parse(localStorage.getItem("tasks"));
        
        console.log(tasks);
    }

    tasks.forEach(i=>{
        const li=document.createElement("li");
        li.className="collection-item";
    
        li.appendChild(document.createTextNode(i));
    
        const link = document.createElement('a');
    
        link.className='delete-item secondary-content';
    
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);        
    })
        
    
}

function filterList(e){
    document.querySelectorAll(".collection-item").forEach(i=>{
        if(i.textContent.includes(e.target.value)){
            i.style.display="block";
        }else{
            i.style.display='none';
        }
    })
}

function removeTask(e){
   let tasks=JSON.parse(localStorage.getItem("tasks"))
    if(e.target.parentElement.classList.contains("delete-item")){
        e.target.parentElement.parentElement.remove();
    }
    let removeIndex= tasks.indexOf(e.target.parentElement.parentElement.textContent);
    tasks.splice(removeIndex,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));    
}

function clearLists(){
    // document.querySelector(".collection").innerHTML="";
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.removeItem("tasks");
   
}

function addTask(e){
    let tasks=JSON.parse(localStorage.getItem("tasks"))!=null?JSON.parse(localStorage.getItem("tasks")):[];
    console.log(tasks);
    if(taskInput.value===""){
        alert("Add a task");
    }else if(tasks.indexOf(taskInput.value)!=-1){
        alert("exited value not alowed");
    }else{
    
    const li=document.createElement("li");
    li.className="collection-item";

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');

    link.className='delete-item secondary-content';

    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    storeInLocalStorage(taskInput.value);
    console.log("after calling function")
    taskInput.value="";
    }
    e.preventDefault();
}

function storeInLocalStorage(task){
    let tasks=[];
    if(localStorage.getItem('tasks')!=null){
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}