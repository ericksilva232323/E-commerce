const API_BASE_URL = "http://localhost:3000"; // Adjust to your backend URL

// DOM elements
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const profileSection = document.getElementById("profile");
const usernameDisplay = document.getElementById("username");
const userEmailDisplay = document.getElementById("user-email");
const logoutButton = document.getElementById("logout");

// Check if the user is logged in
function checkAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    // Fetch user profile
    fetch(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return response.json();
      })
      .then((data) => {
        showProfile(data);
      })
      .catch(() => {
        logout();
      });
  }
}

// Handle login form submission
document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      showProfile(data.user);
    })
    .catch((error) => {
      loginError.textContent = error.message;
    });
});

// Show profile section
function showProfile(user) {
  loginForm.style.display = "none";
  profileSection.style.display = "block";
  usernameDisplay.textContent = user.nome;
  userEmailDisplay.textContent = user.email;
}

// Handle logout
logoutButton.addEventListener("click", () => {
  logout();
});

function logout() {
  localStorage.removeItem("token");
  loginForm.style.display = "block";
  profileSection.style.display = "none";
}

// Initialize
checkAuth();
