

function add() {
    let NewNote = document.createElement( "span" );
    NewNote.classList.add("notesClass");
    let note = document.getElementById( "newNote" ).value;
    let date = document.getElementById( "date" ).value;

    if (note === "" || date === "") {
        window.alert("Enter A full Task")
    } else {
        NewNote.innerHTML = "<br>" + note + "<br>" + date;
        document.body.appendChild(NewNote);
        document.getElementById( "newNote" ).value = "";
        document.getElementById( "date" ).value = "";
    }
}


function deleteTask() {
}


window.onload=function () {
    document.querySelector('#add').addEventListener('click',add);
    document.querySelector('#delete').addEventListener('click', deleteTask);
}

