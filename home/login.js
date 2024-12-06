async function checkAuth() {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
      // No token or user ID, show login form
      document.getElementById("login-form").style.display = "block";
      document.getElementById("profile").style.display = "none";
      return;
  }

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: "GET",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.ok) {
          const userData = await response.json();
          document.getElementById("login-form").style.display = "none";
          document.getElementById("profile").style.display = "block";

          // Update profile data
          document.getElementById("username").textContent = userData.name;
          document.getElementById("user-email").textContent = userData.email;
      } else {
          // Token might be invalid or expired
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          document.getElementById("login-form").style.display = "block";
          document.getElementById("profile").style.display = "none";
      }
  } catch (error) {
      console.error("Error checking auth:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      document.getElementById("login-form").style.display = "block";
      document.getElementById("profile").style.display = "none";
  }
}

// Login handler
document.getElementById("login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
          // Save token and user ID
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userId", data.user.id);

          // Reload to show profile data
          checkAuth();
      } else {
          document.getElementById("login-error").textContent = data.error || "Login failed";
      }
  } catch (error) {
      console.error("Error during login:", error);
      document.getElementById("login-error").textContent = "Internal error during login";
  }
});

// Logout handler
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  checkAuth(); // Reload to show login form
});