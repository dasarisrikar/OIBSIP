let isLogin = true;

const title = document.getElementById("form-title");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");
const toggleLink = document.getElementById("toggle-link");
const switchMsg = document.getElementById("switch-msg");
const responseMsg = document.getElementById("response");

submitBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    responseMsg.style.color = "red";
    responseMsg.innerText = "Please enter both username and password.";
    return;
  }

  const url = isLogin ? "/login" : "/register";

  try {
    const res = await fetch("http://localhost:3000" + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      if (isLogin) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } else {
        responseMsg.style.color = "green";
        responseMsg.innerText = "Registered successfully! You can login now.";
      }
    } else {
      responseMsg.style.color = "red";
      responseMsg.innerText = data.error || data.message || "An error occurred.";
    }
  } catch (err) {
    responseMsg.style.color = "red";
    responseMsg.innerText = "Server error. Make sure backend is running.";
  }
});

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  title.innerText = isLogin ? "Login" : "Register";
  submitBtn.innerText = isLogin ? "Login" : "Register";
  switchMsg.innerHTML = isLogin
    ? `Don't have an account? <a href="#" id="toggle-link">Register</a>`
    : `Already have an account? <a href="#" id="toggle-link">Login</a>`;
  document.getElementById("toggle-link").addEventListener("click", toggleLinkClick);
  responseMsg.innerText = "";
});

function toggleLinkClick(e) {
  e.preventDefault();
  isLogin = !isLogin;
  title.innerText = isLogin ? "Login" : "Register";
  submitBtn.innerText = isLogin ? "Login" : "Register";
  switchMsg.innerHTML = isLogin
    ? `Don't have an account? <a href="#" id="toggle-link">Register</a>`
    : `Already have an account? <a href="#" id="toggle-link">Login</a>`;
  document.getElementById("toggle-link").addEventListener("click", toggleLinkClick);
  responseMsg.innerText = "";
}

// attach initially
toggleLink.addEventListener("click", toggleLinkClick);
