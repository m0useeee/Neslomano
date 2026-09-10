// ===== УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ =====
function openEditModal() {
    document.getElementById('editModal').style.display = 'flex';
}
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}
// Закрытие по клику на фон
document.getElementById('editModal').addEventListener('click', function(e) {
    if (e.target === this) closeEditModal();
});

// ===== ОБРАБОТКА ФОРМЫ РЕДАКТИРОВАНИЯ =====
const editForm = document.getElementById('editTicketForm');
editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newDescription = document.getElementById('modalDescription').value.trim();
    if (!newDescription) {
        alert('Описание не может быть пустым!');
        return;
    }
    // Имитация обновления – меняем текст на главной странице
    document.getElementById('ticketDescription').textContent = newDescription;
    alert('Заявка #123 обновлена (имитация)');
    closeEditModal();
});

// ===== DRAG & DROP ДЛЯ ФОТО (ЗАГЛУШКА) =====
const dropZone = document.getElementById('modalDropZone');
const fileInput = document.getElementById('modalFileInput');
const filePreview = document.getElementById('modalFilePreview');
const previewImage = document.getElementById('modalPreviewImage');
const fileName = document.getElementById('modalFileName');
const fileSize = document.getElementById('modalFileSize');
const removeFileBtn = document.getElementById('modalRemoveFileBtn');
const fileError = document.getElementById('modalFileError');

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
});

function handleFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        fileError.textContent = '[Ошибка] Поддерживаются только JPG и PNG';
        fileError.style.display = 'block';
        clearFilePreview();
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        fileError.textContent = '[Ошибка] Файл не должен превышать 10 МБ';
        fileError.style.display = 'block';
        clearFilePreview();
        return;
    }
    fileError.style.display = 'none';
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        fileName.textContent = file.name;
        fileSize.textContent = (file.size / 1024).toFixed(1) + ' КБ';
        filePreview.style.display = 'flex';
    };
    reader.readAsDataURL(file);
}

function clearFilePreview() {
    filePreview.style.display = 'none';
    previewImage.src = '#';
    fileName.textContent = '';
    fileSize.textContent = '';
    fileInput.value = '';
}

removeFileBtn.addEventListener('click', () => {
    clearFilePreview();
    fileError.style.display = 'none';
});

document.querySelector('.btn-download-photo')?.addEventListener('click', function() {
    alert('[Информация] Скачивание фото (будет реализовано позже)');
});