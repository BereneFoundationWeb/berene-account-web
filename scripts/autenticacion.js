(() => {
    const loginBtn = document.getElementById("loginButton");
    const registerBtn = document.getElementById("registerButton");

    // --- Registro de usuario ---
    if (registerBtn) {
        registerBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value.trim();

            if (!name || !email || !password) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Guardamos usuarios en LocalStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Comprobar si ya existe el email
            if (users.some(u => u.email === email)) {
                alert("❌ Este correo ya está registrado.");
                return;
            }

            // Agregar usuario nuevo
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            // Guardar sesión activa
            localStorage.setItem("berene_auth", "ok");
            localStorage.setItem("berene_user", name);

            alert("✅ Registro exitoso. Bienvenido/a, " + name);
            window.location.href = "home.html";
        });
    }

    // --- Inicio de sesión ---
    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!email || !password) {
                alert("Completa todos los campos.");
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Guardar sesión
                localStorage.setItem("berene_auth", "ok");
                localStorage.setItem("berene_user", user.name);

                alert("✅ Inicio de sesión exitoso. Bienvenido/a, " + user.name);
                window.location.href = "home.html";
            } else {
                alert("❌ Email o contraseña incorrectos");
            }
        });
    }

    // --- Función para cerrar sesión (opcional) ---
    window.logout = function() {
        localStorage.removeItem("berene_auth");
        localStorage.removeItem("berene_user");
        alert("✅ Sesión cerrada");
        window.location.href = "index.html";
    }

})();
