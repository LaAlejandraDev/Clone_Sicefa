let content = [];

function setHome() {
    fetch('/web/modules/SICEFASucursal/modules/home/home_Sucursal.html').then(
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

function cargarModuloEmpleados() {
    fetch("/web/modules/SICEFASucursal/modules/empleados/empleados.html")
        .then(
            function (response) {
                return response.text();
            }
        ).then(
            function (textData) {
                content = textData
                aplyContent();
                asingDataEmpleados();
            }
        )
}

function cargarModuloClientes() {
    fetch("/web/modules/SICEFASucursal/modules/clientes/clientes.html")
        .then(
            function (response) {
                return response.text();
            }
        ).then(
            function (textData) {
                content = textData
                aplyContent();
                asingDataClientes();
            }
        )
}

function cargarModuloVentas() {
    fetch("/web/modules/SICEFASucursal/modules/ventas/ventas.html")
        .then(
            function (response) {
                return response.text();
            }
        ).then(
            function (textData) {
                content = textData
                aplyContent();
                asingDataVentas();
            }
        )
}
function cargarModuloPedidos() {
    fetch("/web/modules/SICEFASucursal/modules/compras/compras.html")
        .then(
            function (response) {
                return response.text();
            }
        ).then(
            function (textData) {
                content = textData
                aplyContent();
                asingDataCompras();
            }
        )
}

function aplyContent() {
    document.getElementById('master-container').innerHTML = '';
    document.getElementById('master-container').innerHTML = content;
}