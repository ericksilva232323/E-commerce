document.getElementById('form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission to handle via JavaScript

  const name = document.getElementById('name').value;
  const subname = document.getElementById('subname').value;
  const email = document.getElementById('email').value;
  const number = document.getElementById('number').value;
  const password = document.getElementById('password').value;

  const data = {
    name,
    subname,
    email,
    number,
    password
  };

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text(); // Get raw text first
    console.log(responseText); // Log the response text to check what's being returned

    if (!response.ok) {
      // If response isn't OK (e.g., status code 400 or 500), handle the error
      throw new Error('Failed to create user');
    }

    try {
      const jsonData = JSON.parse(responseText); // Manually parse JSON
      if (jsonData.message) {
        alert(jsonData.message); // Show success message
        window.location.href= '../home/home.html';
      }

      // Handle any errors returned by the server (e.g., validation errors)
      if (jsonData.errors) {
        jsonData.errors.forEach((error) => {
          const errorElement = document.getElementById(`${error.param}-error`);
          if (errorElement) {
            errorElement.textContent = error.msg;
          }
        });
      }
    } catch (error) {
      console.error('Erro ao processar a resposta do servidor', error);
      alert('Erro ao processar a resposta do servidor');
    }
  } catch (error) {
    console.error('Erro ao enviar dados para o servidor', error);
    alert('Erro ao enviar dados para o servidor');
  }
});
