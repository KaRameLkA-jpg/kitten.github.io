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
    } else {
        placeholderText.style.display = 'none';
    }

    // Удаляем фокус с поля ввода, чтобы скрыть клавиатуру
    walletInput.blur();
}

function checkInput() {
    const walletInput = document.getElementById('wallet-input');
    const statusIcon = document.getElementById('status-icon');
    const nextButton = document.getElementById('nextButton');

    // Проверяем введённый текст и обновляем иконку
    if (walletInput.value.toLowerCase() === 'check') {
        statusIcon.src = './assets/images/Great.svg';
        nextButton.style.pointerEvents = 'auto';
        nextButton.style.opacity = '1';
    } else if (walletInput.value === '') {
        statusIcon.src = './assets/images/Wait.svg';
        nextButton.style.pointerEvents = 'none';
        nextButton.style.opacity = '0.5';
    } else {
        statusIcon.src = './assets/images/Bad.svg';
        nextButton.style.pointerEvents = 'none';
        nextButton.style.opacity = '0.5';
    }
}

function goNext() {
    const walletInput = document.getElementById('wallet-input').value;

    // Сохраняем адрес в localStorage
    localStorage.setItem('walletAddress', walletInput);

    // Переходим на следующую страницу
    window.location.href = './wallet_send_coins_21.html';
}

