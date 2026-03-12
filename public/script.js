const API = 'http://localhost:5000/api';

function showLogin() {
    document.getElementById('reg-card').classList.add('hidden');
    document.getElementById('login-card').classList.remove('hidden');
}

function showReg() {
    document.getElementById('login-card').classList.add('hidden');
    document.getElementById('reg-card').classList.remove('hidden');
}

async function checkAuth() {
    try {
        const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
        const info = document.getElementById('user-info');
        const regCard = document.getElementById('reg-card');
        const loginCard = document.getElementById('login-card');
        const content = document.getElementById('content');
        const welcomeName = document.getElementById('welcome-name');

        if (res.ok) {
            const user = await res.json();
            info.innerHTML = `<span>${user.name}</span> <button onclick="logout()" style="margin-left:15px">Выйти</button>`;
            regCard.classList.add('hidden');
            loginCard.classList.add('hidden');
            content.classList.remove('hidden');
            welcomeName.innerText = `Золотая коллекция ${user.name}`;
        } else {
            info.innerHTML = '<button onclick="showLogin()">Вход</button>';
        }
    } catch (err) {
        console.error('Ошибка сервера');
    }
}

document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('rName').value,
        email: document.getElementById('rEmail').value,
        password: document.getElementById('rPass').value
    };
    const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if (res.ok) {
        alert('Регистрация успешна!');
        showLogin();
    }
};

document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: document.getElementById('lEmail').value,
            password: document.getElementById('lPass').value
        }),
        credentials: 'include'
    });
    if (res.ok) location.reload();
    else alert('Доступ отклонен');
};

async function logout() {
    await fetch(`${API}/auth/logout`, { method: 'POST', credentials: 'include' });
    location.reload();
}

checkAuth();
