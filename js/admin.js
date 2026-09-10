// ===== МОК-ДАННЫЕ ДЛЯ ЗАЯВОК (админ) =====
const adminTickets = [
    { id: 1, equipment: 'Принтер HP LaserJet', reporter: 'Иванов И.', room: '101', branch: 'Главный', status: 'new', created: '2026-09-01 10:15', description: 'Не печатает, ошибка 0x0001' },
    { id: 2, equipment: 'Ноутбук Lenovo', reporter: 'Петрова А.', room: '202', branch: 'Ленина', status: 'in_progress', created: '2026-08-28 14:30', description: 'Не включается, мигает индикатор' },
    { id: 3, equipment: 'Проектор Epson', reporter: 'Сидоров С.', room: '303', branch: 'Мира', status: 'completed', created: '2026-08-20 09:00', description: 'Нет изображения, замена лампы' },
    { id: 4, equipment: 'МФУ Canon', reporter: 'Козлова О.', room: '101', branch: 'Главный', status: 'new', created: '2026-09-02 11:45', description: 'Застревает бумага' },
    { id: 5, equipment: 'Компьютер Dell', reporter: 'Михайлов Д.', room: '202', branch: 'Ленина', status: 'new', created: '2026-09-02 09:20', description: 'Синий экран при загрузке' },
    { id: 6, equipment: 'Принтер Samsung', reporter: 'Смирнова Е.', room: '303', branch: 'Мира', status: 'in_progress', created: '2026-08-30 16:00', description: 'Шумит при печати' },
    { id: 7, equipment: 'Ноутбук Acer', reporter: 'Кузнецов А.', room: '101', branch: 'Главный', status: 'completed', created: '2026-08-25 12:30', description: 'Замена клавиатуры' },
];

// ===== ПЕРЕМЕННЫЕ =====
let currentPage = 1;
let pageSize = 10;
let filteredTickets = [...adminTickets];

// ===== ЭЛЕМЕНТЫ DOM =====
const tbody = document.getElementById('adminTicketsBody');
const paginationDiv = document.getElementById('adminPagination');
const searchInput = document.getElementById('adminSearchInput');
const filterStatus = document.getElementById('adminFilterStatus');
const filterRoom = document.getElementById('adminFilterRoom');
const filterBranch = document.getElementById('adminFilterBranch');
const pageSizeSelect = document.getElementById('adminPageSize');

// ===== ВКЛАДКИ =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.tab;
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === target) content.classList.add('active');
        });
    });
});

// ===== ОТРИСОВКА ТАБЛИЦЫ =====
function renderAdminTickets() {
    applyAdminFilters();
    const totalItems = filteredTickets.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage > totalPages) currentPage = 1;
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, totalItems);
    const pageItems = filteredTickets.slice(start, end);

    if (pageItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="no-data">Нет заявок</td></tr>`;
    } else {
        let html = '';
        pageItems.forEach(t => {
            const statusClass = t.status === 'new' ? 'status-new' : (t.status === 'in_progress' ? 'status-in_progress' : 'status-completed');
            const statusText = t.status === 'new' ? 'Новая' : (t.status === 'in_progress' ? 'В работе' : 'Завершена');
            html += `<tr>
                <td>${t.id}</td>
                <td>${t.equipment}</td>
                <td>${t.reporter}</td>
                <td>${t.room}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${t.created}</td>
                <td style="text-align: center;">
                    <select class="status-select" data-id="${t.id}">
                        <option value="new" ${t.status === 'new' ? 'selected' : ''}>Новая</option>
                        <option value="in_progress" ${t.status === 'in_progress' ? 'selected' : ''}>В работе</option>
                        <option value="completed" ${t.status === 'completed' ? 'selected' : ''}>Завершена</option>
                    </select>
                    <button class="action-btn apply-status" data-id="${t.id}" title="Применить статус">Применить</button>
                    <a href="admin.html?delete=${t.id}" class="action-btn" onclick="return confirm('Удалить заявку #${t.id}?')">Удалить</a>
                </td>
            </tr>`;
        });
        tbody.innerHTML = html;
    }
    renderAdminPagination(totalPages);

    document.querySelectorAll('.apply-status').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const select = document.querySelector(`.status-select[data-id="${id}"]`);
            const newStatus = select.value;
            changeStatus(id, newStatus);
        });
    });
}

function applyAdminFilters() {
    const search = searchInput.value.toLowerCase();
    const status = filterStatus.value;
    const room = filterRoom.value;
    const branch = filterBranch.value;
    filteredTickets = adminTickets.filter(t => {
        const matchSearch = t.description.toLowerCase().includes(search) || t.equipment.toLowerCase().includes(search) || t.reporter.toLowerCase().includes(search);
        const matchStatus = status === 'all' || t.status === status;
        const matchRoom = room === 'all' || t.room === room;
        const matchBranch = branch === 'all' || t.branch === branch;
        return matchSearch && matchStatus && matchRoom && matchBranch;
    });
    filteredTickets.sort((a, b) => new Date(b.created) - new Date(a.created));
}

function renderAdminPagination(totalPages) {
    if (totalPages === 0) { paginationDiv.innerHTML = ''; return; }
    let html = '';
    html += `<button onclick="goToAdminPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>◀</button>`;
    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="goToAdminPage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    html += `<button onclick="goToAdminPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>▶</button>`;
    paginationDiv.innerHTML = html;
}

function goToAdminPage(page) {
    const totalPages = Math.ceil(filteredTickets.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderAdminTickets();
}

function changeStatus(id, newStatus) {
    const ticket = adminTickets.find(t => t.id === id);
    if (ticket) {
        ticket.status = newStatus;
        alert(`Статус заявки #${id} изменён на "${newStatus === 'new' ? 'Новая' : newStatus === 'in_progress' ? 'В работе' : 'Завершена'}"`);
        renderAdminTickets();
    }
}

// ===== ОБРАБОТЧИКИ ФИЛЬТРОВ =====
searchInput.addEventListener('input', () => { currentPage = 1; renderAdminTickets(); });
filterStatus.addEventListener('change', () => { currentPage = 1; renderAdminTickets(); });
filterRoom.addEventListener('change', () => { currentPage = 1; renderAdminTickets(); });
filterBranch.addEventListener('change', () => { currentPage = 1; renderAdminTickets(); });
pageSizeSelect.addEventListener('change', function() {
    pageSize = parseInt(this.value);
    currentPage = 1;
    renderAdminTickets();
});

// ===== ИМПОРТ ОБОРУДОВАНИЯ ИЗ CSV =====
const importDropZone = document.getElementById('importDropZone');
const importFileInput = document.getElementById('importFileInput');
const importPreview = document.getElementById('importPreview');
const importFileName = document.getElementById('importFileName');
const importRemoveBtn = document.getElementById('importRemoveBtn');
const importError = document.getElementById('importError');
const importBtn = document.getElementById('importBtn');
let importedFile = null;

importDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    importDropZone.classList.add('dragover');
});
importDropZone.addEventListener('dragleave', () => {
    importDropZone.classList.remove('dragover');
});
importDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    importDropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleImportFile(files[0]);
});
importDropZone.addEventListener('click', () => importFileInput.click());
importFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleImportFile(e.target.files[0]);
});

function handleImportFile(file) {
    if (!file.name.endsWith('.csv')) {
        importError.textContent = 'Ошибка: Поддерживается только формат CSV';
        importError.style.display = 'block';
        clearImportPreview();
        return;
    }
    importError.style.display = 'none';
    importedFile = file;
    importFileName.textContent = file.name;
    importPreview.style.display = 'flex';
    importFileInput.value = '';
}

function clearImportPreview() {
    importedFile = null;
    importPreview.style.display = 'none';
    importFileName.textContent = '';
    importError.style.display = 'none';
}

importRemoveBtn.addEventListener('click', clearImportPreview);

importBtn.addEventListener('click', function() {
    if (!importedFile) {
        importError.textContent = 'Ошибка: Выберите CSV-файл';
        importError.style.display = 'block';
        return;
    }
    // Имитация отправки на сервер (в реальном проекте будет fetch)
    alert(`Импорт оборудования из файла "${importedFile.name}" выполнен (имитация).`);
    clearImportPreview();
});

// ===== ЭКСПОРТ ОТЧЁТА (ЗАГЛУШКА) =====
document.getElementById('exportBtn').addEventListener('click', function() {
    alert('Скачивание CSV-отчёта (реализация будет позже)');
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
renderAdminTickets();