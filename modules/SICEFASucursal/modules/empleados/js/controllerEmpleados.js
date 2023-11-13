let empleadoSeleccionado;
let empleadosContent = [];
let data = [];

function startGestion() {
    fetch("/web/modules/SICEFASucursal/modules/empleados/dataEmpleados.json")
        .then(
            function (response) {
                return response.json();
            }
        ).then(
            function (jsonData) {
                empleadosContent = jsonData
            }
        )
}
startGestion();

function asingDataEmpleados() {
    data = empleadosContent;
    loadTable(data);
}

function asignContent(contenido){
    document.getElementById('tblEmpleados').innerHTML = "";
    document.getElementById('tblEmpleados').innerHTML = contenido;
}

function datosVacios(){
    Swal.fire(
        'Datos vacios',
        'No puede haber datos vacios. Por favor intentalo de nuevo',
        'info'
    )
}


function loadTable(contenido) {
    let content = '';
    let status = '';

    contenido.forEach(function (empleado) {
        if (empleado.estatusEmpleado == 1) {
            status = 'Activo';
        } else {
            status = 'Inactivo';
        }
        content += `<tr class="table-style-empleados text-center" onclick="selectEmpleado(${contenido.indexOf(empleado)});">
                <th class="table-space m-2 p-1">${empleado.idEmpleado}</th>
                <th class="table-space m-2 p-1">${status}</th>
                <th class="table-space m-2 p-1">${empleado.nombreEmpleado.toUpperCase()}</th>
                <th class="table-space m-2 p-1">${empleado.apellidoPaternoEmpleado.toUpperCase()} ${empleado.apellidoMaternoEmpleado.toUpperCase()}</th>
                <th class="table-space m-2 p-1">${empleado.generoEmpleado}</th>
                <th class="table-space m-2 p-1">${empleado.telefonoMovilEmpleado}</th>
            </tr>`;
    });

   asignContent(content);
}



function selectEmpleado(index) {
    const empleado = empleadosContent[index];
    $("#txtIdEmpleado").val(empleado.idEmpleado);
    $("#txtNombreEmpleado").val(empleado.nombreEmpleado);
    $("#txtApellidoPaEmpleado").val(empleado.apellidoPaternoEmpleado);
    $("#txtApellidoMaEmpleado").val(empleado.apellidoMaternoEmpleado);
    $("#txtRfcEmpleado").val(empleado.rfc);
    $("#txtMovilEmpleado").val(empleado.telefonoMovilEmpleado);
    $("#txtFijoEmpleado").val(empleado.telefonoFijoEmpleado);
    $("#txtCorreoEmpleado").val(empleado.correoElectronicoEmpleado);
    $("#txtGenero").val(empleado.generoEmpleado);

    $("#btnAdd").attr("disabled", true);
    $("#btnUpdate").removeAttr("disabled");
    $("#btnDelete").removeAttr("disabled");
    empleadoSeleccionado = index;
}

function delateEmpleado() {
    empleadosContent[empleadoSeleccionado].estatusEmpleado = 0;
    loadTable(data);
    cleanEmpleado();
}

function cleanEmpleado() {
    $("#txtIdEmpleado").val("");
    $("#txtNombreEmpleado").val("");
    $("#txtApellidoPaEmpleado").val("");
    $("#txtApellidoMaEmpleado").val("");
    $("#txtRfcEmpleado").val("");
    $("#txtMovilEmpleado").val("");
    $("#txtFijoEmpleado").val("");
    $("#txtCorreoEmpleado").val("");
    $("#txtGenero").val("");

    $("#txtNombreEmpleado").focus();
    $("#btnAdd").removeAttr("disabled");
    $("#btnUpdate").attr("disabled", "disabled");
    $("#btnDelete").attr("disabled", "disabled");
    empleadoSeleccionado = 0;
}

function numberRandom() {
    const min = 1000;
    const max = 9999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

function addEmpleado() {
    let idEmpleado, nombreEmpleado, apellidoPaternoEmpleado,
        apellidoMaternoEmpleado, rfc, telefonoFijoEmpleado, telefonoMovilEmpleado,
        correoElectronicoEmpleado, estatusEmpleado, generoEmpleado;

    idEmpleado = numberRandom();
    nombreEmpleado = $("#txtNombreEmpleado").val();
    apellidoPaternoEmpleado = $("#txtApellidoPaEmpleado").val();
    apellidoMaternoEmpleado = $("#txtApellidoMaEmpleado").val();
    rfc = $("#txtRfcEmpleado").val();
    telefonoFijoEmpleado = $("#txtFijoEmpleado").val();
    telefonoMovilEmpleado = $("#txtMovilEmpleado").val();
    correoElectronicoEmpleado = $("#txtCorreoEmpleado").val();
    estatusEmpleado = $("#txtEstatusEmpleado").val();
    generoEmpleado = $("#txtGenero").val();

    if (nombreEmpleado === "" || apellidoPaternoEmpleado === "" ||
        rfc === "" || telefonoMovilEmpleado === "" ||
        correoElectronicoEmpleado === "" || generoEmpleado === null) {
        datosVacios();
    } else {
        const idExistente = empleadosContent.some(empleado => empleado.idEmpleado === idEmpleado.toString());
        if (idExistente) {
            do {
                idEmpleado = numberRandom();
            } while (empleadosContent.some(empleado => empleado.idEmpleado === idEmpleado.toString()));
        }

        let empleado = {
            idEmpleado: idEmpleado.toString(),
            nombreEmpleado: nombreEmpleado,
            apellidoPaternoEmpleado: apellidoPaternoEmpleado,
            apellidoMaternoEmpleado: apellidoMaternoEmpleado,
            rfc: rfc,
            telefonoFijoEmpleado: telefonoFijoEmpleado,
            telefonoMovilEmpleado: telefonoMovilEmpleado,
            correoElectronicoEmpleado: correoElectronicoEmpleado,
            estatusEmpleado: "1",
            generoEmpleado: generoEmpleado
        };

        empleadosContent.push(empleado);
        cleanEmpleado();
        loadTable(data);
    }
}



function updateEmpleado() {
    let idEmpleado, nombreEmpleado, apellidoPaternoEmpleado,
        apellidoMaternoEmpleado, rfc, telefonoFijoEmpleado, telefonoMovilEmpleado,
        correoElectronicoEmpleado, estatusEmpleado, generoEmpleado;

    idEmpleado = $("#txtIdEmpleado").val();
    nombreEmpleado = $("#txtNombreEmpleado").val();
    apellidoPaternoEmpleado = $("#txtApellidoPaEmpleado").val();
    apellidoMaternoEmpleado = $("#txtApellidoMaEmpleado").val();
    rfc = $("#txtRfcEmpleado").val();
    telefonoFijoEmpleado = $("#txtFijoEmpleado").val();
    telefonoMovilEmpleado = $("#txtMovilEmpleado").val();
    correoElectronicoEmpleado = $("#txtCorreoEmpleado").val();
    estatusEmpleado = $("#txtEstatusEmpleado").val();
    generoEmpleado = $("#txtGenero").val();

    let empleado = {};
    empleado.idEmpleado = idEmpleado;
    empleado.nombreEmpleado = nombreEmpleado;
    empleado.apellidoPaternoEmpleado = apellidoPaternoEmpleado;
    empleado.apellidoMaternoEmpleado = apellidoMaternoEmpleado;
    empleado.rfc = rfc;
    empleado.telefonoFijoEmpleado = telefonoFijoEmpleado;
    empleado.telefonoMovilEmpleado = telefonoMovilEmpleado;
    empleado.correoElectronicoEmpleado = correoElectronicoEmpleado;
    empleado.estatusEmpleado = "1";
    empleado.generoEmpleado = generoEmpleado;
    empleadosContent[empleadoSeleccionado] = empleado


    cleanEmpleado();
    loadTable(data);
}

function searchEmpleado() {
    let searchCharacter = $("#txtBuscarEmpleado").val().toLowerCase().trim();

    let resultados = empleadosContent.filter(empleado => {
        let nombreCompleto = `${empleado.nombreEmpleado} ${empleado.apellidoPaternoEmpleado} ${empleado.apellidoMaternoEmpleado}`;
        let identificadores = `${empleado.idEmpleado} ${empleado.correoElectronicoEmpleado} ${empleado.telefonoFijoEmpleado} ${empleado.telefonoMovilEmpleado} ${empleado.generoEmpleado}`;
        let estatus = `${empleado.estatusEmpleado.toString()}`;

        return (
            nombreCompleto.toLowerCase().includes(searchCharacter) ||
            identificadores.toLowerCase().includes(searchCharacter) ||
            estatus.toLowerCase().includes(searchCharacter)
        );
    });

    let content = '';
    let status = '';
    resultados.forEach(empleado => {
        if (empleado.estatusEmpleado == 1) {
            status = 'Activo';
        } else {
            status = 'Inactivo';
        }
        content += `<tr class="table-style-empleados text-center" onclick="selectEmpleado(${empleadosContent.indexOf(empleado)});">
            <th>${empleado.idEmpleado}</th>
            <th>${status}</th>
            <th>${empleado.nombreEmpleado.toUpperCase()}</th>
            <th>${empleado.apellidoPaternoEmpleado.toUpperCase()} ${empleado.apellidoMaternoEmpleado.toUpperCase()}</th>
            <th>${empleado.generoEmpleado.toUpperCase()}</th>
            <th>${empleado.telefonoMovilEmpleado}</th>
        </tr>`;
    });

    document.getElementById('tblEmpleados').innerHTML = content;
}
