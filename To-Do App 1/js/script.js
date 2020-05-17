const inputTask = document.getElementById( "task" );
const list = document.querySelector( "ul" );
const taskDate = document.querySelector( "#date" );
const taskTime = document.querySelector( "#time" );

let tasksList=[];
let completedList = false;
function getStorage() {
    if (!checkStorage()) {
        let temp = [];
        let item = JSON.parse(localStorage.getItem('todoList'));
        return item;
    }

}

function checkStorage() {
    return localStorage.getItem("todoList") === null;

}

function updateStorage(list) {
    let temp = []; //contains all the completed todos.
    localStorage.setItem('todoList', JSON.stringify(list));
}
if (!checkStorage()) {
    tasksList = getStorage();
    for (const it of tasksList) {
        if(it.done == false){
            AddTasks(it.task, it.Date, it.Time);
        }
    }
}
//======================================================================================================================
function AddTasks(task, date, time) {

    const listElement = document.createElement( "li" ); // creates an element "li"
    listElement.appendChild(document.createElement("br"));
    if(!completedList)
    {
        const deleteBtn = document.createElement("button")
        deleteBtn.appendChild( document.createTextNode(`✘`))
        listElement.appendChild( deleteBtn )
        deleteBtn.addEventListener( "click", deleteTask )
        document.getElementById("error").hidden

    }

    listElement.appendChild(document.createElement("br"))
    listElement.appendChild(document.createTextNode(task))
    listElement.appendChild(document.createElement("br"))
    listElement.appendChild(document.createElement("br"))
    listElement.appendChild(document.createTextNode(date))
    listElement.appendChild(document.createElement("br"))
    listElement.appendChild(document.createTextNode(time))
    list.appendChild( listElement ); //adds li to ul
    updateStorage(tasksList);
    inputTask.value = ""; //Reset text input field
    taskDate.value = "";
    taskTime.value = "";



//======================================================================================================================
    //ADD CLASS DELETE (DISPLAY: NONE)
    function deleteTask() {
        for (let i = 0; i < tasksList.length; i++) {
            if(listElement.innerText.indexOf(tasksList[i].task) != -1){
                tasksList[i].done = true;
            }
        }
        listElement.classList.add( "hide" );
    }
    updateStorage(tasksList);
}
//======================================================================================================================
function ShowCompleted() {
    resetwarning()
    list.innerHTML = '';
    if(!completedList)
    {
        completedList = true;
        for(const i of tasksList)
        {
            if(i.done)
            {
                AddTasks(i.task, i.Date, i.Time)
            }
        }
        document.getElementById("form_id").hidden = true;
        document.getElementById("add").hidden = true;
        document.getElementById("clear").hidden = true;
        document.getElementById("clearr").hidden = true;
        document.getElementById("show").innerHTML= "Show UnCompleted Tasks"
    }
    else
    {
        completedList = false;
        for(const i of tasksList)
        {
             if(!i.done)
            {
                AddTasks(i.task, i.Date, i.Time)
            }

        }
        document.getElementById("form_id").hidden = false;
        document.getElementById("add").hidden = false;
        document.getElementById("clear").hidden = false;
        document.getElementById("clearr").hidden = false;
        document.getElementById("show").innerHTML= "Show Deleted Tasks"
    }
}
//======================================================================================================================
//reset warning
function resetwarning()
{
    let warning_space = document.getElementById( 'space_warning' );
    let warning_exsisting = document.getElementById( 'existing_warning' );
    warning_space.hidden = true;
    warning_exsisting.hidden = true;
}


//======================================================================================================================

function checkInput(){
    let warning_space = document.getElementById('space_warning');
    let warning_exsisting = document.getElementById('existing_warning');
    if( taskDate.value =="" || inputTask.value == "" || /^\s*$/.test(inputTask.value)){
        warning_space.hidden = false
        inputTask.value = "";
        taskDate.value = "";
    }
    else if(tasksList.length>0)
    {
        for(let i =0; i < tasksList.length; i++)
        {
            if(tasksList[i].task == inputTask.value.trim())
            {
                if(tasksList[i].done == false)
                {
                    warning_exsisting.hidden = false;
                    inputTask.value = "";
                    return;
                }
            }
        }
        tasksList.push( {task: inputTask.value.trim(), done: false, Date:taskDate.value, Time:taskTime.value});
        AddTasks(inputTask.value, taskDate.value, taskTime.value)
    }
    else
    {
        tasksList.push( {task: inputTask.value.trim(), done: false, Date:taskDate.value, Time:taskTime.value});
        AddTasks(inputTask.value, taskDate.value, taskTime.value)
    }
}

//======================================================================================================================
function clearStorage() {
    localStorage.clear();
}
//======================================================================================================================

function addAfterClick(){
    resetwarning();
    checkInput();
    updateStorage(tasksList);

}
//======================================================================================================================
function addAfterKeypress(event) {
    if (event.code ===13) {
        checkInput();
        updateStorage(tasksList);
    }
}
//======================================================================================================================
function clearInput() {
    inputTask.value = ""; //Reset text input field
    taskDate.value = "";
    taskTime.value = "";
}
//======================================================================================================================
    document.querySelector("#add").addEventListener("click", addAfterClick)
    document.querySelector("#add").addEventListener("keypress", addAfterKeypress)
    document.querySelector("#show").addEventListener("click", ShowCompleted)
    document.querySelector("#clear").addEventListener("click", clearStorage)
    document.querySelector("#clearr").addEventListener("click", clearInput)
