const form = document.getElementById("form");
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkForm();
});

email.addEventListener("blur", () => {
  checkInputEmail();
});

username.addEventListener("blur", () => {
  checkInputUsername();
});

function checkInputUsername(){
  const usernameValue = username.value.trim();

  if(usernameValue === ""){
    errorInput(username, "Preencha um username!");
  } else if(usernameValue.length < 3) {
    errorInput(username, "O username precisa ter no mínimo 3 caracteres.");
  } else {
    successInput(username);
  }
}

function checkInputEmail(){
  const emailValue = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(emailValue === ""){
    errorInput(email, "O email é obrigatório.");
  } else if (!emailRegex.test(emailValue)) {
    errorInput(email, "Insira um email válido.");
  } else {
    successInput(email);
  }
}

function checkInputPassword(){
  const passwordValue = password.value.trim();

  if(passwordValue === ""){
    errorInput(password, "A senha é obrigatória.");
  } else if(passwordValue.length < 8){
    errorInput(password, "A senha precisa ter no mínimo 8 caracteres.");
  } else {
    successInput(password);
  }
}

function checkInputPasswordConfirmation(){
  const passwordValue = password.value.trim();
  const confirmationPasswordValue = passwordConfirmation.value.trim();

  if(confirmationPasswordValue === ""){
    errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.");
  } else if(confirmationPasswordValue !== passwordValue){
    errorInput(passwordConfirmation, "As senhas não são iguais.");
  } else {
    successInput(passwordConfirmation);
  }
}

function checkForm(){
  checkInputUsername();
  checkInputEmail();
  checkInputPassword();
  checkInputPasswordConfirmation();

  const formItems = form.querySelectorAll(".form-content");

  const isValid = [...formItems].every((item) => {
    return item.classList.contains("success");
  });

  if(isValid){
<<<<<<< HEAD
    alert("CADASTRADO COM SUCESSO!")
 }

=======
    alert("CADASTRADO COM SUCESSO!");
    // Aqui você pode fazer um envio real do formulário
  }
>>>>>>> 28a50ad4d778e13a06b3cf6b589560d1727ce569
}

function errorInput(input, message){
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a");

  textMessage.innerText = message;
  formItem.className = "form-content error";
}

function successInput(input){
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a");

  textMessage.innerText = "";
  formItem.className = "form-content success";
}

const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Rota de Cadastro
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Verificar se o email já está cadastrado
    const existingUser = await prisma.users.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const user = await prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role: 'CUSTOMER'
        }
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso', user });
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Buscar o usuário pelo email
    const user = await prisma.users.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com o hash no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso', user });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});



