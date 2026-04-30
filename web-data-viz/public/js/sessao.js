// sessao
function validarSessao() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null && typeof b_usuario !== "undefined") {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento
function aguardar() {
    if (typeof div_aguardar !== "undefined") {
        div_aguardar.style.display = "flex";
    }
}

function finalizarAguardar(texto) {
    if (typeof div_aguardar !== "undefined") {
        div_aguardar.style.display = "none";
    }

    if (texto && typeof div_erros_login !== "undefined") {
        div_erros_login.style.display = "flex";
        div_erros_login.innerHTML = texto;
    }
}
