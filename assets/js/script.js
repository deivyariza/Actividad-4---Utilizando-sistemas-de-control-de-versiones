document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (validateForm(username, email)) {
        addUser(username, email);
        saveUsersToLocalStorage();
        displayMessage("Usuario agregado exitosamente", "success");
        document.getElementById("userForm").reset();
    }
});

// Validar formulario
function validateForm(username, email) {
    if (username.length < 3) {
        displayMessage("El nombre debe tener al menos 3 caracteres", "error");
        return false;
    }

    if (!validateEmail(email)) {
        displayMessage("El correo electrónico no es válido", "error");
        return false;
    }

    return true;
}

// Validar formato de email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Agregar usuario a la lista
function addUser(username, email) {
    const userList = document.getElementById("userList");
    const li = document.createElement("li");
    li.innerHTML = `<span>${username} (${email})</span> 
        <button onclick="removeUser(this)">Eliminar</button>`;
    userList.appendChild(li);
}

// Eliminar usuario
function removeUser(button) {
    button.parentElement.remove();
    saveUsersToLocalStorage();
    displayMessage("Usuario eliminado exitosamente", "success");
}

// Mostrar mensajes
function displayMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.className = "hidden";
    }, 3000);
}

// Persistencia en localStorage
function saveUsersToLocalStorage() {
    const users = [];
    document.querySelectorAll("#userList li span").forEach((span) => {
        users.push(span.textContent);
    });
    localStorage.setItem("users", JSON.stringify(users));
}

// Cargar usuarios desde localStorage
function loadUsersFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach((user) => {
        const [name, email] = user.split(" (");
        addUser(name, email.slice(0, -1));
    });
}

// Cargar usuarios al cargar la página
document.addEventListener("DOMContentLoaded", loadUsersFromLocalStorage);

