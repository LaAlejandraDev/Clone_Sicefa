export function returnIndex() {
    fetch("./Modules/Index/index.html").then(
        function (response) {
            return response.text();
        }
    ).then(
        function (textData) {
            let content = textData;
            aplyContent(content);
        }
    )
}

function aplyContent(c) {
    document.getElementById('master-container').innerHTML = '';
    document.getElementById('master-container').innerHTML = c;
}

export function validarLoginCentral() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;
    if (user !== "" && password !== "") {
        if (user !== 'administrador' || password !== 'administrador') {
            Swal.fire({
                icon: 'error',
                title: 'Usuario o contraseña incorrectos.',
                text: 'Asegúrate de que estén escritos correctamente y vuelve a intentarlo.',
            });
        } else {
            Swal.fire({
                title: '¡Inicio de sesión exitoso!',
                text: 'Bienvenido de nuevo.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/web/modules/SICEFA_Central/SICEFA_Central_Home.html';
                }
            });
        }
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Los campos de usuario y contraseña no pueden estar vacíos.',
            text: 'Inténtalo de nuevo.',
        });
    }

}

export function validarLoginSucursal() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;
    if (user !== "" && password !== "") {
        if (user !== 'administrador' || password !== 'administrador') {
            Swal.fire({
                icon: 'error',
                title: 'Usuario o contraseña incorrectos.',
                text: 'Asegúrate de que estén escritos correctamente y vuelve a intentarlo.',
            });
        } else {
            Swal.fire({
                title: '¡Inicio de sesión exitoso!',
                text: 'Bienvenido de nuevo.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/web/modules/SICEFASucursal/SICEFASucursal.html';
                }
            });
        }
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Los campos de usuario y contraseña no pueden estar vacíos.',
            text: ' Inténtalo de nuevo.',
        });
    }

}