const form = document.getElementById('orderForm');
const product = document.getElementById('product');
const quantity = document.getElementById('quantity');
const deliveryDate = document.getElementById('deliveryDate');
const address = document.getElementById('address');
const notes = document.getElementById('notes');
const charCount = document.getElementById('charCount');
const totalPriceSpan = document.getElementById('totalPrice');

const formContainer = document.getElementById('formContainer');
const confirmBox = document.getElementById('confirmBox');
const successBox = document.getElementById('successBox');

const sumProduct = document.getElementById('sumProduct');
const sumQty = document.getElementById('sumQty');
const sumDate = document.getElementById('sumDate');
const sumTotal = document.getElementById('sumTotal');

const prices = {
    "ao": 150000,
    "quan": 250000,
    "giay": 500000
};

let currentTotal = 0;

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
    
    if (errorSpan) errorSpan.remove();
    
    if (field && field.tagName !== 'DIV') {
        field.classList.remove('error-border');
        field.classList.add('success-border');
    }
}

function calcTotal() {
    const pVal = product.value;
    const qVal = parseInt(quantity.value, 10);
    
    if (pVal && prices[pVal] && !isNaN(qVal) && qVal > 0) {
        currentTotal = prices[pVal] * qVal;
        totalPriceSpan.textContent = currentTotal.toLocaleString('vi-VN');
    } else {
        currentTotal = 0;
        totalPriceSpan.textContent = "0";
    }
}

function validateProduct() {
    if (!product.value) {
        showError('product', 'Vui lòng chọn sản phẩm');
        return false;
    }
    clearError('product');
    return true;
}

function validateQuantity() {
    const val = parseInt(quantity.value, 10);
    if (isNaN(val) || val < 1 || val > 99) {
        showError('quantity', 'Số lượng phải từ 1 đến 99');
        return false;
    }
    clearError('quantity');
    return true;
}

function validateDate() {
    if (!deliveryDate.value) {
        showError('date', 'Vui lòng chọn ngày giao hàng');
        return false;
    }
    
    const selectedDate = new Date(deliveryDate.value);
    selectedDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    
    if (selectedDate < today) {
        showError('date', 'Ngày giao hàng không được trong quá khứ');
        return false;
    }
    if (selectedDate > maxDate) {
        showError('date', 'Ngày giao hàng không quá 30 ngày từ hôm nay');
        return false;
    }
    
    clearError('date');
    return true;
}

function validateAddress() {
    const val = address.value.trim();
    if (!val) {
        showError('address', 'Địa chỉ không được để trống');
        return false;
    }
    if (val.length < 10) {
        showError('address', 'Địa chỉ phải có ít nhất 10 ký tự');
        return false;
    }
    clearError('address');
    return true;
}

function validateNotes() {
    const len = notes.value.length;
    charCount.textContent = `${len}/200`;
    
    if (len > 200) {
        charCount.classList.add('over');
        showError('notes', 'Ghi chú không được vượt quá 200 ký tự');
        return false;
    }
    
    charCount.classList.remove('over');
    clearError('notes');
    return true;
}

function validatePayment() {
    const checked = document.querySelector('input[name="payment"]:checked');
    if (!checked) {
        showError('payment', 'Vui lòng chọn phương thức thanh toán');
        return false;
    }
    clearError('payment');
    return true;
}

product.addEventListener('change', () => {
    clearError('product');
    calcTotal();
});

quantity.addEventListener('input', () => {
    clearError('quantity');
    calcTotal();
});

deliveryDate.addEventListener('change', () => clearError('date'));
address.addEventListener('input', () => clearError('address'));
notes.addEventListener('input', validateNotes);

const radios = document.querySelectorAll('input[name="payment"]');
radios.forEach(radio => radio.addEventListener('change', () => clearError('payment')));

product.addEventListener('blur', validateProduct);
quantity.addEventListener('blur', validateQuantity);
deliveryDate.addEventListener('blur', validateDate);
address.addEventListener('blur', validateAddress);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isProdValid = validateProduct();
    const isQtyValid = validateQuantity();
    const isDateValid = validateDate();
    const isAddValid = validateAddress();
    const isNotesValid = validateNotes();
    const isPayValid = validatePayment();

    const isValid = isProdValid & isQtyValid & isDateValid & isAddValid & isNotesValid & isPayValid;

    if (isValid) {
        sumProduct.textContent = product.options[product.selectedIndex].text;
        sumQty.textContent = quantity.value;
        
        const d = new Date(deliveryDate.value);
        sumDate.textContent = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        
        sumTotal.textContent = currentTotal.toLocaleString('vi-VN');

        formContainer.style.display = 'none';
        confirmBox.style.display = 'block';
    }
});

document.getElementById('btnCancel').addEventListener('click', () => {
    confirmBox.style.display = 'none';
    formContainer.style.display = 'block';
});

document.getElementById('btnConfirm').addEventListener('click', () => {
    confirmBox.style.display = 'none';
    successBox.style.display = 'block';
});