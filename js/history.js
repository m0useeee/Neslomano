const equipmentData = {
    name: 'Принтер HP LaserJet',
    serial: 'SN-12345',
    room: '101',
    branch: 'Главный корпус'
};

const historyData = [
    { id: 1, date: '2026-09-01 10:15', description: 'Не печатает, ошибка 0x0001', status: 'new', photo: '#' },
    { id: 2, date: '2026-08-28 14:30', description: 'Замена картриджа', status: 'completed', photo: '#' },
    { id: 3, date: '2026-08-15 09:00', description: 'Профилактика, чистка головок', status: 'completed', photo: '#' },
    { id: 4, date: '2026-07-20 16:45', description: 'Не видит компьютер, замена USB-кабеля', status: 'in_progress', photo: '#' }
];

document.getElementById('equipName').textContent = equipmentData.name;
document.getElementById('serialNumber').textContent = equipmentData.serial;
document.getElementById('room').textContent = equipmentData.room;
document.getElementById('branch').textContent = equipmentData.branch;

const historyContainer = document.getElementById('historyItems');

function renderHistory() {
    if (historyData.length === 0) {
        historyContainer.innerHTML = `<div class="no-data">[Информация] История ремонтов отсутствует</div>`;
        return;
    }
    let html = '';
    historyData.forEach(item => {
        const statusClass = item.status === 'new' ? 'status-new' :
                           (item.status === 'in_progress' ? 'status-in_progress' : 'status-completed');
        const statusText = item.status === 'new' ? 'Новая' :
                          (item.status === 'in_progress' ? 'В работе' : 'Завершена');
        html += `<div class="history-item">
            <div class="item-main">
                <div class="item-title">Заявка #${item.id}</div>
                <div class="item-date">[Дата] ${item.date}</div>
                <p class="item-description">${item.description}</p>
            </div>
            <div class="item-meta">
                <span class="status-badge ${statusClass}">${statusText}</span>
                <a href="${item.photo}" class="photo-link" target="_blank">[Фото]</a>
            </div>
        </div>`;
    });
    historyContainer.innerHTML = html;
}

renderHistory();

document.querySelector('.btn-download-qr').addEventListener('click', function() {
    alert('[Информация] Скачивание QR-кода (реализация будет позже)');
});

console.log('Страница истории оборудования загружена');