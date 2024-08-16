const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const number = document.getElementById("number")
const cpf = document.getElementById("cpf")
const password = document.getElementById("password")
const confPass = document.getElementById("confPass")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    checkForm();
})

function checkInputUsername() {
    const usernameValue = username.value;

    if (usernameValue === "") {
        errorInput(username, "fill the Username")
    } else {
        const formItem = username.parentElement;
        formItem.className = ""//class de onde estará a div para aparecer o erro
    }
}

function checkInputEmail() {
    const emailValue = email.value;

    if (emailValue === "") {
        errorInput(email, "email is mandatory")
    } else {
        const formItem = email.parentElement;
        formItem.classList = ""//class de onde estará a div para aparecer o erro
    }
}

function checkInputNumber() {
    const numberValue = number.value;

    if (numberValue === "") {
        error(numberValue, "number is mandatoryr")
    } else {
        const formItem = number.parentElement;
        formItem.classList = ""//class de onde estará a div para aparecer o erro
    }
}

function checkInputCpf() {
    const cpfValue = cpf.value;

    if (cpfValue === "") {
        error(cpfValue, "fill the CPF")
    } else {
        const formItem = cpf.parentElement;
        formItem.classList = ""//class de onde estará a div para aparecer o erro
    }
}

function checkInputPassword() {
    const passwordValue = password.value;

    if (passwordValue === "") {
        errorInput(password, "fill the Password")
    } else if (passwordValue.length < 8) {
        errorInput(password, "minimum 8 characters")
    } else {
        const formItem = password.parentElement;
        formItem.className = ""//class de onde estará a div para aparecer o erro
    }
}

function checkInputConfpass() {
    const passwordValue = password.value;
    const confPassValue = confPass.value;

    if (confPassValue === "") {
        errorInput(confPass, "PassWord confirmation is mandatory")
    } else if (confPassValue !== passwordValue) {
        errorInput(confPass, "Password valid")
    } else {
        const formItem = confPass.parentElement;
        formItem.className = ""//class de onde estará a div para aparecer o erro
    }
}


function checkForm() {
    checkInputUsername();
    checkInputEmail();
    checkInputNumber();
    checkInputCpf();
    checkInputPassword();
    checkInputConfpass();

    const formItem = form.querySelectorAll("")//class de onde estará a div para aparecer o erro

    const isValid = [...formItem].every((item) => {
        return item.className === ""//class de onde estará a div para aparecer o erro
    });

    if (isValid) {
        alert("registration completed successfully")
    }
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = ""//class de onde estará a div para aparecer o erro
}
