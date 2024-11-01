function showInput() {
    const placeholderText = document.getElementById('placeholder-text');
    const walletInput = document.getElementById('wallet-input');

    placeholderText.style.display = 'none'; // Скрываем "0"
    walletInput.style.display = 'inline-block'; // Показываем поле ввода
    walletInput.focus(); // Устанавливаем фокус на поле ввода
}

function checkInput() {
    const walletInput = document.getElementById('wallet-input');
    const statusIcon = document.getElementById('status-icon');
    const nextButton = document.getElementById('nextButton');

    // Убираем все нецифровые символы
    walletInput.value = walletInput.value.replace(/\D/g, '');

    const inputValue = parseInt(walletInput.value) || 0; // Преобразуем значение в число

    if (inputValue > 0 && inputValue <= userBalance) {
        statusIcon.src = './assets/images/Great.svg'; // Путь к иконке "галочка"
        nextButton.style.pointerEvents = 'auto';
        nextButton.style.opacity = '1';
    } else if (inputValue > userBalance) {
        statusIcon.src = './assets/images/Bad.svg'; // Путь к иконке "крестик"
        nextButton.style.pointerEvents = 'none';
        nextButton.style.opacity = '0.5';
    } else {
        statusIcon.src = './assets/images/Wait.svg'; // Путь к иконке ожидания
        nextButton.style.pointerEvents = 'none';
        nextButton.style.opacity = '0.5';
    }
}

function hideInput() {
    const walletInput = document.getElementById('wallet-input');
    const placeholderText = document.getElementById('placeholder-text');

    if (walletInput.value === '' || walletInput.value === '0') {
        walletInput.style.display = 'none'; // Скрываем поле ввода
        placeholderText.style.display = 'inline-block'; // Показываем "0"
    }
    walletInput.blur();
}


function goNext() {
    const walletInput = document.getElementById('wallet-input');

    if (walletInput.value.toLowerCase() === 'check') {
        window.location.href = './next_page.html';
    } else {
        alert('Please enter a valid address to proceed.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    const selectedUserName = localStorage.getItem('selectedUserName');
    const walletAddress = localStorage.getItem('walletAddress');

    if (walletAddress) {
        nameElement.textContent = walletAddress;
    } else if (selectedUserName) {
        nameElement.textContent = selectedUserName;
    } else {
        nameElement.textContent = "error";
    }
});