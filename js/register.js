const toggleBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');

toggleBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    confirmInput.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Показать' : 'Скрыть';
});

const passwordField = document.getElementById('password');
const reqUpper = document.getElementById('reqUpper');
const reqDigit = document.getElementById('reqDigit');
const reqSpecial = document.getElementById('reqSpecial');

passwordField.addEventListener('input', function() {
    const val = this.value;
    const hasUpper = /[A-Z]/.test(val);
    const hasDigit = /[0-9]/.test(val);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    reqUpper.className = hasUpper ? 'valid' : 'invalid';
    reqUpper.textContent = hasUpper ? '✔ заглавную букву' : 'заглавную букву';
    reqDigit.className = hasDigit ? 'valid' : 'invalid';
    reqDigit.textContent = hasDigit ? '✔ цифру' : 'цифру';
    reqSpecial.className = hasSpecial ? 'valid' : 'invalid';
    reqSpecial.textContent = hasSpecial ? '✔ спецсимвол' : 'спецсимвол';
});

function handleRegister(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    const errorBlock = document.getElementById('errorMessage');
    const successBlock = document.getElementById('successMessage');

    errorBlock.style.display = 'none';
    successBlock.style.display = 'none';

    if (!fullName || !email || !password || !confirm) {
        errorBlock.textContent = 'Заполните все поля';
        errorBlock.style.display = 'block';
        return;
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!hasUpper || !hasDigit || !hasSpecial) {
        errorBlock.textContent = 'Пароль должен содержать заглавную букву, цифру и спецсимвол';
        errorBlock.style.display = 'block';
        return;
    }

    if (password !== confirm) {
        errorBlock.textContent = 'Пароли не совпадают';
        errorBlock.style.display = 'block';
        return;
    }

    successBlock.style.display = 'block';
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}