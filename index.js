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
    try {
        var x = document.getElementsByClassName(tab);
        x[n].style.display = "block";
        if (n == 0) {
            document.getElementById(buttonPrev).style.display = "none";
        } else {
            document.getElementById(buttonPrev).style.display = "inline";
        }

        if (n == (x.length - 1)) {
            document.getElementById(buttonPrev).style.display = "none";
            document.getElementById(buttonNext).style.display = "none";
        } 

        fixStepIndicator(n, step);
    } catch (e) {
        console.log(e.error)
    }
}

function nextPrev(n, tab, nextPrevious, allSteps, register, textMessage, step, buttonPrev, buttonNext) {
    console.log(textMessage)
    var x = document.getElementsByClassName(tab);

    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    console.log(currentTab + " " + (x.length - 1));
    if (currentTab == (x.length - 1)) {
        // document.getElementById("regForm").submit();
        // return false;
        //alert("sdf");
        document.getElementById(nextPrevious).style.display = "none";
        document.getElementById(allSteps).style.display = "none";
        document.getElementById(register).style.display = "none";
       
        // ALTERA AQUI CADA VEZ QUE CRIAR UMA FUNÇÃO NOVA , APONTE PARA A TAB DO MODAL QUE TA ABRINDO
        switch (tab) {
            case "tab":
                pedidoCupuacu();
                break;
            case "tab2":
                pedidoSundae();
                break;
            case "tab5":
                pedidoCasquinha();
                break;
            case "tab6":
                pedidoOutros();
                break;
            case "tab4":
                pedidoMilkShake();
                break;
            case "tab3":
                pedidoAcai();
                break;
            default:
                console.log("ainda não implementado");

        }
    }

    showTab(currentTab, tab, buttonPrev, buttonNext, step);
}

function validateForm(tab, step) {
    console.log("step " + step)
    var x, y, i, valid = true;
    x = document.getElementsByClassName(tab,);
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
   // $(".tab").children().children().children().children().css("font-size", 13);
    $("#exampleModa4,#exampleModa3,#exampleModa2,#exampleModal,#exampleModa5,#examplemoda6").on("hidden.bs.modal", function () {
        location.reload();
    });
}

function continuePedido() {
    location.reload();
}
function cancelarPedido() {
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

function enderecoPedido(){
    $(".info-pedido").hide();
    $(".pedido-endereco").show();
}

function finalizaPedido() {
    let valorFinal = 3;
    pedidos = JSON.parse(localStorage.getItem("pedidos"));
    pedidos.forEach((item, index) => {
        let complements = JSON.parse(item.sabor);
        let price = 0;
        complements.forEach((itemComplement) => {
            price += itemComplement.price;
        });

        valorFinal = valorFinal + item.valor + price;
    });

    Swal.fire({
        title: "Pedido realizado com sucesso",
        text: "Total do pedido " + formatNumberMonetario((valorFinal)),
        icon: "success"
    }).then(() => {
        limpaPedido();
    });
}

//copiar essa funçao pra cada tipo de pedido
function pedidoCasquinha() {

    let tipoCasquinha = $('input[name=tipoCasquinha]:checked').val();
    let saborCasquinha = returnComplementValues('.input_value_casquinha'); //alterar aqui

    const casquinhas = [];
    casquinhas["Casquinha"] = { 'valor': 4, 'descricao': 'Casquinha' };
    casquinhas["cascao"] = { 'valor': 6, 'descricao': 'Cascao' };
    casquinhas["Cascao_borda_Nutella"] = { 'valor': 8, 'descricao': 'Cascão_borda_nutella' };

    let pedido = {
        "tipoPedido": tipoCasquinha,
        "sabor": JSON.stringify(saborCasquinha), //alterar aqui
        "valor": casquinhas[tipoCasquinha].valor,
        "descricao": casquinhas[tipoCasquinha].descricao
    }

    let pedidos = [];

    pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    publicarHtml();
}

function formatNumberMonetario(valorFinal) {
    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}
//function pedido outros
function pedidoOutros() {

    let tipoOutros = $('input[name=tipoOutros]:checked').val();
    let conf_Outros = returnComplementValues('.input_value_Outros');

    const outros = [];
    outros["PetitGateau"] = { 'valor': 15, 'descricao': 'Petit Gateau' };
    outros["BananaSplit"] = { 'valor': 15, 'descricao': 'Banana Split' };

    let pedido = {
        "tipoPedido": tipoOutros,
        "sabor": JSON.stringify(conf_Outros),
        "valor": outros[tipoOutros].valor,
        "descricao": outros[tipoOutros].descricao
    }

    let pedidos = [];

    pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    publicarHtml();
}


function publicarHtml() {
    let pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    let html = "";
    pedidos.forEach((item, index) => {
        let complements = JSON.parse(item.sabor);
        let flavors = "";
        let price = 0;

        complements.forEach((itemComplement) => {
            flavors += " , " + itemComplement.complement;
            price += itemComplement.price;
        });

        let finalPrice = price + item.valor;
        html += "<p  class='text-pedido-final'> Seu pedido " + (index + 1) + " foi " + item.descricao + " de sabor " + flavors + ". Valor do pedido " + formatNumberMonetario(finalPrice) + "</p>";
    });

    $(".text-finaliza-pedido").html("");
    $(".text-finaliza-pedido").html(html);
}

function formatNumberMonetario(valorFinal) {
    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

//pedido sundae
function pedidoSundae() {

    let tipoSundae = $('input[name=quantidadeSundae]:checked').val();
    let saborSundae = returnComplementValues('.input_value_sundae'); // alterar aqui

    const sundae = [];
    sundae["300ml"] = { 'valor': 10, 'descricao': 'Sundae 300ml' };
    sundae["400ml"] = { 'valor': 12, 'descricao': 'Sundae 400ml' };

    let pedido = {
        "tipoPedido": tipoSundae,
        "sabor": JSON.stringify(saborSundae), //alterar aqqui
        "valor": sundae[tipoSundae].valor,
        "descricao": sundae[tipoSundae].descricao
    }

    let pedidos = [];

    pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    pedidos.push(pedido);
    console.log(pedidos);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    publicarHtml();
}


function formatNumberMonetario(valorFinal) {
    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

//pedido cupuaçu
function pedidoCupuacu() {

    let tipoCupuacu = $('input[name=tipoCupuacu]:checked').val();
    let complCupuacu = returnComplementValues('.input_value_cupuacu');
    const Cupuacu = [];
    Cupuacu["300ml"] = { 'valor': 12, 'descricao': 'Cupuaçu 300ml' };
    Cupuacu["400ml"] = { 'valor': 15, 'descricao': 'Cupuaçu 400ml' };
    Cupuacu["500ml"] = { 'valor': 18, 'descricao': 'Cupuaçu 500ml' };
    Cupuacu["700ml"] = { 'valor': 25, 'descricao': 'Cupuaçu 700ml' };

    let pedido = {
        "tipoPedido": tipoCupuacu,
        "sabor": JSON.stringify(complCupuacu),
        "valor": Cupuacu[tipoCupuacu].valor,
        "descricao": Cupuacu[tipoCupuacu].descricao
    }

    let pedidos = [];

    pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    publicarHtml();
}

function returnComplementValues(classCssComplemento) {
    let complementos = [];
    let values = document.querySelectorAll(classCssComplemento);

    for (var i = 0; i < values.length; i++) {
        if (values[i].checked) {
            let object = {
                'complement': values[i].value,
                'price': $(values[i]).data("price")
            }
            complementos.push(object);
        }
    }

    return complementos;
}

function formatNumberMonetario(valorFinal) {
    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

//pedido milkshake
function pedidoMilkShake() {

    let tipoMilshake = $('input[name=tipoMilkshake]:checked').val();
    let saborMilkShake = returnComplementValues('.input_value_milkShake');

    const milkShakes = [];
    milkShakes["300ml"] = { 'valor': 8, 'descricao': 'Milk Shake 300ml' };
    milkShakes["400ml"] = { 'valor': 10, 'descricao': 'Milk Shake 400ml' };
    milkShakes["500ml"] = { 'valor': 12, 'descricao': 'Milk Shake 500ml' };

    let pedido = {
        "tipoPedido": tipoMilshake,
        "sabor": JSON.stringify(saborMilkShake),
        "valor": milkShakes[tipoMilshake].valor,
        "descricao": milkShakes[tipoMilshake].descricao
    }

    let pedidos = [];

    pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    publicarHtml();
}


function formatNumberMonetario(valorFinal) {
    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

//pedidos açai
function pedidoAcai() {

    let tipoAcai = $('input[name=tipoAcai]:checked').val();
    let complAcai = returnComplementValues('.input_value_acai');

    const acais = [];
    acais["300ml"] = { 'valor': 12, 'descricao': 'Açaí 300ml' };
    acais["400ml"] = { 'valor': 15, 'descricao': 'Açaí 400ml' };
    acais["500ml"] = { 'valor': 18, 'descricao': 'Açaí 500ml' };
    acais["700ml"] = { 'valor': 25, 'descricao': 'Açaí 700ml' };

    let pedido = {
        "tipoPedido": tipoAcai,
        "sabor": JSON.stringify(complAcai),
        "valor": acais[tipoAcai].valor,
        "descricao": acais[tipoAcai].descricao
    }

    let pedidos = [];

    pedidos = localStorage.getItem("pedidos") == null ? [] : JSON.parse(localStorage.getItem("pedidos"));
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    publicarHtml();
}

function formatNumberMonetario(valorFinal) {
    return valorFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function checkRadioInput(element){
    let controlchecked = $(element).data("controlchecked");
    element.checked = controlchecked ? false : true;
    $(element).data("controlchecked", !controlchecked);
}