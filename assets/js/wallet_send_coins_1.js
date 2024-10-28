// Выбор друга и сохранение его имени в localStorage
function selectCoin(selectedCoin) {
    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        coin.classList.remove('selected');
        const checkIcon = coin.querySelector('.check-icon');
        if (checkIcon) {
            checkIcon.style.display = 'none';
        }
    });

    selectedCoin.classList.add('selected');
    const selectedCheckIcon = selectedCoin.querySelector('.check-icon');
    if (selectedCheckIcon) {
        selectedCheckIcon.style.display = 'block';
    }

    const selectedName = selectedCoin.querySelector('.coin-name').textContent;
    localStorage.setItem('selectedUserName', selectedName);
    localStorage.removeItem('walletAddress'); // Удаляем адрес кошелька, если он был сохранен
}

// Сохранение адреса кошелька и переход на следующую страницу
function goNext() {
    const walletInput = document.getElementById('wallet-input');
    if (walletInput && walletInput.value) {
        localStorage.setItem('walletAddress', walletInput.value); // Сохраняем адрес кошелька
        localStorage.removeItem('selectedUserName'); // Удаляем имя друга, если оно было сохранено
    }
    window.location.href = './wallet_send_coins_2.html';
}
