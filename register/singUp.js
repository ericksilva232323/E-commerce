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
  } else if(passwordValue.length < 3){
    errorInput(password, "A senha precisa ter no mínimo 3 caracteres.");
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
    alert("CADASTRADO COM SUCESSO!")
 }

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
