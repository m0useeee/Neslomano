const toggleBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

toggleBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Показать' : 'Скрыть';
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorBlock = document.getElementById('errorMessage');

    if (!email || !password) {
        errorBlock.textContent = 'Заполните все поля';
        errorBlock.style.display = 'block';
        return;
    }

    if (email === 'ivanov@college.ru' && password === 'Qwerty123!') {
        errorBlock.style.display = 'none';
        alert('Успешный вход! Переход на главную страницу');
        window.location.href = 'tickets.html';
    } else {
        errorBlock.textContent = 'Неверный email или пароль';
        errorBlock.style.display = 'block';
    }
}