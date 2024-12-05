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
  const userId = localStorage.getItem("userId");

  if (token && userId) {
    // Fetch user profile
    fetch(`${API_BASE_URL}/user/${userId}`, {
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
        showProfile(data); // Display user info
      })
      .catch(() => {
        logout(); // If token is invalid, log out the user
      });
  } else {
    // If no token, show login form
    loginForm.style.display = "block";
    profileSection.style.display = "none";
  }
}

// Handle login form submission
document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${API_BASE_URL}/login`, {
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
      localStorage.setItem("token", data.token); // Store the JWT in localStorage
      localStorage.setItem("userId", data.user.token);
      showProfile(data.user); // Display the user's profile
    })
    .catch((error) => {
      loginError.textContent = error.message;
    });
});

// Show profile section
function showProfile(user) {
  loginForm.style.display = "none"; // Hide login form
  profileSection.style.display = "block"; // Show profile section
  usernameDisplay.textContent = user.name || user.nome; // Display user's name
  userEmailDisplay.textContent = user.email; // Display user's email
}

// Handle logout
logoutButton.addEventListener("click", () => {
  logout();
});

function logout() {
  localStorage.removeItem("token"); // Remove the JWT from localStorage
  loginForm.style.display = "block"; // Show login form
  profileSection.style.display = "none"; // Hide profile section
}

// Initialize on page load
checkAuth();
