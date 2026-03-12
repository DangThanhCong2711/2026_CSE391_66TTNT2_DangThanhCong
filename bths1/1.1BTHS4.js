let students = [];

const inputName = document.getElementById('inputName');
const inputScore = document.getElementById('inputScore');
const btnAdd = document.getElementById('btnAdd');
const studentBody = document.getElementById('studentBody');
const totalStudents = document.getElementById('totalStudents');
const averageScore = document.getElementById('averageScore');

function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

function renderTable() {
    studentBody.innerHTML = '';
    let totalScore = 0;

    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        
        if (student.score < 5.0) {
            tr.classList.add('row-yeu');
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score.toFixed(1)}</td>
            <td>${student.rank}</td>
            <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
        `;
        studentBody.appendChild(tr);

        totalScore += student.score;
    });

    totalStudents.textContent = students.length;
    if (students.length > 0) {
        averageScore.textContent = (totalScore / students.length).toFixed(1);
    } else {
        averageScore.textContent = "0.0";
    }
}

function addStudent() {
    const name = inputName.value.trim();
    const score = parseFloat(inputScore.value);

    if (name === "") {
        alert("Vui lòng nhập họ tên!");
        return;
    }
    if (isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập điểm hợp lệ từ 0 đến 10!");
        return;
    }

    students.push({
        name: name,
        score: score,
        rank: getRank(score)
    });

    inputName.value = '';
    inputScore.value = '';
    inputName.focus();

    renderTable();
}

btnAdd.addEventListener('click', addStudent);

inputScore.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addStudent();
    }
});

studentBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-delete')) {
        const index = event.target.getAttribute('data-index');
        students.splice(index, 1);
        renderTable();
    }
});