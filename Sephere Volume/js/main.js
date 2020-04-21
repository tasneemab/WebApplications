//------------------------------------------------------------
//all the variables
const calcBtn = document.getElementById('calculate');
const clearBtn = document.getElementById('clear');
const autoDrawBtn = document.getElementById('autoDraw');
const inputRaduis = document.getElementById('raduis');
var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var width = c.width;
var height = c.height;

//------------------------------------------------------------
//function to calculate the volume
function calculateVolume() {
    var volume;
    var radius = inputRaduis.value;

    radius = Math.abs(radius);
    volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    volume = volume.toFixed(4);
    document.getElementById('volume').innerHTML = volume;
    drawCircle(radius);
}

//--------------------------------------------------------------
//function to draw the circle
function drawCircle(r) {

    if (r > width/2) {
        alert("You can't get your sphere drawn!, The raduis is too big !")
    } else {
        ctx.beginPath();
        ctx.arc(200, 200, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

//------------------------------------------------------------
//funtion to clear the canvas
function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
}

//------------------------------------------------------------
//function to check if the input is okay !
function checkInput() {
    if (!(isNaN(inputRaduis.value)) && inputRaduis.value != '' && !(/^\s*$/.test(inputRaduis.value))) {
        calculateVolume();
        inputRaduis.value = "";
    }
    else {
        alert('You must enter a number only !')
        inputRaduis.value = "";
    }
}

//------------------------------------------------------------
//function that draw the circles automaticly.
function automaticDraw() {
    var rad=0;
    var id = setInterval(temp,100);
    function temp() {
        
        if(rad*10> width/2)
        {
            
        clearInterval(id); 
        return; 
        }
        else{
            drawCircle(rad*10);
            (rad++);
        }
    }
}

//------------------------------------------------------------
//function to calculate the raduis after clicking the button
function addAfterClick() {
    checkInput();
}

//------------------------------------------------------------
//function to calculate the raduis after pressing ENTER
function addAfterKeypress(event) {
    if (event.code === 13) {
        checkInput();
    }
}
//------------------------------------------------------------
//All the event listener
clearBtn.addEventListener('click', clearCanvas);
calcBtn.addEventListener('click', addAfterClick);
autoDrawBtn.addEventListener('click', automaticDraw);
inputRaduis.addEventListener('keypress', addAfterKeypress);
