/*const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');
let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

if (coins == null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count == null) {
    localStorage.setItem('count', '1');
}

image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    if (Number(power) > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    }

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * Number(power)) / Number(total)}%`;
});

setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    total = localStorage.getItem('total');
    if (Number(total) > Number(power)) {
        const newPower = Number(power) + Number(count);
        localStorage.setItem('power', `${newPower}`);
        body.querySelector('#power').textContent = `${newPower}`;
        body.querySelector('.progress').style.width = `${(100 * newPower) / Number(total)}%`;
    }
}, 1000);
 */

const body = document.body;
const h1 = body.querySelector('#coin');
const rankText = body.querySelector('#rank');
const progress = body.querySelector('.progress');
const image = body.querySelector('#clicks'); // Получаем элемент изображения для эффектов

let coins = parseFloat(localStorage.getItem('coin')) || 0.001;
let total = parseFloat(localStorage.getItem('total')) || 0.100;
let power = parseFloat(localStorage.getItem('power')) || 0.100;
const maxEnergy = 1.000; // Максимальное значение энергии
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
            break;
        case 1:
            rankText.textContent = 'Silver';
            rankText.className = 'rank-text silver';
            progress.className = 'progress silver';
            image.style.filter = 'drop-shadow(0 0 30px #c0c0c0)'; // Silver glow
            break;
        case 2:
            rankText.textContent = 'Gold';
            rankText.className = 'rank-text gold';
            progress.className = 'progress gold';
            image.style.filter = 'drop-shadow(0 0 30px #ffd700)'; // Gold glow
            break;
        case 3:
            rankText.textContent = 'Diamond';
            rankText.className = 'rank-text diamond';
            progress.className = 'progress diamond';
            image.style.filter = 'drop-shadow(0 0 30px #b9f2ff)'; // Diamond glow
            break;
        case 4:
            rankText.textContent = 'Ruby';
            rankText.className = 'rank-text ruby';
            progress.className = 'progress ruby';
            image.style.filter = 'drop-shadow(0 0 30px #e0115f)'; // Ruby glow
            break;
        default:
            rankText.textContent = 'Bronze';
            rankText.className = 'rank-text bronze';
            progress.className = 'progress bronze';
            image.style.filter = 'drop-shadow(0 0 30px #cd7f32)';
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
    // Добавляем монеты
    coins += 0.001;
    power -= 0.001;
    localStorage.setItem('coin', coins);
    localStorage.setItem('power', total);

    // Обновляем отображение монет
    h1.textContent = coins.toFixed(3).toLocaleString();

    // Обновляем прогресс
    updateProgress();

    navigator.vibrate(5);


    // Визуальный эффект "+0.001"
    const plusText = document.createElement('span');
    plusText.textContent = "+0.001";
    plusText.style.position = 'absolute';
    plusText.style.left = `${event.clientX}px`;
    plusText.style.top = `${event.clientY}px`;
    plusText.style.color = 'silver'; // Цвет золотой
    plusText.style.fontSize = '25px';
    plusText.style.fontWeight = 'bold';
    plusText.style.pointerEvents = 'none';
    plusText.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
    body.appendChild(plusText);

    // Анимация движения вверх и исчезновения
    setTimeout(() => {
        plusText.style.transform = 'translateY(-50px)';
        plusText.style.opacity = '0';
    }, 10);

    // Удаление элемента после завершения анимации
    setTimeout(() => {
        body.removeChild(plusText);
    }, 1000);
});

// Функция для обновления энергии каждую секунду
function regenerateEnergy() {
    if (power < maxEnergy) {
        power = Math.min(maxEnergy, power + 0.001); // Увеличиваем энергию, но не превышаем максимум
        localStorage.setItem('power', power); // Сохраняем энергию в локальном хранилище
        console.log(`Power: ${power.toFixed(3)}`);
        // Здесь можно добавить отображение энергии в UI, если это нужно
    }
}

// Запуск таймера для восстановления энергии каждую секунду
setInterval(regenerateEnergy, 1000);

h1.textContent = coins.toFixed(3).toLocaleString();
body.querySelector('#power').textContent = power;

if (total > 0.001) {
    body.querySelector('.progress-container').style.display = 'block';
    updateProgress();
} else {
    body.querySelector('.progress-container').style.display = 'none';
}

updateRank();



/*image.addEventListener('click',  Clicker);

function Clicker(event) {
    const x = event.offsetX;
    const y = event.offsetY;


    navigator.vibrate(5);

    if (power > 0.000) {
        coins += 0.001;
        power -= 0.001;
        h1.textContent = parseFloat(coins.toFixed(3).toLocaleString());
        body.querySelector('#power').textContent = power;

        localStorage.setItem('coin', coins.toFixed(3));
        localStorage.setItem('power', power);

        updateProgress();
    }

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);
}*/











