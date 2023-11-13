let compraSeleccionada;
let comprasContent = [];
let dataCompras = [];

function startCompras() {
    fetch("/web/modules/SICEFASucursal/modules/compras/dataPedidos.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            comprasContent = jsonData;
        });
}

startCompras();


function asingDataCompras() {
    dataCompras = comprasContent;
    loadTableCompras();
}

function datosVacios() {
    Swal.fire(
        'Datos vacios',
        'No puede haber datos vacios. Por favor intentalo de nuevo',
        'info'
    )
}

function loadTableCompras() {

    let content = '';
    let status = '';
    dataCompras.forEach(function (compra) {
        if (compra.estatusPedido == 1) {
            status = 'Activo';
        } else {
            status = 'Inactivo';
        }
        content += `<tr class="table-style-compras text-center" onclick="selectCompra(${comprasContent.indexOf(compra)});">
            <th class="table-space m-2 p-1">${compra.idPedido}</th>
            <th class="table-space m-2 p-1">${status}</th>
            <th class="table-space m-2 p-1">${compra.medicamento.toUpperCase()}</th>
            <th class="table-space m-2 p-1">${compra.cantidadPedido}</th>
            <th class="table-space m-2 p-1">${compra.sicefaOrigen.toUpperCase()}</th>
        </tr>`;
    });

    $("#txtMedicamento").focus();
    document.getElementById('tblPedido').innerHTML = "";
    document.getElementById('tblPedido').innerHTML = content;
}

function selectCompra(index) {

    const compra = comprasContent[index];

    $("#txtIdPedido").val(compra.idPedido);
    $("#txtMedicamento").val(compra.medicamento);
    $("#txtIdCantidad").val(compra.cantidadPedido);
    $("#txtSicefaPedido").val(compra.sicefaOrigen);

    $("#btnAdd").attr("disabled", true);
    $("#btnUpdate").removeAttr("disabled");
    $("#btnDelete").removeAttr("disabled");
    compraSeleccionada = index;
}

function delateCompra() {
    comprasContent[compraSeleccionada].estatusPedido = "0";
    loadTableCompras();
}

function cleanCompra() {
    $("#txtIdPedido").val("");
    $("#txtMedicamento").val("");
    $("#txtIdCantidad").val("");
    $("#txtSicefaPedido").val("");

    $("#txtMedicamento").focus();
    $("#btnAdd").removeAttr("disabled");
    $("#btnUpdate").attr("disabled", "disabled");
    $("#btnDelete").attr("disabled", "disabled");
    compraSeleccionada = 0;
}

function numberRandom() {
    const min = 1000;
    const max = 9999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

function addCompra() {
    let idPedido, medicamento, cantidadPedido,
        sicefaOrigen, estatusPedido;

    idPedido = numberRandom();
    medicamento = $("#txtMedicamento").val();
    cantidadPedido = $("#txtIdCantidad").val();
    sicefaOrigen = $("#txtSicefaPedido").val();
    estatusPedido = "1";

    if (
        idPedido === "" ||
        medicamento === "" ||
        cantidadPedido === "" ||
        sicefaOrigen === ""
    ) {
        datosVacios();
    } else {
        const idExistente = comprasContent.some(
            venta => venta.idPedido === idPedido.toString()
        );
        if (idExistente) {
            do {
                idPedido = numberRandom();
            } while (
                comprasContent.some(venta => venta.idPedido === idPedido.toString())
            );
        }

        let pedido = {
            idPedido: idPedido.toString(),
            medicamento: medicamento,
            cantidadPedido: cantidadPedido,
            sicefaOrigen: sicefaOrigen,
            estatusPedido: "1",
        };

        comprasContent.push(pedido);
        cleanCompra();
        loadTableCompras();
    }
}

function updateCompra(){
    
    
    let idPedido, medicamento, cantidadPedido,
    sicefaOrigen, estatusPedido;

idPedido = $("#txtIdPedido").val();
medicamento = $("#txtMedicamento").val();
cantidadPedido = $("#txtIdCantidad").val();
sicefaOrigen = $("#txtSicefaPedido").val();
estatusPedido = "1";

let pedido = {}
pedido.idPedido = idPedido;
pedido.medicamento = medicamento;
pedido.cantidadPedido = cantidadPedido;
pedido.sicefaOrigen = sicefaOrigen;
pedido.estatusPedido = estatusPedido;
comprasContent[compraSeleccionada] = pedido
cleanCompra();
loadTableCompras();

}

function searchPedido() {
    let searchCharacter = $("#txtBuscarPedido").val().toLowerCase().trim();

    let resultados = comprasContent.filter(compra => {
        let medicamento = `${compra.medicamento.toUpperCase()}`;
        let identificadores = `${compra.idPedido} ${compra.estatusPedido.toLowerCase()} ${compra.cantidadPedido}`;
        let sicefa = compra.sicefaOrigen.toString();

        return (
            medicamento.toLowerCase().includes(searchCharacter) ||
            identificadores.toLowerCase().includes(searchCharacter) ||
            sicefa.includes(searchCharacter)
        );
    });

    let content = '';
    let status = '';
    resultados.forEach(compra => {
        if (compra.comprasContent == 1) {
            status = 'Activo';
        } else {
            status = 'Inactivo';
        }
        content += `<tr class="table-style-compras text-center" onclick="selectCompra(${comprasContent.indexOf(compra)});">
            <th>${compra.idPedido}</th>
            <th>${status}</th>
            <th>${compra.medicamento.toUpperCase()}</th>
            <th>${compra.cantidadPedido}</th>
            <th>${compra.sicefaOrigen.toUpperCase()}</th>
        </tr>`;
    });

    document.getElementById('tblPedido').innerHTML = content;
}