const body = document.body;
const h1 = body.querySelector('#coin');
const rankText = body.querySelector('#rank');
const progress = body.querySelector('.progress');
const image = body.querySelector('#clicks'); // Получаем элемент изображения для эффектов
const menu = body.querySelector('#menu');
const powerDisplay = body.querySelector('#power')

let coins = parseFloat(localStorage.getItem('coin')) || 0.001;
let total = parseFloat(localStorage.getItem('total')) || 0.100;
let power = parseFloat(localStorage.getItem('power')) || 0.100;
const maxEnergy = 0.100; // Максимальное значение энергии
let rankThresholds = [0.001, 0.110, 5.001, 10.001, 25.001];
let currentRank = parseInt(localStorage.getItem('rank')) || 0;

// Функция обновления ранга
function updateRank() {
    switch (currentRank) {
        case 0:
            rankText.textContent = 'Bronze';
            rankText.className = 'rank-text bronze';
            progress.className = 'progress bronze';
            image.style.filter = 'drop-shadow(0 0 30px #cd7f32)'; // Bronze glow
            menu.style.filter = 'box-shadow: 0 0 10px #cd7f32';
            break;
        case 1:
            rankText.textContent = 'Silver';
            rankText.className = 'rank-text silver';
            progress.className = 'progress silver';
            image.style.filter = 'drop-shadow(0 0 30px #c0c0c0)';// Silver glow
            menu.style.filter = 'box-shadow: 0 0 10px #c0c0c0';
            break;
        case 2:
            rankText.textContent = 'Gold';
            rankText.className = 'rank-text gold';
            progress.className = 'progress gold';
            image.style.filter = 'drop-shadow(0 0 30px #ffd700)';// Gold glow
            menu.style.filter = 'drop-shadow(0 0 10px #ffd700)';
            break;
        case 3:
            rankText.textContent = 'Diamond';
            rankText.className = 'rank-text diamond';
            progress.className = 'progress diamond';
            image.style.filter = 'drop-shadow(0 0 30px #b9f2ff)'; // Diamond glow
            menu.style.filter = 'drop-shadow(0 0 10px #b9f2ff)';
            break;
        case 4:
            rankText.textContent = 'Ruby';
            rankText.className = 'rank-text ruby';
            progress.className = 'progress ruby';
            image.style.filter = 'drop-shadow(0 0 30px #e0115f)'; // Ruby glow
            menu.style.filter = 'drop-shadow(0 0 10px #e0115f)';
            break;
        default:
            rankText.textContent = 'Bronze';
            rankText.className = 'rank-text bronze';
            progress.className = 'progress bronze';
            image.style.filter = 'drop-shadow(0 0 30px #cd7f32)';
            menu.style.filter = 'drop-shadow(0 0 10px #c0c0c0)';
            progress.style.width = '100%';
            return;
    }
}

// Функция обновления прогресса
function updateProgress() {
    if (currentRank < rankThresholds.length - 1) {
        const nextThreshold = rankThresholds[currentRank + 1];
        const previousThreshold = rankThresholds[currentRank];
        const progressPercent = ((coins - previousThreshold) / (nextThreshold - previousThreshold)) * 100;

        progress.style.width = `${progressPercent}%`;

        if (coins >= nextThreshold) {
            currentRank++;
            localStorage.setItem('rank', currentRank);
            updateRank();
            progress.style.width = '0%';
        }
    } else {
        progress.style.width = '100%';
    }
}

// Функция обработки клика на картинку
image.addEventListener('click', (event) => {
    if (power <= 0) {
        return; // Блокируем действие, если энергия меньше или равна 0
    }
    // Добавляем монеты
    coins += 0.001;
    power -= 0.001;
    localStorage.setItem('coin', coins);
    localStorage.setItem('power', power);

    // Обновляем отображение монет
    h1.textContent = coins.toFixed(3).toLocaleString();
    updateEnergyDisplay();

    // Обновляем прогресс
    updateProgress();
    createClickEffect(event.clientX, event.clientY);


    // Вибрация (если поддерживается)
    if (navigator.vibrate) {
        navigator.vibrate(100); // Вибрация на 100 мс
    }
});

// Функция для обновления UI энергии
function updateEnergyDisplay() {
    powerDisplay.textContent = `${power.toFixed(3)}`; // Отображаем энергию в формате "0.100/0.100"
}

function createClickEffect(x, y) {
    // Визуальный эффект "+0.001"
    const effect = document.createElement("div");
    effect.textContent = "+0.001";
    effect.className = "effect";
    document.body.appendChild(effect);

    effect.style.left = x + "px";
    effect.style.top = y + "px";

    // Удаляем эффект после завершения анимации
    effect.addEventListener("animationend", function () {
        effect.remove();
    });

    // Функция обработки клика на картинку
    image.addEventListener('mousedown', () => {
        image.classList.add('shrink');
        triggerVibration();
    });

    image.addEventListener('mouseup', () => {
        image.classList.remove('shrink');
    });

    image.addEventListener('mouseleave', () => {
        image.classList.remove('shrink');
    });

// Обработка касания для мобильных устройств
    image.addEventListener('touchstart', () => {
        image.classList.add('shrink');
        triggerVibration();
    });

    image.addEventListener('touchend', () => {
        image.classList.remove('shrink');
    });

    image.addEventListener('touchcancel', () => {
        image.classList.remove('shrink');
    });

// Функция для вызова вибрации
    function triggerVibration() {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100); // Вибрация на 100 мс
        }
    }


}

// Функция для обновления энергии каждую секунду
function regenerateEnergy() {
    if (power < maxEnergy) {
        power = Math.min(maxEnergy, power + 0.001); // Увеличиваем энергию, но не превышаем максимум
        localStorage.setItem('power', power); // Сохраняем энергию в локальном хранилище
        updateEnergyDisplay(); // Обновляем UI для энергии
    }
}

// Запуск таймера для восстановления энергии каждую секунду
setInterval(regenerateEnergy, 1000);

h1.textContent = coins.toFixed(3).toLocaleString();
updateEnergyDisplay();

if (total > 0.001) {
    body.querySelector('.progress-container').style.display = 'block';
    updateProgress();
} else {
    body.querySelector('.progress-container').style.display = 'none';
}

updateRank();

