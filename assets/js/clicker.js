document.addEventListener("DOMContentLoaded", function() {
    let coinCount = 0.001; // Начальное значение монет
    const coinDisplay = document.getElementById("coin"); // Элемент для отображения монет
    const clickButton = document.getElementById("click_button"); // Кнопка с изображением
    let power = parseFloat(localStorage.getItem('power')) || 0.100;

    // Функция, которая вызывается при клике
    clickButton.addEventListener("click", function(event) {
        // Увеличение монет на 0.001
        coinCount += 0.001;
        power -= 0.001;
        coinDisplay.textContent = coinCount.toFixed(3);

        localStorage.setItem('coin', coins.toFixed(3));
        localStorage.setItem('power', power);

        updateProgress();

        // Вибрация (если поддерживается)
        if (navigator.vibrate) {
            navigator.vibrate(100); // Вибрация на 100 мс
        }

        // Добавляем эффект с "+0.001"
        createClickEffect(event.clientX, event.clientY);
    });

    // Функция для создания визуального эффекта при клике
    function createClickEffect(x, y) {
        const effect = document.createElement("div");
        effect.textContent = "+0.001";
        effect.className = "effect";
        document.body.appendChild(effect);

        // Позиционируем эффект в месте клика
        effect.style.left = x + "px";
        effect.style.top = y + "px";

        // Удаляем эффект после завершения анимации
        effect.addEventListener("animationend", function() {
            effect.remove();
        });
    }
});