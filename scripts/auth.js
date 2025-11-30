// Seleção de ids
const login = document.getElementById("login");
const cadastrar = document.getElementById("cadastrar");

const escolha = localStorage.getItem("form"); // Verifica e guarda qual foi escolhido, cadastrar ou logar

// Funções para selecionar o formulario
if (escolha === "cadastrar") {
  login.style.display = "none";
  cadastrar.style.display = "flex";
} else {
  cadastrar.style.display = "none";
  login.style.display = "flex";
}

localStorage.removeItem("form"); // Apaga o valor que foi selecionado

//Confirmação dos termos
function validar() {
  const checkbox = document.getElementById("check");
  const mensagem = document.getElementById("msg");

  if (!checkbox.checked) {
    mensagem.textContent = "Marque o campo para continuar.";
    return false;
  } else {
    mensagem.textContent = "";
    return true;
  }
}
