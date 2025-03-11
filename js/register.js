document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
  
    // Obtener usuarios registrados o crear un array vacío
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      alert("El usuario ya existe, por favor elige otro nombre.");
      return;
    }
  
    // Agregar el nuevo usuario y actualizar localStorage
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "index.html";
  });
  