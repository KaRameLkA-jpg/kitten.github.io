function showInput() {
    const placeholderText = document.getElementById('placeholder-text');
    const walletInput = document.getElementById('wallet-input');

    placeholderText.style.display = 'none';
    walletInput.style.display = 'block';
    walletInput.focus();
}

function hideInput() {
    const placeholderText = document.getElementById('placeholder-text');
    const walletInput = document.getElementById('wallet-input');

    if (walletInput.value === '') {
        placeholderText.style.display = 'block';
        walletInput.style.display = 'none';
    }

    // Перемещаем фокус на другой элемент
    document.body.focus();
}
function checkInput() {
    const walletInput = document.getElementById('wallet-input');
    const statusIcon = document.getElementById('status-icon');
    const nextButton = document.getElementById('nextButton');

    // Меняем изображение в зависимости от введенного текста
    if (walletInput.value.toLowerCase() === 'check') {
        statusIcon.src = './assets/images/Great.svg';
        // Активируем кнопку "Next"
        nextButton.style.pointerEvents = 'auto';
        nextButton.style.opacity = '1';
        nextButton.classList.remove('disabled');
    } else if (walletInput.value === '') {
        statusIcon.src = './assets/images/Wait.svg';
        // Деактивируем кнопку "Next"
        nextButton.style.pointerEvents = 'none';
        nextButton.style.opacity = '0.5';
        nextButton.classList.add('disabled');
    } else {
        statusIcon.src = './assets/images/Bad.svg';
        // Деактивируем кнопку "Next"
        nextButton.style.pointerEvents = 'none';
        nextButton.style.opacity = '0.5';
        nextButton.classList.add('disabled');
    }
}

function goNext() {
    const walletInput = document.getElementById('wallet-input');

    // Действия при нажатии на кнопку "Next"
    if (walletInput.value.toLowerCase() === 'check') {
        // Выполните переход на следующую страницу или другую логику
        window.location.href = './next_page.html'; // Пример перехода
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
