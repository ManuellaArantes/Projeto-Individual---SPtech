function obterCaminhoLogin() {
    let caminhoAtual = window.location.pathname;
    let estaNaDashboard = caminhoAtual.indexOf("/dashboard/") > -1;

    if (estaNaDashboard) {
        return "../login.html";
    }

    return "./login.html";
}

function validarSessao() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        if (typeof b_usuario !== "undefined") {
            b_usuario.innerHTML = nome;
        }
    } else {
        window.location = obterCaminhoLogin();
    }
}

function validarAcessoRestrito() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    if (email == null || nome == null) {
        alert("Voce precisa fazer login para acessar esta pagina.");
        window.location = obterCaminhoLogin();
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = obterCaminhoLogin();
}

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
