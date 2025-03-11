document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value;
  
    // Recuperar usuarios registrados o inicializar un array vacío
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Agregar usuario por defecto si aún no existe
    if (!users.some(user => user.username === "admin")) {
      users.push({ username: "admin", password: "1234" });
      localStorage.setItem("users", JSON.stringify(users));
    }
    
    // Validar credenciales
    const userFound = users.find(user => user.username === usernameInput && user.password === passwordInput);
    if (userFound) {
      window.location.href = "shopping.html";
    } else {
      alert("Credenciales incorrectas. Intenta de nuevo o regístrate.");
    }
  });
  
