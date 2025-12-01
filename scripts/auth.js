const loginForm = document.getElementById("login");
const registerForm = document.getElementById("cadastrar");

const choice = localStorage.getItem("form");

if (choice === "cadastrar") {
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
} else {
  registerForm.style.display = "none";
  loginForm.style.display = "flex";
}

localStorage.removeItem("form");

const $ = (id) => document.getElementById(id);

const termsCheckbox = $("check");
const errorMsg = $("msg");
const passwordInput = $("password");
const passwordConfirmInput = $("passwordConfirm");
const contactInput = $("contact");

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "flex";
}

function hideError() {
  errorMsg.textContent = "";
  errorMsg.style.display = "none";
}

function validateForm() {
  hideError();

  if (termsCheckbox && !termsCheckbox.checked) {
    showError("Concorde com os termos.");
    return false;
  }

  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  if (password !== passwordConfirm) {
    showError("As senhas precisam ser iguais.");
    return false;
  }

  const digits = contactInput.value.replace(/\D/g, "");

  if (digits.length !== 13) {
    showError("Telefone incompleto.");
    return false;
  }

  return true;
}

if (termsCheckbox) {
  termsCheckbox.addEventListener("change", hideError);
}

passwordInput.addEventListener("input", hideError);
passwordConfirmInput.addEventListener("input", hideError);

if (passwordInput && passwordConfirmInput) {
  const checkPasswordsLive = () => {
    if (passwordConfirmInput.value.length === 0) {
      hideError();
      return;
    }

    if (passwordInput.value !== passwordConfirmInput.value) {
      showError("As senhas precisam ser iguais.");
    } else {
      hideError();
    }
  };

  passwordInput.addEventListener("input", checkPasswordsLive);
  passwordConfirmInput.addEventListener("input", checkPasswordsLive);
}

if (contactInput) {
  contactInput.addEventListener("input", () => {
    hideError();

    let digits = contactInput.value.replace(/\D/g, "");

    if (!digits.startsWith("55")) {
      digits = "55" + digits;
    }

    digits = digits.slice(0, 13);

    let formatted = digits
      .replace(/^(\d{2})(\d)/, "$1($2")
      .replace(/^(\d{2})\((\d{2})(\d)/, "$1($2)$3")
      .replace(/^(\d{2})\((\d{2})\)(\d)(\d{4})(\d)/, "$1($2)$3$4-$5");

    contactInput.value = formatted;
  });

  contactInput.addEventListener("paste", (ev) => {
    ev.preventDefault();
    const pasted = (ev.clipboardData || window.clipboardData).getData("text");
    const onlyNums = pasted.replace(/\D/g, "").slice(0, 13);
    contactInput.value = onlyNums;
    contactInput.dispatchEvent(new Event("input"));
  });
}
