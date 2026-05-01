function obterCaminhoLogin() {
    let caminhoAtual = window.location.pathname;
    let estaNaDashboard = caminhoAtual.indexOf("/dashboard/") > -1;

    if (estaNaDashboard) {
        return "../login.html";
    }

    return "./login.html";
}

function obterCaminhoPagina(pagina) {
    let caminhoAtual = window.location.pathname;
    let estaNaDashboard = caminhoAtual.indexOf("/dashboard/") > -1;

    if (estaNaDashboard) {
        return "../" + pagina;
    }

    return "./" + pagina;
}

function usuarioEstaLogado() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    return email != null && nome != null;
}

function atualizarCabecalho() {
    let linkDashboard = document.querySelector(".link-dashboard");
    let linkAuth = document.querySelector(".link-auth");
    let nomeUsuario = document.querySelector(".nome-usuario-header");
    let usuarioLogado = usuarioEstaLogado();

    if (linkDashboard) {
        linkDashboard.href = obterCaminhoPagina("dashboard/cards.html");

        if (usuarioLogado) {
            linkDashboard.style.display = "inline-flex";
        } else {
            linkDashboard.style.display = "none";
        }
    }

    if (linkAuth) {
        if (usuarioLogado) {
            linkAuth.textContent = "DESLOGAR";
            linkAuth.href = "#";
            linkAuth.onclick = function () {
                limparSessao();
                return false;
            };
        } else {
            linkAuth.textContent = "SUBSCRIBE";
            linkAuth.href = obterCaminhoPagina("cadastro.html");
            linkAuth.onclick = null;
        }
    }

    if (nomeUsuario && usuarioLogado) {
        nomeUsuario.textContent = sessionStorage.NOME_USUARIO;
    }
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

document.addEventListener("DOMContentLoaded", function () {
    atualizarCabecalho();
});
