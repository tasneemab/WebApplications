function showMore(colName, colData, btn) {
    let i,j, x,y;

    x = document.getElementsByClassName("containerTab");
    y = document.getElementsByClassName("col-xs-4 col-md-4");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (j = 0; j < y.length; j++) {
        y[j].style.display = "none";
    }
    document.getElementById(colData).style.display = "block";
    document.getElementById(colName).style.display = "block";
    document.getElementById(colName).style.minWidth ="100%";
    document.getElementById(colData).style.minWidth ="100%";

    document.getElementById(btn).style.visibility = "hidden";
}
function showLess(colName, colData, btn) {
    let i,j, x,y;

    x = document.getElementsByClassName("containerTab");
    y = document.getElementsByClassName("col-xs-4 col-md-4");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (j = 0; j < y.length; j++) {
        y[j].style.display = "block";
    }
    document.getElementById(btn).style.visibility = "visible";
    document.getElementById(colName).style.minWidth ="unset";
    document.getElementById(colData).style.minWidth ="unset";
}