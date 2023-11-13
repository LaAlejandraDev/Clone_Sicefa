let ventaSeleccionado;
let ventaContent = [];
let dataVenta = [];

function starVenta() {
    fetch("/web/modules/SICEFASucursal/modules/ventas/json/ventas.json").then(
        function (response) {
            return response.json();
        }
    ).then(
        function (jsonData) {
            ventaContent = jsonData;
        }
    )
}
starVenta();

function asingDataVentas() {
    dataVenta = ventaContent;
    loadTableVentas();
}

function datosVacios(){
    Swal.fire(
        'Datos vacios',
        'No puede haber datos vacios. Por favor intentalo de nuevo',
        'info'
    )
}

function actulizacionExitosa() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Cambios aplicados con éxito!',
        showConfirmButton: false,
        timer: 1500
    });
}

function eliminarVenta() {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Estoy seguro.'
    }).then((result) => {
        if (result.isConfirmed) {
            actulizacionExitosa();
            deleteVenta();
        }
    });
}

function deleteVenta() {
    // Crear la funcion para la eliminacion logica
}

function loadTableVentas() {
    let content = '';
    dataVenta.forEach(function (venta) {
        content += `<tr class="table-style-ventas text-center" onclick="selectVenta(${ventaContent.indexOf(venta)});">
        <th class="table-space m-2 p-1">${venta.idVenta}</th>
        <th class="table-space m-2 p-1">${venta.medicamento.toUpperCase()}</th>
        <th class="table-space m-2 p-1">${venta.cantidad}</th>
        <th class="table-space m-2 p-1">${venta.total}</th>
    </tr>`
    })

    $("#txtMedicamento").focus();
    document.getElementById('tblVentas').innerHTML = "";
    document.getElementById('tblVentas').innerHTML = content;
}

function selectVenta(index) {
    const venta = ventaContent[index];
    $("#txtIdVenta").val(venta.idVenta);
    $("#txtMedicamento").val(venta.medicamento);
    $("#txtIdEmpleado").val(venta.idEmpleado);
    $("#txtIdCliente").val(venta.idCliente);
    $("#txtCantidad").val(venta.cantidad);
    $("#txtPrecioUnico").val(venta.precioUnitario);
    $("#txtCantidadPagar").val(venta.total);

    $("#btnAdd").attr("disabled", true);
    $("#btnUpdate").removeAttr("disabled");
    $("#btnDelete").removeAttr("disabled");
    ventaSeleccionado = index;
}

function cleanVenta() {
    $("#txtIdVenta").val("");
    $("#txtMedicamento").val("");
    $("#txtIdEmpleado").val("");
    $("#txtIdCliente").val("");
    $("#txtCantidad").val("");
    $("#txtCantidadPagar").val("");
    $("#txtPrecioUnico").val("")

    $("#txtMedicamento").focus();
    $("#btnAdd").removeAttr("disabled");
    $("#btnUpdate").attr("disabled", "disabled");
    $("#btnDelete").attr("disabled", "disabled");
    ventaSeleccionado = 0;
}

function numberRandom() {
    const min = 1000;
    const max = 9999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

function calcularVenta() {
    precioUnico = $("#txtPrecioUnico").val();
    cantidadMedicamentos = $("#txtCantidad").val();
    totalPagar = precioUnico * cantidadMedicamentos;
    totalInicio = $("#txtCantidadPagar").val();
    totalInicio = totalPagar
    return totalInicio

}

function addVenta() {
    let idVenta, medicamento, idEmpleado, idCliente,
        cantidad, total, precioUnitario;

    idVenta = numberRandom();
    medicamento = $("#txtMedicamento").val();
    idEmpleado = $("#txtIdEmpleado").val()
    idCliente = $("#txtIdCliente").val();
    cantidad = $("#txtCantidad").val();
    precioUnitario = $("#txtPrecioUnico").val();
    total = calcularVenta()

    if (medicamento === "" || idEmpleado === "" ||
        idCliente === "" || cantidad === "") {
       datosVacios();
    } else {
        const idExistente = ventaContent.some(venta => venta.idVenta === idVenta.toString());
        if (idExistente) {
            do {
                idVenta = numberRandom();
            } while (ventaContent.some(venta => venta.idVenta === idVenta.toString()));
        }

        let venta = {
            idVenta: idVenta.toString(),
            medicamento: medicamento,
            idEmpleado: idEmpleado,
            idCliente: idCliente,
            cantidad: cantidad,
            precioUnitario: precioUnitario,
            total: total
        };

        $("#txtMedicamento").focus();
        ventaContent.push(venta);
        loadTableVentas();
        cleanVenta();
        actulizacionExitosa();
    }
}

function updateVenta() {
    let idVenta, medicamento, idEmpleado, idCliente,
        cantidad, total, precioUnitario;


    idVenta = $("#txtIdVenta").val();
    medicamento = $("#txtMedicamento").val();
    idEmpleado = $("#txtIdEmpleado").val()
    idCliente = $("#txtIdCliente").val();
    cantidad = $("#txtCantidad").val();
    precioUnitario = $("#txtPrecioUnico").val();
    total = calcularVenta()

    let venta = {};
    venta.idVenta = idVenta;
    venta.medicamento = medicamento;
    venta.idEmpleado = idEmpleado;
    venta.idCliente = idCliente;
    venta.cantidad = cantidad;
    venta.precioUnitario = precioUnitario;
    venta.total = total;
    ventaContent[ventaSeleccionado] = venta

    $("#txtMedicamento").focus();
    cleanVenta();
    loadTableVentas();
    actulizacionExitosa();
}

function searchVenta(){
    let searchCharacter = $("#txtBuscarVenta").val().toLowerCase().trim();

    let resultados = ventaContent.filter(venta => {
        let nombreProducto = venta.medicamento.toUpperCase();
        let identificadores = `${venta.idVenta} ${venta.idEmpleado} ${venta.idCliente}`;
        let cantidades = `${venta.cantidad} ${venta.precioUnitario} ${venta.total}`;

        return (
            nombreProducto.toLowerCase().includes(searchCharacter) || 
            identificadores.toLowerCase().includes(searchCharacter) ||
            cantidades.toLowerCase().includes(searchCharacter)
        );
    });

    let content = "";

    resultados.forEach(venta => {
        content += `<tr class="table-style-ventas text-center" onclick="selectVenta(${ventaContent.indexOf(venta)});">
            <th class="table-space m-2 p-1">${venta.idVenta}</th>
            <th class="table-space m-2 p-1">${venta.medicamento}</th>
            <th class="table-space m-2 p-1">${venta.cantidad}</th>
            <th class="table-space m-2 p-1">${venta.total}</th>
        </tr>`;
    });

    document.getElementById('tblVentas').innerHTML = content;
}

