var currentTab = 0;
var currentTab2 = 0;
var currentTab3 = 0;
var currentTab4 = 0;
document.addEventListener("DOMContentLoaded", function(event) {
    showTab(currentTab, "tab", "prevBtn", "nextBtn","step" );
    showTab(currentTab2, "tab2", "prevBtn2", "nextBtn2","step-2" );
    showTab(currentTab3, "tab3", "prevBtn3", "nextBtn3","step-3" );
    showTab(currentTab4, "tab4", "prevBtn4", "nextBtn4","step-4" );
});

function showTab(n, tab, buttonPrev, buttonNext, step) {
    var x = document.getElementsByClassName(tab);
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById(buttonPrev).style.display = "none";
    } else {
        document.getElementById(buttonPrev).style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById(buttonNext).innerHTML = "Enviar";
    } else {
        document.getElementById(buttonNext).innerHTML = "Próximo";
    }
    fixStepIndicator(n, step)
}

function nextPrev(n, tab, nextPrevious, allSteps, register, textMessage, step, buttonPrev, buttonNext) {
    console.log(textMessage)
    var x = document.getElementsByClassName(tab);
    if (n == 1 && !validateForm(tab, step)) return false;
    
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        // document.getElementById("regForm").submit();
        // return false;
        //alert("sdf");
        document.getElementById(nextPrevious).style.display = "none";
        document.getElementById(allSteps).style.display = "none";
        document.getElementById(register).style.display = "none";
        document.getElementById(textMessage).style.display = "block";
    }

    showTab(currentTab, tab, buttonPrev, buttonNext, step);
}

function validateForm(tab, step) {
    console.log("step " + step)
    var x, y, i, valid = true;
    x = document.getElementsByClassName(tab);
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) { document.getElementsByClassName(step)[currentTab].className += " finish"; }
    return valid;
}

function fixStepIndicator(n, step) {
  
    var i, x = document.getElementsByClassName(step);
    console.log(i);
    for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); }
    x[n].className += " active";
    console.log(x[n].className);
}

window.onload = function(){

    $(".tab4").children().children().children().children().css("font-size", 13);

    $("#exampleModa4,#exampleModa3, #exampleModa2,#exampleModal").on("hidden.bs.modal", function () {
        
        location.reload();

    });
}