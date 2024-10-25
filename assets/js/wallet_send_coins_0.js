function selectCoin(selectedCoin) {
    // Убираем выделение и скрываем все галочки
    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        coin.classList.remove('selected');
        const checkIcon = coin.querySelector('.check-icon');
        if (checkIcon) {
            checkIcon.style.display = 'none';
        }
    });

    // Добавляем выделение и отображаем галочку для выбранного элемента
    selectedCoin.classList.add('selected');
    const selectedCheckIcon = selectedCoin.querySelector('.check-icon');
    if (selectedCheckIcon) {
        selectedCheckIcon.style.display = 'block';
    }
}
// Функция для обработки нажатия на кнопку "Next"
function handleNext() {
    // Ищем выбранный элемент
    const selectedCoin = document.querySelector('.coin.selected');

    // Проверяем, какая монета выбрана, и перенаправляем на соответствующую страницу
    if (selectedCoin) {
        if (selectedCoin.classList.contains('first')) {
            window.location.href = './wallet_send_coins_1.html'; // Страница для "Your friend in Telegram"
        } else if (selectedCoin.classList.contains('last')) {
            window.location.href = './wallet_send_coins_adress.html'; // Страница для "Wallet address"
        } else {
            window.location.href = './wallet_send_coins_3.html'; // Страница для "Your friend in app"
        }
    } else {
        alert('Please select a coin before proceeding.');
    }
}


// Добавляем обработчик события на кнопку "Next"
document.getElementById('nextButton').addEventListener('click', handleNext);