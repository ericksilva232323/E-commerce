router.post('/register', [
  body('username').notEmpty().withMessage('O nome de usuário é obrigatório'),
  body('password').isLength({ min: 4 }).withMessage('A senha deve ter pelo menos 4 caracteres'),
  body('email').isEmail().withMessage('O email deve ser válido'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';

<<<<<<< HEAD
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
=======
  db.query(query, [username, hashedPassword, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, username });
>>>>>>> 4d7a546d405be53ebd9d334baad1985219c4c831
  });
});
