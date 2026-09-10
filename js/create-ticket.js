// ===== МОК-ДАННЫЕ =====
const data = {
    cabinets: [
        { id: 1, name: '101' },
        { id: 2, name: '202' },
        { id: 3, name: '303' }
    ],
    equipment: [
        { id: 1, name: 'Принтер HP LaserJet', cabinet_id: 1, serial: 'SN-12345' },
        { id: 2, name: 'МФУ Canon', cabinet_id: 1, serial: 'SN-67890' },
        { id: 3, name: 'Ноутбук Lenovo', cabinet_id: 2, serial: 'SN-54321' },
        { id: 4, name: 'Компьютер Dell', cabinet_id: 2, serial: 'SN-11111' },
        { id: 5, name: 'Проектор Epson', cabinet_id: 3, serial: 'SN-99999' }
    ]
};

// ===== ЭЛЕМЕНТЫ DOM =====
const cabinetSelect = document.getElementById('cabinetSelect');
const equipmentSelect = document.getElementById('equipmentSelect');
const serialInput = document.getElementById('serialNumber');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const filePreview = document.getElementById('filePreview');
const previewImage = document.getElementById('previewImage');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeFileBtn = document.getElementById('removeFileBtn');
const fileError = document.getElementById('fileError');
const form = document.getElementById('createTicketForm');

// ===== ЗАПОЛНЯЕМ КАБИНЕТЫ =====
data.cabinets.forEach(cab => {
    const option = document.createElement('option');
    option.value = cab.id;
    option.textContent = cab.name;
    cabinetSelect.appendChild(option);
});

// ===== ПРИ ВЫБОРЕ КАБИНЕТА – ОБНОВЛЯЕМ ОБОРУДОВАНИЕ =====
cabinetSelect.addEventListener('change', function() {
    const cabinetId = parseInt(this.value);
    equipmentSelect.innerHTML = '<option value="">Выберите оборудование</option>';
    equipmentSelect.disabled = true;
    serialInput.value = '';

    if (cabinetId) {
        const filtered = data.equipment.filter(eq => eq.cabinet_id === cabinetId);
        filtered.forEach(eq => {
            const opt = document.createElement('option');
            opt.value = eq.id;
            opt.textContent = eq.name;
            equipmentSelect.appendChild(opt);
        });
        equipmentSelect.disabled = false;
    }
});

// ===== ПРИ ВЫБОРЕ ОБОРУДОВАНИЯ – ПОДСТАВЛЯЕМ СЕРИЙНЫЙ НОМЕР =====
equipmentSelect.addEventListener('change', function() {
    const eqId = parseInt(this.value);
    const found = data.equipment.find(eq => eq.id === eqId);
    serialInput.value = found ? found.serial : '';
});

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С ФОТО =====
let selectedFile = null;

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
    selectedFile = file;
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
    selectedFile = null;
    filePreview.style.display = 'none';
    previewImage.src = '#';
    fileName.textContent = '';
    fileSize.textContent = '';
    fileInput.value = '';
}

// ===== ОБРАБОТЧИКИ DRAG & DROP =====
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
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

// ===== УДАЛЕНИЕ ФОТО =====
removeFileBtn.addEventListener('click', () => {
    clearFilePreview();
    fileError.style.display = 'none';
});

// ===== ОТПРАВКА ФОРМЫ =====
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cabinet = cabinetSelect.value;
    const equipment = equipmentSelect.value;
    const serial = serialInput.value.trim();
    const description = document.getElementById('description').value.trim();

    if (!cabinet || !equipment || !serial || !description) {
        alert('[Внимание] Заполните все обязательные поля!');
        return;
    }
    if (!selectedFile) {
        alert('[Внимание] Загрузите фото поломки!');
        return;
    }
    alert('[OK] Заявка создана! (в реальном проекте будет отправка на сервер)');
});

// ===== СБРОС ФОРМЫ =====
form.addEventListener('reset', () => {
    clearFilePreview();
    fileError.style.display = 'none';
    cabinetSelect.value = '';
    equipmentSelect.innerHTML = '<option value="">Сначала выберите кабинет</option>';
    equipmentSelect.disabled = true;
    serialInput.value = '';
    document.querySelectorAll('input, textarea').forEach(el => el.value = '');
});