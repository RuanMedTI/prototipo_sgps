function attemptLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        alert("Login bem-sucedido!");
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos. Tente novamente.");
        // Limpar os campos de texto
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
}