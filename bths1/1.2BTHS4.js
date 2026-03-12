let students = [

];
let sortDirection = '';

const studentBody = document.getElementById('studentBody');
const searchInput = document.getElementById('searchInput');
const filterRank = document.getElementById('filterRank');
const sortScoreHeader = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');

function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

function applyFilters() {
    const keyword = searchInput.value.toLowerCase().trim();
    const rankValue = filterRank.value;

    let filteredStudents = students.filter(student => {
        const matchName = student.name.toLowerCase().includes(keyword);
        const matchRank = (rankValue === "All") || (student.rank === rankValue);
        return matchName && matchRank;
    });

    if (sortDirection === 'asc') {
        filteredStudents.sort((a, b) => a.score - b.score);
        sortIcon.textContent = '▲';
    } else if (sortDirection === 'desc') {
        filteredStudents.sort((a, b) => b.score - a.score);
        sortIcon.textContent = '▼';
    } else {
        sortIcon.textContent = '';
    }

    renderTable(filteredStudents);
}

function renderTable(dataToRender) {
    studentBody.innerHTML = '';
    let totalScore = 0;

    if (dataToRender.length === 0) {
        studentBody.innerHTML = `<tr><td colspan="5" class="empty-message">Không có kết quả</td></tr>`;
        document.getElementById('totalStudents').textContent = 0;
        document.getElementById('averageScore').textContent = "0.0";
        return;
    }

    dataToRender.forEach((student, index) => {
        const tr = document.createElement('tr');
        if (student.score < 5.0) tr.classList.add('row-yeu');
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score.toFixed(1)}</td>
            <td>${student.rank}</td>
            <td><button class="btn-delete" data-id="${student.id}">Xóa</button></td>
        `;
        studentBody.appendChild(tr);
        totalScore += student.score;
    });

    document.getElementById('totalStudents').textContent = dataToRender.length;
    document.getElementById('averageScore').textContent = (totalScore / dataToRender.length).toFixed(1);
}

searchInput.addEventListener('input', applyFilters);
filterRank.addEventListener('change', applyFilters);

sortScoreHeader.addEventListener('click', () => {
    if (sortDirection === '' || sortDirection === 'desc') {
        sortDirection = 'asc';
    } else {
        sortDirection = 'desc';
    }
    applyFilters();
});

document.getElementById('btnAdd').addEventListener('click', () => {
    const name = document.getElementById('inputName').value.trim();
    const score = parseFloat(document.getElementById('inputScore').value);

    if (!name || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({
        id: Date.now(),
        name: name,
        score: score,
        rank: getRank(score)
    });

    document.getElementById('inputName').value = '';
    document.getElementById('inputScore').value = '';
    document.getElementById('inputName').focus();

    applyFilters();
});

document.getElementById('inputScore').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('btnAdd').click();
    }
});

studentBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = Number(e.target.getAttribute('data-id'));
        students = students.filter(student => student.id !== idToDelete);
        applyFilters();
    }
});

applyFilters();