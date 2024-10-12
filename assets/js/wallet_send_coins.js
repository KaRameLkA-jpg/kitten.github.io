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
