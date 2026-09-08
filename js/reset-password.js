const form = document.getElementById('resetForm');
const emailInput = document.getElementById('email');
const errorDiv = document.getElementById('errorMessage');
const successDiv = document.getElementById('successMessage');

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    errorDiv.textContent = '';

    const email = emailInput.value.trim();

    if (!email) {
        errorDiv.textContent = 'Введите email';
        errorDiv.style.display = 'block';
        return;
    }

    if (!isValidEmail(email)) {
        errorDiv.textContent = 'Введите корректный email (например, user@example.com)';
        errorDiv.style.display = 'block';
        return;
    }

    successDiv.style.display = 'block';
    console.log(`Ссылка для сброса отправлена на ${email}`);

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2500);
});

emailInput.addEventListener('input', function() {
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
});