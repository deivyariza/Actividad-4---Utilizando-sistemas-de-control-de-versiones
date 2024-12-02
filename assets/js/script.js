document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (validateForm(username, email)) {
        addUser(username, email);
        displayMessage("Usuario agregado exitosamente", "success");
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    }
});

function validateForm(username, email) {
    if (username.trim() === "" || email.trim() === "") {
        displayMessage("Todos los campos son obligatorios", "error");
        return false;
    }
    if (!validateEmail(email)) {
        displayMessage("El correo electrónico no es válido", "error");
        return false;
    }
    return true;
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

function addUser(username, email) {
    const userList = document.getElementById('userList');
    
    const li = document.createElement('li');
    li.innerHTML = `<span>${username} (${email})</span> <button onclick="removeUser(this)">Eliminar</button>`;
    
    userList.appendChild(li);
}

function removeUser(button) {
    const li = button.parentElement;
    li.remove();
    displayMessage("Usuario eliminado", "success");
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.classList.remove('hidden', 'success', 'error');
    messageDiv.classList.add(type);
    messageDiv.textContent = message;
    setTimeout(() => messageDiv.classList.add('hidden'), 3000);
}
