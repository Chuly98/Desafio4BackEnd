document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        errorMessage.textContent = ""; // Limpia cualquier mensaje de error anterior

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            // Realiza una solicitud al servidor para iniciar sesión
            const response = await fetch("/api/sessions/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Redirecciona al usuario después de iniciar sesión
                window.location.href = "/home";
            } else {
                // Muestra un mensaje de error si las credenciales son incorrectas
                const data = await response.json();
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            errorMessage.textContent = "Error al iniciar sesión. Inténtalo de nuevo más tarde.";
        }
    });
});