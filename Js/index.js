let moduloLogin;

loadIndex();

function loadIndex() {
    fetch("./Modules/Index/index.html").then(
        function (response) {
            return response.text();
        }
    ).then(
        function (html) {
            aplyContent(html);
        }
    );
}

function login() {
    fetch("./Modules/login/login.html").then(
        function (response) {
            return response.text();
        }
    ).then(
        function (html) {
            aplyContent(html);
            import("../Modules/Login/Js/Login.js").then(
                function (controller) {
                    moduloLogin = controller;
                }
            );
        }
    );
}

function aplyContent(contentToAply) {
    $('#master-container').html(contentToAply);
}