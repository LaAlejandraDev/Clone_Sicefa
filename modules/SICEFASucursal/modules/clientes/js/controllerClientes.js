let clienteSeleccionado;
let clientesContent = [];
let dataClientes = [];

function startClientes(){
fetch("/web/modules/SICEFASucursal/modules/clientes/json/dataClientes.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonData) {
        clientesContent = jsonData;
    });
}

startClientes();


function asingDataClientes(){
    dataClientes = clientesContent;
    loadTableClientes();
}

function datosVacios(){
    Swal.fire(
        'Datos vacios',
        'No puede haber datos vacios. Por favor intentalo de nuevo',
        'info'
    )
}

function loadTableClientes() {
    let content = '';
    let status = '';
    dataClientes.forEach (function (cliente) {
        if (cliente.estatusCliente == 1) {
            status = 'Activo';
        } else {
            status = 'Inactivo';
        }
        content += `<tr class="table-style-clientes text-center" onclick="selectCliente(${clientesContent.indexOf(cliente)});">
            <th class="table-space m-2 p-1">${cliente.idCliente}</th>
            <th class="table-space m-2 p-1">${status}</th>
            <th class="table-space m-2 p-1">${cliente.nombreCliente.toUpperCase()}</th>
            <th class="table-space m-2 p-1">${cliente.apellidoPaternoCliente.toUpperCase()} ${cliente.apellidoMaternoCliente.toUpperCase()}</th>
            <th class="table-space m-2 p-1">${cliente.generoCliente}</th>
            <th class="table-space m-2 p-1">${cliente.telefonoMovilCliente}</th>
        </tr>`;
    });
    document.getElementById('tblClientes').innerHTML = "";
    document.getElementById('tblClientes').innerHTML = content;
}

function selectCliente(index) {
    const cliente = clientesContent[index];
    $("#txtIdCliente").val(cliente.idCliente);
    $("#txtNombreCliente").val(cliente.nombreCliente);
    $("#txtApellidoPaCliente").val(cliente.apellidoPaternoCliente);
    $("#txtApellidoMaCliente").val(cliente.apellidoMaternoCliente);
    $("#txtRfcCliente").val(cliente.rfc);
    $("#txtMovilCliente").val(cliente.telefonoMovilCliente);
    $("#txtFijoCliente").val(cliente.telefonoFijoCliente);
    $("#txtCorreoCliente").val(cliente.correoElectronicoCliente);
    $("#txtGenero").val(cliente.generoCliente);

    $("#btnAdd").attr("disabled", true);
    $("#btnUpdate").removeAttr("disabled");
    $("#btnDelete").removeAttr("disabled");
    clienteSeleccionado = index;
}

function deleteCliente() {
    clientesContent[clienteSeleccionado].estatusCliente = 0;
    loadTableClientes();
    cleanCliente();
}

function cleanCliente() {
    $("#txtIdCliente").val("");
    $("#txtNombreCliente").val("");
    $("#txtApellidoPaCliente").val("");
    $("#txtApellidoMaCliente").val("");
    $("#txtRfcCliente").val("");
    $("#txtMovilCliente").val("");
    $("#txtFijoCliente").val("");
    $("#txtCorreoCliente").val("");
    $("#txtGenero").val("");

    $("#txtNombreCliente").focus();
    $("#btnAdd").removeAttr("disabled");
    $("#btnUpdate").attr("disabled", "disabled");
    $("#btnDelete").attr("disabled", "disabled");
    clienteSeleccionado = 0;
}

function numberRandom() {
    const min = 1000;
    const max = 9999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

function addCliente() {
    let idCliente, nombreCliente, apellidoPaternoCliente,
        apellidoMaternoCliente, rfc, telefonoFijoCliente, telefonoMovilCliente,
        correoElectronicoCliente, estatusCliente, generoCliente;

    idCliente = numberRandom();
    nombreCliente = $("#txtNombreCliente").val();
    apellidoPaternoCliente = $("#txtApellidoPaCliente").val();
    apellidoMaternoCliente = $("#txtApellidoMaCliente").val();
    rfc = $("#txtRfcCliente").val();
    telefonoFijoCliente = $("#txtFijoCliente").val();
    telefonoMovilCliente = $("#txtMovilCliente").val();
    correoElectronicoCliente = $("#txtCorreoCliente").val();
    estatusCliente = "1";
    generoCliente = $("#txtGenero").val();

    if (
        nombreCliente === "" ||
        apellidoPaternoCliente === "" ||
        apellidoMaternoCliente === "" ||
        rfc === "" ||
        telefonoFijoCliente === "" ||
        telefonoMovilCliente === "" ||
        correoElectronicoCliente === "" ||
        generoCliente === null
    ) {
        datosVacios();
    } else {
        const idExistente = clientesContent.some(
            cliente => cliente.idCliente === idCliente.toString()
        );
        if (idExistente) {
            do {
                idCliente = numberRandom();
            } while (
                clientesContent.some(cliente => cliente.idCliente === idCliente.toString())
            );
        }

        let cliente = {
            idCliente: idCliente.toString(),
            nombreCliente: nombreCliente,
            apellidoPaternoCliente: apellidoPaternoCliente,
            apellidoMaternoCliente: apellidoMaternoCliente,
            rfc: rfc,
            telefonoFijoCliente: telefonoFijoCliente,
            telefonoMovilCliente: telefonoMovilCliente,
            correoElectronicoCliente: correoElectronicoCliente,
            estatusCliente: "1",
            generoCliente: generoCliente,
        };

        clientesContent.push(cliente);
        cleanCliente();
        loadTableClientes();
    }
}

function updateCliente() {
    let idCliente, nombreCliente, apellidoPaternoCliente,
        apellidoMaternoCliente, rfc, telefonoFijoCliente, telefonoMovilCliente,
        correoElectronicoCliente, estatusCliente, generoCliente;

    idCliente = $("#txtIdCliente").val();
    nombreCliente = $("#txtNombreCliente").val();
    apellidoPaternoCliente = $("#txtApellidoPaCliente").val();
    apellidoMaternoCliente = $("#txtApellidoMaCliente").val();
    rfc = $("#txtRfcCliente").val();
    telefonoFijoCliente = $("#txtFijoCliente").val();
    telefonoMovilCliente = $("#txtMovilCliente").val();
    correoElectronicoCliente = $("#txtCorreoCliente").val();
    estatusCliente = "1";
    generoCliente = $("#txtGenero").val();

    let cliente = {
        idCliente: idCliente,
        nombreCliente: nombreCliente,
        apellidoPaternoCliente: apellidoPaternoCliente,
        apellidoMaternoCliente: apellidoMaternoCliente,
        rfc: rfc,
        telefonoFijoCliente: telefonoFijoCliente,
        telefonoMovilCliente: telefonoMovilCliente,
        correoElectronicoCliente: correoElectronicoCliente,
        estatusCliente: "1",
        generoCliente: generoCliente,
    };

    clientesContent[clienteSeleccionado] = cliente;

    cleanCliente();
    loadTableClientes();
}

function searchCliente() {
    let searchCharacter = $("#txtBuscarCliente").val().toLowerCase().trim();

    let resultados = clientesContent.filter(cliente => {
        let nombreCliente = `${cliente.nombreCliente.toUpperCase()} ${cliente.apellidoPaternoCliente.toUpperCase()} ${cliente.apellidoMaternoCliente.toUpperCase()}`;
        let identificadores = `${cliente.idCliente} ${cliente.correoElectronicoCliente.toUpperCase()} ${cliente.telefonoFijoCliente}${cliente.telefonoMovilCliente}${cliente.generoCliente}`;
        let estatus = `${cliente.estatusCliente}`;

        return (
            identificadores.toLowerCase().includes(searchCharacter) ||
            nombreCliente.toLowerCase().includes(searchCharacter) ||
            estatus.toLowerCase().includes(searchCharacter)
        );
    });

    let content = '';
    let status = '';
    resultados.forEach(cliente => {
        if (cliente.estatusCliente == 1) {
            status = 'Activo';
        } else {
            status = 'Inactivo';
        }
        content += `<tr class="table-style-clientes text-center" onclick="selectCliente(${clientesContent.indexOf(cliente)});">
            <th class="table-space m-2 p-1">${cliente.idCliente}</th>
            <th class="table-space m-2 p-1">${status}</th>
            <th class="table-space m-2 p-1">${cliente.nombreCliente.toUpperCase()}</th>
            <th class="table-space m-2 p-1">${cliente.apellidoPaternoCliente.toUpperCase()} ${cliente.apellidoMaternoCliente.toUpperCase()}</th>
            <th class="table-space m-2 p-1">${cliente.generoCliente.toUpperCase()}</th>
            <th class="table-space m-2 p-1">${cliente.telefonoMovilCliente}</th>
        </tr>`;
    });

    document.getElementById('tblClientes').innerHTML = content;
}
