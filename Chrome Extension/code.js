document.getElementById("changeBtn").addEventListener("click", function () {
    const greeting = document.getElementById("greeting");
    greeting.textContent = greeting.textContent === "Hello, User!" ? "Welcome Back!" : "Hello, User!";
  });
  