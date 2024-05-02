var currentTab = 0;
var currentTab2 = 0;
var currentTab3 = 0;
var currentTab4 = 0;
var currentTab5 = 0;
var currentTab6 = 0;
let controlePedido = false;
let valorFinal = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    showTab(currentTab, "tab", "prevBtn", "nextBtn", "step");
    showTab(currentTab2, "tab2", "prevBtn2", "nextBtn2", "step-2");
    showTab(currentTab3, "tab3", "prevBtn3", "nextBtn3", "step-3");
    showTab(currentTab4, "tab4", "prevBtn4", "nextBtn4", "step-4");
    showTab(currentTab5, "tab5", "prevBtn5", "nextBtn5", "step-5");
    showTab(currentTab6, "tab6", "prevBtn6", "nextBtn6", "step-6");
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

        switch (tab) {
            case "tab5":
                pedidoCasquinha();
            default:
                console.log("ainda não implementado");

        }

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

window.onload = function () {

    $(".tab4").children().children().children().children().css("font-size", 13);

    $("#exampleModa4,#exampleModa3,#exampleModa2,#exampleModal,#exampleModa5,#examplemoda6").on("hidden.bs.modal", function () {

        location.reload();

    });
}

function continuePedido() {
    location.reload();
}
function cancelarPedido(){
    Swal.fire({
        title: "Pedido cancelado !",
        text: "",
        icon: "success"
    }).then(() => {
        limpaPedido();
    });
}

function limpaPedido() {
    localStorage.clear();
    location.reload();
}

function finalizaPedido() {
    let valorFinal = 3;
    pedidos = JSON.parse(localStorage.getItem("pedidos"));
    pedidos.forEach((item, index) => {
        valorFinal = item.valor + valorFinal;
    });

    Swal.fire({
        title: "Pedido realizado com sucesso",
        text: "Total do pedido " + formatNumberMonetario((valorFinal)),
        icon: "success"
    }).then(() => {
        limpaPedido();
    });
}

function pedidoCasquinha() {

    let tipoCasquinha = $('input[name=tipoCasquinha]:checked').val();
    let saborCasquinha = $('input[name=saborCasquinha]:checked').val();

    const casquinhas = [];
    casquinhas["Casquinha"] = {'valor' : 4, 'descricao': 'Casquinha'};
    casquinhas["cascao"] = {'valor' : 6, 'descricao': 'Cascão'};
    casquinhas["Cascao_borda_chocolate"] ={'valor' : 8, 'descricao': 'Cascão c/ borda de nutella'};

    let pedido = {
        "tipoPedido": tipoCasquinha,
        "sabor": saborCasquinha,
        "valor": casquinhas[tipoCasquinha].valor,
        "descricao":  casquinhas[tipoCasquinha].descricao
    }

    let pedidos = [];

    pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    valorFinal = casquinhas[tipoCasquinha].valor;
    let html = "";

    pedidos.forEach((item, index) => {
        html += "<p  class='text-pedido-final'> Seu pedido " + (index + 1)+ " foi " + item.descricao + " com o sabor " + item.sabor + ". Valor do pedido " + formatNumberMonetario(item.valor) + "</p>";
    });

    $("#text-finaliza-pedido-casquinha").html(html);

}

function formatNumberMonetario(valorFinal) {
    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}