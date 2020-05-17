const addBtn = document.getElementById("add");
const inputTask = document.getElementById( "task" );
const list = document.querySelector( "ul" );
let tasksList=[];
let completedList = false;
//======================================================================================================================
function AddTasks(text) {
    const listElement = document.createElement( "li" ); // creates an element "li"
    listElement.appendChild( document.createTextNode( text ) ); //makes text from input field the li text
    list.appendChild( listElement ); //adds li to ul
    inputTask.value = ""; //Reset text input field

    //ADD DELETE BUTTON
    if(!completedList)
    {
        const deleteBtn = document.createElement("button");
        deleteBtn.appendChild( document.createTextNode(`✘`));
        listElement.appendChild( deleteBtn );
        console.log(listElement.innerText);
        deleteBtn.addEventListener( "click", deleteTask );
        document.getElementById("error").hidden;
    }
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
}
//======================================================================================================================
function ShowCompleted() {
    resetwarning()
    list.innerHTML = '';
    console.log("outside")
    if(!completedList)
    {
        console.log("ok")
        completedList = true;
        for(const i of tasksList)
        {
            if(i.done)
            {
                AddTasks(i.task)
            }
        }
        document.getElementById("task_text_title_id").hidden = true
        document.getElementById("form_id").hidden = true
        document.getElementById("show").innerHTML= "Show UnCompleted Tasks";
    }
    else
    {
        console.log("ko")
        completedList = false;
        for(const i of tasksList)
        {
             if(!i.done)
            {
                AddTasks(i.task)
            }
        }
        document.getElementById("task_text_title_id").hidden = false
        document.getElementById("form_id").hidden = false
        document.getElementById("show").innerHTML= "Show Completed Tasks";
    }
}
//======================================================================================================================
//reset warning
function resetwarning()
{
    var warning_space = document.getElementById('space_warning')
    var warning_exsisting = document.getElementById('exsisting_warning')
    warning_space.hidden = true
    warning_exsisting.hidden = true
}


//======================================================================================================================

function checkInput(){
    var warning_space = document.getElementById('space_warning')
    var warning_exsisting = document.getElementById('exsisting_warning')
    if(inputTask.value == "" || /^\s*$/.test(inputTask.value)){
       // document.getElementById("error").innerHTML = "You can't add an empty task";
        warning_space.hidden = false
        inputTask.value = "";
    }
    else if(tasksList.length>0)
    {
        for(let i =0; i < tasksList.length; i++)
        {
            if(tasksList[i].task == inputTask.value)
            {
                if(tasksList[i].done == false)
                {
                    warning_exsisting.hidden = false
                    inputTask.value = "";
                    return;
                }
            }
        }
        tasksList.push( {task: inputTask.value.trim(), done: false});
        AddTasks(inputTask.value);
    }
    else
    {
        tasksList.push( {task: inputTask.value.trim(), done: false});
        AddTasks(inputTask.value);
    }
}
//======================================================================================================================

function addAfterClick(){
    resetwarning();
    checkInput();

}
//======================================================================================================================
function addAfterKeypress(event) {
    if (event.code ===13) {
        checkInput();
    }
}
//======================================================================================================================
addBtn.addEventListener("click",addAfterClick);
inputTask.addEventListener("keypress", addAfterKeypress);
