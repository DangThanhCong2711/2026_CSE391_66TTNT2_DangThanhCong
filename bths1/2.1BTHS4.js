const form = document.getElementById('registerForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms = document.getElementById('terms');
const formContainer = document.getElementById('formContainer');
const successMsg = document.getElementById('successMsg');

const regexName = /^[a-zA-ZÀ-ỹ\s]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^0[0-9]{9}$/;
const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const parent = document.getElementById(`group-${fieldId}`);
    let errorSpan = parent.querySelector('.error');
    
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'error';
        parent.appendChild(errorSpan);
    }
    
    errorSpan.textContent = message;
    
    if (field && field.tagName !== 'DIV') {
        field.classList.add('error-border');
        field.classList.remove('success-border');
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const parent = document.getElementById(`group-${fieldId}`);
    const errorSpan = parent.querySelector('.error');
    
    if (errorSpan) {
        errorSpan.remove();
    }
    
    if (field && field.tagName !== 'DIV') {
        field.classList.remove('error-border');
        field.classList.add('success-border');
    }
}

function validateFullname() {
    const val = fullname.value.trim();
    if (!val) {
        showError('fullname', 'Họ và tên không được để trống');
        return false;
    }
    if (val.length < 3) {
        showError('fullname', 'Họ và tên phải có từ 3 ký tự trở lên');
        return false;
    }
    if (!regexName.test(val)) {
        showError('fullname', 'Họ và tên chỉ chứa chữ cái và khoảng trắng');
        return false;
    }
    clearError('fullname');
    return true;
}

function validateEmail() {
    const val = email.value.trim();
    if (!val) {
        showError('email', 'Email không được để trống');
        return false;
    }
    if (!regexEmail.test(val)) {
        showError('email', 'Email không hợp lệ (VD: name@domain.com)');
        return false;
    }
    clearError('email');
    return true;
}

function validatePhone() {
    const val = phone.value.trim();
    if (!val) {
        showError('phone', 'Số điện thoại không được để trống');
        return false;
    }
    if (!regexPhone.test(val)) {
        showError('phone', 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0');
        return false;
    }
    clearError('phone');
    return true;
}

function validatePassword() {
    const val = password.value;
    if (!val) {
        showError('password', 'Mật khẩu không được để trống');
        return false;
    }
    if (!regexPass.test(val)) {
        showError('password', 'Mật khẩu ≥ 8 ký tự, có 1 chữ hoa, 1 chữ thường, 1 số');
        return false;
    }
    clearError('password');
    if (confirmPassword.value) validateConfirmPassword();
    return true;
}

function validateConfirmPassword() {
    const val = confirmPassword.value;
    if (!val) {
        showError('confirmPassword', 'Vui lòng xác nhận mật khẩu');
        return false;
    }
    if (val !== password.value) {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp');
        return false;
    }
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    const checked = document.querySelector('input[name="gender"]:checked');
    if (!checked) {
        showError('gender', 'Vui lòng chọn giới tính');
        return false;
    }
    clearError('gender');
    return true;
}

function validateTerms() {
    if (!terms.checked) {
        showError('terms', 'Bạn phải đồng ý với điều khoản');
        return false;
    }
    clearError('terms');
    return true;
}

fullname.addEventListener('blur', validateFullname);
email.addEventListener('blur', validateEmail);
phone.addEventListener('blur', validatePhone);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);

fullname.addEventListener('input', () => { clearError('fullname'); });
email.addEventListener('input', () => { clearError('email'); });
phone.addEventListener('input', () => { clearError('phone'); });
password.addEventListener('input', () => { clearError('password'); });
confirmPassword.addEventListener('input', () => { clearError('confirmPassword'); });

const radios = document.querySelectorAll('input[name="gender"]');
radios.forEach(radio => radio.addEventListener('change', () => { clearError('gender'); }));

terms.addEventListener('change', () => { clearError('terms'); });

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isNameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPassValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();

    const isValid = isNameValid & isEmailValid & isPhoneValid & isPassValid & isConfirmValid & isGenderValid & isTermsValid;

    if (isValid) {
        formContainer.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.innerHTML = `Đăng ký thành công! 🎉<br>Chào mừng <strong>${fullname.value.trim()}</strong>`;
    }
});