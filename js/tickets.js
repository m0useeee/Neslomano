const allTickets = [
    { id: 1, equipment: 'Принтер HP LaserJet', reporter: 'Иванов И.', room: '101', branch: 'Главный', status: 'new', created: '2026-09-01 10:15', description: 'Не печатает, ошибка 0x0001' },
    { id: 2, equipment: 'Ноутбук Lenovo', reporter: 'Петрова А.', room: '202', branch: 'Ленина', status: 'in_progress', created: '2026-08-28 14:30', description: 'Не включается, мигает индикатор' },
    { id: 3, equipment: 'Проектор Epson', reporter: 'Сидоров С.', room: '303', branch: 'Мира', status: 'completed', created: '2026-08-20 09:00', description: 'Нет изображения, замена лампы' },
    { id: 4, equipment: 'МФУ Canon', reporter: 'Козлова О.', room: '101', branch: 'Главный', status: 'new', created: '2026-09-02 11:45', description: 'Застревает бумага' },
    { id: 5, equipment: 'Компьютер Dell', reporter: 'Михайлов Д.', room: '202', branch: 'Ленина', status: 'new', created: '2026-09-02 09:20', description: 'Синий экран при загрузке' },
];

const currentUserRole = 'user';

let currentPage = 1;
let pageSize = 10;
let filteredTickets = [...allTickets];

const tbody = document.getElementById('ticketsBody');
const paginationDiv = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const filterRoom = document.getElementById('filterRoom');
const filterBranch = document.getElementById('filterBranch');
const pageSizeSelect = document.getElementById('pageSize');

function render() {
    applyFilters();
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
            let actionsHtml = `<a href="ticket-detail.html?id=${t.id}" class="action-btn" title="Просмотр">[Просмотр]</a>`;
            if (currentUserRole === 'admin') {
                actionsHtml += ` <button class="action-btn" title="Изменить статус">[Изменить]</button>`;
            }
            html += `<tr>
                <td>${t.id}</td>
                <td>${t.equipment}</td>
                <td>${t.reporter}</td>
                <td>${t.room}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${t.created}</td>
                <td style="text-align: center;">${actionsHtml}</td>
            </tr>`;
        });
        tbody.innerHTML = html;
    }
    renderPagination(totalPages);
}

function applyFilters() {
    const search = searchInput.value.toLowerCase();
    const status = filterStatus.value;
    const room = filterRoom.value;
    const branch = filterBranch.value;
    filteredTickets = allTickets.filter(t => {
        const matchSearch = t.description.toLowerCase().includes(search) || t.equipment.toLowerCase().includes(search) || t.reporter.toLowerCase().includes(search);
        const matchStatus = status === 'all' || t.status === status;
        const matchRoom = room === 'all' || t.room === room;
        const matchBranch = branch === 'all' || t.branch === branch;
        return matchSearch && matchStatus && matchRoom && matchBranch;
    });
    filteredTickets.sort((a, b) => new Date(b.created) - new Date(a.created));
}

function renderPagination(totalPages) {
    if (totalPages === 0) { paginationDiv.innerHTML = ''; return; }
    let html = '';
    html += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>◀</button>`;
    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="goToPage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    html += `<button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>▶</button>`;
    paginationDiv.innerHTML = html;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredTickets.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    render();
}

searchInput.addEventListener('input', () => { currentPage = 1; render(); });
filterStatus.addEventListener('change', () => { currentPage = 1; render(); });
filterRoom.addEventListener('change', () => { currentPage = 1; render(); });
filterBranch.addEventListener('change', () => { currentPage = 1; render(); });
pageSizeSelect.addEventListener('change', function() {
    pageSize = parseInt(this.value);
    currentPage = 1;
    render();
});

render();