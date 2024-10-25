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
}

function checkInput() {
    const walletInput = document.getElementById('wallet-input');
    const statusIcon = document.getElementById('status-icon');

    // Меняем изображение в зависимости от введенного текста
    if (walletInput.value.toLowerCase() === 'check') {
        statusIcon.src = './assets/images/Great.svg';
    } else if (walletInput.value === '') {
        statusIcon.src = './assets/images/Wait.svg';
    } else {
        statusIcon.src = './assets/images/Bad.svg';
    }
}

