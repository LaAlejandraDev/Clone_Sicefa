//Este control nos permite asignar el contenido de los defirentes modulos y asignarlo a la pagina principal de el modulo SICEFA Central

let content = [];

function setHome() {
    fetch('Modules/Home_Central/home.html').then(
        function (response) {
            return response.text();
        }
    ).then(
        function (textData) {
            content = textData
            aplyContent();
        }
    )
}

function setGestion_Sucursales() {
    fetch('Modules/Gestion_Sucursales/home.html').then(
        function (response) {
            return response.text();
        }
    ).then(
        function (textData) {
            content = textData
            aplyContent();
            asingData();
        }
    )
}

function setControl_Medicamentos() {
    fetch('Modules/Control_Medicamentos/home.html').then(
        function (response) {
            return response.text();
        }
    ).then(
        function (textData) {
            content = textData
            aplyContent();
            asingDataMedicamento();
        }
    )
}

function setSeguimiento_Pedidos() {
    fetch('Modules/Seguimiento_Pedidos/home.html').then(
        function (response) {
            return response.text();
        }
    ).then(
        function (textData) {
            content = textData
            aplyContent();
        }
    )
}

function setControl_Usuario() {
    fetch('Modules/Control_Usuario/home.html').then(
        function (response) {
            return response.text();
        }
    ).then(
        function (textData) {
            content = textData
            aplyContent();
        }
    )
}
function aplyContent() {
    document.getElementById('master-container').innerHTML = '';
    document.getElementById('master-container').innerHTML = content;
}