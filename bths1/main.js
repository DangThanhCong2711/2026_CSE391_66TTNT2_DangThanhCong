
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('table-body');
    if (tableBody) {
        danhsachhoithao.forEach((Sukien, ktra) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ktra + 1}</td>
                <td>${Sukien.Tenhoithao}</td>
                <td>${Sukien.diengia}</td>
                <td>${Sukien.email}</td>
                <td>${Sukien.NgayToChuc}</td>
                <td>${Sukien.DiDiem}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    const form = document.getElementById('addForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const Tenhoithao = document.getElementById('tenht').value.trim();
            const diengia = document.getElementById('diengia').value.trim();
            const email = document.getElementById('email').value.trim();
            const NgayToChuc = document.getElementById('date').value;
            const DiDiem = document.getElementById('diadiem').value;
            
            let errors = [];

            if (!Tenhoithao || !email || diengia || !DiDiem || NgayToChuc) {
                errors.push("Vui lòng không để trống các trường bắt buộc.");
            }

            if (Tenhoithao.length > 60) {
                errors.push("Họ tên không được vượt quá 60 ký tự.");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                errors.push("Email không đúng định dạng chuẩn.");
            }

            const sdtRegex = /^\d{10}$/;
            if (sdt && !sdtRegex.test(sdt)) {
                errors.push("Số điện thoại phải bao gồm đúng 10 chữ số.");
            }

            if (errors.length > 0) {
                // Hiển thị thông báo lỗi bằng tiếng Việt
                alert("ĐÃ XẢY RA LỖI:\n\n- " + errors.join("\n- "));
            } else {
                alert("Thêm nhân sự mới thành công!");
                // Cho phép form thực hiện submit (chuyển về trang index)
                window.location.href = "index.html";
            }
        });
    }
});