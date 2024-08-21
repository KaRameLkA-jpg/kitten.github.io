// Находим все элементы с классом "b-r" внутри блока с ID "menu"
const buttons = document.querySelectorAll('#menu .b-r');

// Добавляем обработчики событий для всех кнопок
buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.classList.add('shrink');
        triggerVibration();
    });

    button.addEventListener('mouseup', () => {
        button.classList.remove('shrink');
    });

    button.addEventListener('mouseleave', () => {
        button.classList.remove('shrink');
    });

    // Обработка касания для мобильных устройств
    button.addEventListener('touchstart', () => {
        button.classList.add('shrink');
        triggerVibration();
    });

    button.addEventListener('touchend', () => {
        button.classList.remove('shrink');
    });

    button.addEventListener('touchcancel', () => {
        button.classList.remove('shrink');
    });
});

// Функция для вызова вибрации
function triggerVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(100); // Вибрация на 100 мс
    }
}


